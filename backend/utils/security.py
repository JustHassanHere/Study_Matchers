from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta    
SecRET_KEY = "Study_Matcher_Secret"
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(days=1)

    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SecRET_KEY, algorithm=ALGORITHM)

