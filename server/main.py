from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.team import router as team_router

app = FastAPI(title="Armatrix Team API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(team_router)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Armatrix Team API is running"}