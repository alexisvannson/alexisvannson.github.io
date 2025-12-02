from transformers import AutoModel, AutoTokenizer
import torch

class ChemBERTaEmbedder:
    def __init__(self, model_name="DeepChem/ChemBERTa-10M-MLM", max_length=128): #DeepChem/ChemBERTa-77M-MLM"
        """Initialize model and tokenizer once."""
        self.model = AutoModel.from_pretrained(model_name, use_safetensors=True)
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model.eval()
        self.max_length = max_length
        self.embedding_dim = 384  # ChemBERTa embedding dimension
        print(f"Model loaded: {model_name}")
        print(f"Max sequence length: {max_length}")
    
    def embed(self, smiles_list, pooling="cls", flatten=False):
        """Generate embeddings for SMILES strings with fixed output shape."""
        inputs = self.tokenizer(
            smiles_list, 
            return_tensors="pt", 
            padding="max_length",
            truncation=True,
            max_length=self.max_length
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs)
        
        if pooling == "cls":
            embeddings = outputs.last_hidden_state[:, 0, :]
        elif pooling == "mean":
            attention_mask = inputs['attention_mask']
            token_embeddings = outputs.last_hidden_state
            input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
            sum_embeddings = torch.sum(token_embeddings * input_mask_expanded, 1)
            sum_mask = torch.clamp(input_mask_expanded.sum(1), min=1e-9)
            embeddings = sum_embeddings / sum_mask
        elif pooling is None:
            embeddings = outputs.last_hidden_state
            if flatten:
                # Flatten to (batch_size, max_length * embedding_dim)
                embeddings = embeddings.reshape(embeddings.shape[0], -1)
        else:
            raise ValueError(f"Unknown pooling: {pooling}")
        
        return embeddings


# Example usage
if __name__ == "__main__":
    embedder = ChemBERTaEmbedder(max_length=128)
    
    train_smiles = ["CCO", "CCN", "CC(=O)O"]

    train_embeddings = embedder.embed(train_smiles, pooling="mean").numpy()

    print( train_embeddings)