import sys
import pandas as pd
from io import BytesIO
from downloadData import DataFetcher
from embbed import ChemBERTaEmbedder
import os

def main():
    
    # Initialize fetcher
    fetcher = DataFetcher(max_workers=4, final_s3_dir='Lincs_data')
    
    # Step 1: Fetch LINCS data
    print("Step 1: Downloading LINCS files...")
    fetcher.fetch_all_parallel()
    
    # Step 2: Build SMILES map
    print("\nStep 2: Building SMILES map...")
    smiles_map_key = 'Lincs_data/processed/smiles_map.parquet'
    smiles_df = fetcher.build_smiles_map(
        sig_info_s3_keys=[
            'Lincs_data/raw/lincs_l1000/perturbagens/GSE92742_Broad_LINCS_sig_info.txt.gz',
            'Lincs_data/raw/lincs_l1000/perturbagens/GSE70138_Broad_LINCS_sig_info_2017-03-06.txt.gz'
        ],
        output_s3_key=smiles_map_key
    )
    
    #create embeddings
    print("\nStep 3: Creating embeddings...")
    embedder = ChemBERTaEmbedder()
    import boto3
    import pyarrow.parquet as pq

    # read the smiles map from s3
    smiles_with_embeddings_key = smiles_map_key.replace(".parquet", "_with_embeddings.parquet")
    s3 = boto3.client("s3")
    s3_bucket = os.getenv('AWS_S3_BUCKET')
    s3_key = smiles_map_key

    obj = s3.get_object(Bucket=s3_bucket, Key=s3_key)
    buf = BytesIO(obj['Body'].read())
    smiles = pd.read_parquet(buf)
    smiles['embeddings'] = embedder.embed(smiles['smiles'])
    out_buf = BytesIO()
    smiles.to_parquet(out_buf, index=False)
    out_buf.seek(0)
    s3.put_object(Bucket=s3_bucket, Key=smiles_with_embeddings_key, Body=out_buf.getvalue())
    print(f"Embeddings parquet uploaded to s3://{s3_bucket}/{smiles_with_embeddings_key}")
   
if __name__ == "__main__":
    main()