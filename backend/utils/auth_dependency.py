from fastapi import Depends
from fastapi import HTTPException

from fastapi.security import (
    OAuth2PasswordBearer
)

from jose import jwt
from jose import JWTError

from database import user_collection

from utils.security import (
    SecRET_KEY,
    ALGORITHM
)

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme)
):

    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid token"
    )

    try:

        payload = jwt.decode(
            token,
            SecRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:

            raise credentials_exception

    except JWTError:

        raise credentials_exception

    user = user_collection.find_one({
        "email": email
    })

    if user is None:

        raise credentials_exception

    return user