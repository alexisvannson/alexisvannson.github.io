import boto3
import requests
import os
import gzip
import time
import pandas as pd
from io import BytesIO
from dotenv import load_dotenv
from concurrent.futures import ThreadPoolExecutor
from boto3.s3.transfer import TransferConfig
import pyarrow as pa
import pyarrow.parquet as pq

load_dotenv()

class DataFetcher:
    def __init__(self, max_workers=4, final_s3_dir=''):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
            region_name=os.getenv('AWS_REGION_NAME')
        )
        self.bucket = os.getenv('AWS_S3_BUCKET')
        
        self.base_urls = {
            'phase1': 'https://ftp.ncbi.nlm.nih.gov/geo/series/GSE92nnn/GSE92742/suppl/',
            'phase2': 'https://ftp.ncbi.nlm.nih.gov/geo/series/GSE70nnn/GSE70138/suppl/'
        }
        
        self.files = {
            # Phase 1
            'GSE92742_Broad_LINCS_Level5_COMPZ.MODZ_n473647x12328.gctx.gz': 'raw/lincs_l1000/signatures/',
            'GSE92742_Broad_LINCS_sig_info.txt.gz': 'raw/lincs_l1000/perturbagens/',
            'GSE92742_Broad_LINCS_cell_info.txt.gz': 'raw/lincs_l1000/cells/',
            'GSE92742_Broad_LINCS_gene_info.txt.gz': 'raw/lincs_l1000/genes/',
            # Phase 2
            'GSE70138_Broad_LINCS_Level5_COMPZ_n118050x12328_2017-03-06.gctx.gz': 'raw/lincs_l1000/signatures/',
            'GSE70138_Broad_LINCS_sig_info_2017-03-06.txt.gz': 'raw/lincs_l1000/perturbagens/',
            'GSE70138_Broad_LINCS_cell_info_2017-04-28.txt.gz': 'raw/lincs_l1000/cells/',
            'GSE70138_Broad_LINCS_gene_info_2017-03-06.txt.gz': 'raw/lincs_l1000/genes/',
        }

        self.max_workers = max_workers
        self.final_s3_dir = final_s3_dir.strip('/')

        self.transfer_config = TransferConfig(
            multipart_threshold=100 * 1024 * 1024,  # 100 MB
            max_concurrency=4,
            multipart_chunksize=50 * 1024 * 1024  # 50 MB
        )
        
        # SMILES fetching parameters
        self.pubchem_sleep = 0.2
        self.pubchem_timeout = 10

    def download_to_s3(self, filename, s3_prefix):
        phase = 'phase1' if 'GSE92742' in filename else 'phase2'
        url = self.base_urls[phase] + filename

        # Build final S3 key with optional final directory
        if self.final_s3_dir:
            s3_key = f"{self.final_s3_dir}/{s3_prefix}{filename}"
        else:
            s3_key = f"{s3_prefix}{filename}"

        print(f"Downloading {filename} → s3://{self.bucket}/{s3_key}")

        try:
            with requests.get(url, stream=True, timeout=300) as response:
                response.raise_for_status()
                self.s3_client.upload_fileobj(
                    response.raw,
                    self.bucket,
                    s3_key,
                    Config=self.transfer_config
                )
            print(f"✓ Uploaded {filename}")
        except Exception as e:
            print(f"✗ Failed {filename}: {e}")

    def fetch_all_parallel(self):
        """Download all LINCS files"""
        print("Starting parallel download of LINCS files...")
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            executor.map(lambda args: self.download_to_s3(*args), self.files.items())
        
        print("\n✓ All LINCS files downloaded")

    def get_smiles_pubchem(self, name, verbose=False):
        """Fetch SMILES string from PubChem for a compound name"""
        if not isinstance(name, str) or name.strip() == "":
            if verbose:
                print(f"  ⚠ Invalid name: {name}")
            return None
        
        name_safe = requests.utils.requote_uri(name)
        url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{name_safe}/property/CanonicalSMILES/JSON"
        
        try:
            r = requests.get(url, timeout=self.pubchem_timeout)
            if r.status_code != 200:
                if verbose:
                    print(f"  ⚠ PubChem API returned status {r.status_code} for '{name}'")
                    print(f"     Response: {r.text[:200]}")
                return None
            
            js = r.json()
            
            # Check if response has expected structure
            if 'PropertyTable' not in js:
                if verbose:
                    print(f"  ⚠ Unexpected response structure for '{name}'")
                    print(f"     Keys: {list(js.keys())}")
                return None
            
            properties = js['PropertyTable'].get('Properties', [])
            if not properties:
                if verbose:
                    print(f"  ⚠ No properties found for '{name}'")
                return None
            
            # PubChem returns 'SMILES' when requesting 'CanonicalSMILES'
            # Try multiple possible field names
            prop = properties[0]
            smiles = prop.get('CanonicalSMILES') or prop.get('SMILES') or prop.get('IsomericSMILES') or prop.get('ConnectivitySMILES')
            
            if verbose:
                if smiles:
                    print(f"  ✓ Found SMILES for '{name}': {smiles[:50]}...")
                else:
                    print(f"  ⚠ No SMILES field found for '{name}'")
                    print(f"     Available fields: {list(prop.keys())}")
            return smiles
            
        except KeyError as e:
            if verbose:
                print(f"  ⚠ KeyError parsing PubChem response for '{name}': {e}")
                if 'js' in locals():
                    print(f"     Response keys: {list(js.keys())}")
            return None
        except Exception as e:
            if verbose:
                print(f"  ⚠ Exception fetching SMILES for '{name}': {type(e).__name__}: {e}")
            return None

    def write_parquet_to_s3(self, df, s3_key):
        """Write DataFrame as Parquet to S3"""
        table = pa.Table.from_pandas(df)
        out = pa.BufferOutputStream()
        pq.write_table(table, out)
        self.s3_client.put_object(
            Bucket=self.bucket, 
            Key=s3_key, 
            Body=out.getvalue().to_pybytes()
        )

    def build_smiles_map(self, sig_info_s3_keys, cache_s3_key=None, output_s3_key=None):
        """
        Build SMILES mapping from sig_info files stored in S3.

        Args:
            sig_info_s3_keys: List of S3 keys to sig_info files (TSV, possibly gzipped).
            cache_s3_key: Optional S3 key to existing SMILES map for caching.
            output_s3_key: Optional S3 key to save output (.parquet).
        """
        print("Building SMILES map from perturbagen info...")

        all_names = set()

        # Collect all unique perturbagen names from S3 files
        for s3_key in sig_info_s3_keys:
            print(f"\nReading s3://{self.bucket}/{s3_key}...")
            try:
                # Download file from S3
                response = self.s3_client.get_object(Bucket=self.bucket, Key=s3_key)
                
                # Read based on file type
                if s3_key.endswith('.gz'):
                    with gzip.open(BytesIO(response['Body'].read()), "rt") as f:
                        sig_df = pd.read_csv(f, sep="\t", low_memory=False)
                else:
                    sig_df = pd.read_csv(BytesIO(response['Body'].read()), sep="\t", low_memory=False)
                
                unique_names = sig_df['pert_iname'].dropna().unique()
                all_names.update(unique_names)
                print(f"  Found {len(unique_names)} unique compounds")
                # Show sample names for debugging
                print(f"  Sample compound names (first 3):")
                for sample_name in list(unique_names)[:3]:
                    print(f"    - {sample_name}")
            except Exception as e:
                print(f"  ✗ Failed to read {s3_key}: {e}")

        print(f"\nTotal unique compounds across all files: {len(all_names)}")

        # Load cache if available
        cache = {}
        if cache_s3_key:
            try:
                print(f"Loading cache from s3://{self.bucket}/{cache_s3_key}...")
                response = self.s3_client.get_object(Bucket=self.bucket, Key=cache_s3_key)
                cache_df = pd.read_parquet(BytesIO(response['Body'].read()))
                cache = dict(zip(cache_df['pert_iname'], cache_df['smiles']))
                print(f"✓ Loaded {len(cache)} cached SMILES entries")
            except Exception as e:
                print(f"No cache found or failed to load: {e}")
                print("Starting fresh without cache")

        # Fetch SMILES for each compound
        records = []
        cached_count = 0
        fetched_count = 0

        print("\nFetching SMILES from PubChem...")
        # Test first few names with verbose output to diagnose issues
        if all_names:
            first_name = list(sorted(all_names))[0]
            print(f"  Testing first compound: '{first_name}'")
            test_result = self.get_smiles_pubchem(first_name, verbose=True)
            print(f"  Result: {test_result}\n")
        
        for i, name in enumerate(sorted(all_names), 1):
            if name in cache:
                smiles = cache[name]
                cached_count += 1
            else:
                smiles = self.get_smiles_pubchem(name, verbose=(i <= 3))  # Verbose for first 3
                fetched_count += 1
                time.sleep(self.pubchem_sleep)

            records.append({"pert_iname": name, "smiles": smiles})

            if i % 100 == 0:
                print(f"  Progress: {i}/{len(all_names)} compounds processed "
                    f"(cached: {cached_count}, fetched: {fetched_count})")

        # Create DataFrame
        df = pd.DataFrame.from_records(records)
        non_null = df['smiles'].notna().sum()

        # Determine output path
        if output_s3_key is None:
            output_s3_key = f"{self.final_s3_dir}/processed/smiles_map.parquet" if self.final_s3_dir else "processed/smiles_map.parquet"

        # Save to S3 as Parquet
        print(f"\nWriting SMILES map to s3://{self.bucket}/{output_s3_key}")
        print(f"  Total compounds: {len(df)}")
        print(f"  SMILES found: {non_null} ({100*non_null/len(df):.1f}%)")
        print(f"  SMILES missing: {len(df) - non_null}")

        self.write_parquet_to_s3(df, output_s3_key)
        print("✓ SMILES map complete\n")

        return df



if __name__ == "__main__":
    # Option 1: Keep SmilesFetcher and use it for everything
    fetcher = DataFetcher(max_workers=4, final_s3_dir='Lincs_data')

    # Download LINCS files
    fetcher.fetch_all_parallel()

    # Build SMILES map
    fetcher.build_smiles_map([
        'Lincs_data/raw/lincs_l1000/perturbagens/GSE92742_Broad_LINCS_sig_info.txt.gz',
        'Lincs_data/raw/lincs_l1000/perturbagens/GSE70138_Broad_LINCS_sig_info_2017-03-06.txt.gz'
])