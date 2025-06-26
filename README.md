This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

For a production build and static export:

```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
\n## Backend Server\n\nStart the backend API server for sign up and sign in:\n```bash\nnpm run server\n```\nThe server listens on port 4000 and stores user data in `data/users.json`.\n

## Agent Recommendation Backend (FastAPI)

A Python FastAPI service for semantic agent search and recommendation using OpenAI embeddings and Pinecone vector DB.

### Setup
1. `cd agent-recommendation-backend`
2. `pip install -r requirements.txt`
3. Create a `.env` file with your OpenAI and Pinecone keys (see below).
4. Run `python ingest.py` to index agents.
5. Start the API: `uvicorn main:app --reload --port 8000`

### .env Example
```
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=us-west1-gcp
PINECONE_INDEX=agents-index
```

### Endpoints
- `POST /search` — Semantic + metadata agent search

### Ingestion
- Place agent YAMLs in `agents/<agent_id>/agent.yaml`
- Run `python ingest.py` to (re)index
