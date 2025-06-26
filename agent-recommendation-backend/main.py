from fastapi import FastAPI
from pydantic import BaseModel
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

qdrant = QdrantClient(url="http://localhost:6333")
COLLECTION_NAME = "agents"
model = SentenceTransformer('all-MiniLM-L6-v2')

app = FastAPI()

class SearchRequest(BaseModel):
    query: str
    category: str = None
    tags: list[str] = []

@app.post("/search")
def search_agents(req: SearchRequest):
    embedding = model.encode(req.query).tolist()
    must = []
    if req.category:
        must.append({"key": "category", "match": {"value": req.category}})
    if req.tags:
        must.append({"key": "tags", "match": {"any": req.tags}})
    search_result = qdrant.search(
        collection_name=COLLECTION_NAME,
        query_vector=embedding,
        limit=10,
        query_filter={"must": must} if must else None,
        with_payload=True
    )
    return [hit.payload for hit in search_result]
