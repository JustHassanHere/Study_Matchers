from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.students import (
    router as student_router
)

from routers.auth import (
    router as auth_router
)

from routers.training import (
    router as training_router
    )
from routers.reservation import (
    router as reservation_router
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(student_router)
app.include_router(auth_router)
app.include_router(training_router)
app.include_router(reservation_router)


@app.get("/")
def home():

    return {
        "message": "Study Matcher API"
    }