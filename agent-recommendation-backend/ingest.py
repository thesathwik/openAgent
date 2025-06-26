import yaml
import glob
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
from sentence_transformers import SentenceTransformer

qdrant = QdrantClient(host="localhost", port=6333)
COLLECTION_NAME = "agents"

# Create collection if not exists
if COLLECTION_NAME not in [c.name for c in qdrant.get_collections().collections]:
    qdrant.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE)
    )

model = SentenceTransformer('all-MiniLM-L6-v2')

def parse_agent_yaml(yaml_path):
    with open(yaml_path, "r") as f:
        data = yaml.safe_load(f)
    return data

def main():
    points = []
    for idx, yaml_file in enumerate(glob.glob("agents/*.yaml")):
        meta = parse_agent_yaml(yaml_file)
        text = f"{meta.get('display_name', meta.get('name', ''))} {meta.get('description', '')} {' '.join(meta.get('tags', []))}"
        embedding = model.encode(text).tolist()
        payload = {
            "id": idx,
            "name": meta.get("display_name", meta.get("name", "")),
            "description": meta.get("description", ""),
            "tags": meta.get("tags", []),
            "category": meta.get("category", ""),
        }
        points.append(PointStruct(id=idx, vector=embedding, payload=payload))
    if points:
        qdrant.upsert(collection_name=COLLECTION_NAME, points=points)
        print(f"Upserted {len(points)} agents.")

if __name__ == "__main__":
    main()
