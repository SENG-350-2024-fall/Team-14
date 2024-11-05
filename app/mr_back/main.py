from fastapi import FastAPI
from api.auth_routes import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from api.triage_routes import router as triage_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router( auth_router, prefix="/auth" )
app.include_router( triage_router, prefix="/api")


@app.get( '/' )
def homepage():
    return { 'message': 'Welcome to the homepage' }

