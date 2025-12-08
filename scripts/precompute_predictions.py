import pickle
import pandas as pd
import numpy as np
import json
from concurrent.futures import ProcessPoolExecutor
import os


# ---- Worker function ----
def worker_predict(args):
    row_data, model_path = args

    if not hasattr(worker_predict, "model"):
        worker_predict.model = pickle.load(open(model_path, "rb"))

    drug_name = row_data["pert_iname"]
    embedding = np.array(row_data.drop(["pert_iname"]).values).reshape(1, -1)
    pred = worker_predict.model.predict(embedding)[0].tolist()

    return drug_name, pred


class PrecomputePredictions:
    def __init__(self, embeddings_path, model_path="scripts/multi_output_model.pkl"):
        self.embeddings_path = embeddings_path
        self.embeddings_df = pd.read_csv(embeddings_path)
        self.model_path = model_path

    def precompute_predictions(self, n_workers=None):
        if n_workers is None:
            n_workers = os.cpu_count()

        tasks = [
            (row, self.model_path)
            for _, row in self.embeddings_df.iterrows()
        ]

        output = {}
        counter = 0

        print(f"Starting parallel prediction with {n_workers} workers…")

        with ProcessPoolExecutor(max_workers=n_workers) as exe:
            for drug, pred in exe.map(worker_predict, tasks):
                output[drug] = pred
                counter += 1
                print(f"pred → {drug}")

                
                if counter % 50 == 0:
                    filename = f"precomputed_predictions_{counter:03d}.json"
                    with open(filename, "w") as f:
                        json.dump(output, f, indent=2)
                    print(f"Saved partial file → {filename}")

        with open("precomputed_predictions.json", "w") as f:
            json.dump(output, f, indent=2)

        print("Saved full predictions → precomputed_predictions.json")


if __name__ == "__main__":
    #save every 50 predictions
    precompute = PrecomputePredictions(
        embeddings_path="/Users/philippevannson/Desktop/AMARCHs3/scripts/embbedings_with_molecule_names (2).csv"
    )
    precompute.precompute_predictions()
