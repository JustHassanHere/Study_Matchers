from fastapi import APIRouter, HTTPException

from schemas.auth_schema import( RegisterUswer , LoginUser
)
from database import user_collection as users_collection

from utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


@router.post("/register")
def register(user: RegisterUswer):

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(
        user.password
    )

    user_dict = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }

    users_collection.insert_one(user_dict)

    return {
        "message": "User registered"
    }


@router.post("/login")
def login(user: LoginUser):

    db_user = users_collection.find_one({
        "email": user.email
    })

    if not db_user:

        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    valid_password = verify_password(
        user.password,
        db_user["password"]
    )

    if not valid_password:

        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    access_token = create_access_token(
    data={
    "sub": db_user["email"],
    "role": db_user.get("role", "student")
}
    
)
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }