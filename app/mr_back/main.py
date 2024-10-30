from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pymongo import MongoClient
from classes.User import User
import jwt
import uvicorn


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = [ '*' ],
    allow_credentials=True,
    allow_methods=[ '*' ],
    allow_headers=[ '*' ],
)

# MongoDB connection
uri = 'mongodb+srv://admin:admin@mrcluster.lrupm.mongodb.net/?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true'
client = MongoClient( uri )
db = client[ 'mr_data' ]
users_collection = db[ 'users' ]

SECRET_KEY = 'super_secret_key'
security = HTTPBearer()

@app.get( '/' )
def homepage():
    return { 'message': 'Welcome to the homepage' }

@app.post('/login')
def login(user: User):
    try:
        user_data = users_collection.find_one({'email': user.email, 'password': user.password})
        
        if user_data:
            token = generate_token(user.email)
            user_data['_id'] = str(user_data['_id'])  # Convert ObjectId to string
            user_data['token'] = token
            return user_data
        
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.post( '/register' )
def register( user: User ):
    existing_user = users_collection.find_one(
        { 'email': user.email }
    )
    
    if existing_user:
        raise HTTPException( status_code = status.HTTP_400_BAD_REQUEST, detail = "User already exists" )
        
    user_dict = user.dict()
    users_collection.insert_one( user_dict )
    token = generate_token( user.email )
    user_dict[ "_id" ] = str( user_dict[ "_id" ] )
    user_dict[ "token" ] = token
    return user_dict


@app.get( '/api/user' )
def get_user( credentials: HTTPAuthorizationCredentials = Depends( security ) ):
    token = credentials.credentials
    try:
        payload = jwt.decode( token, SECRET_KEY, algorithms=[ 'HS256' ] )
        email = payload.get( 'email' )
        user_data = users_collection.find_one( { 'email': email } )
        
        if user_data:
            return { 'email': user_data[ 'email' ] }
        
    except jwt.ExpiredSignatureError:
        raise HTTPException( status_code = 401, detail = 'Token expired' )
    except jwt.InvalidTokenError:
        raise HTTPException( status_code = 401, detail = 'Invalid token' )
    
    raise HTTPException( status_code = 401, detail = 'Invalid token' )

def generate_token( email: str ) -> str:
    payload = { 'email': email }
    token = jwt.encode( payload, SECRET_KEY, algorithm='HS256' )
    return token

if __name__ == '__main__':
    uvicorn.run( app, host='0.0.0.0', port=8000 )