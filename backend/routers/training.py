from fastapi import APIRouter

from schemas.training_schema import TrainingField

from database import training_collection
from fastapi import Depends

from utils.admin_dependency import (
    admin_only
)
router = APIRouter()


# 1. Add get_current_user to your imports at the top if it's not already there:
from utils.auth_dependency import get_current_user

# 2. Update the delete endpoint at the bottom of training.py:
@router.delete("/trainings/{title}")
def delete_training(
    title: str,
    current_user = Depends(get_current_user)  # 👈 Changed this!
):
    training_collection.delete_one({"title": title})
    return {"message": "Training opportunity deleted"}
# Change this at the top of backend/routers/training.py:
@router.post("/trainings")
def create_training(
    training: TrainingField,
    current_user = Depends(get_current_user)  # 👈 Changed this from admin_only!
):
    training_dict = training.dict()
    training_collection.insert_one(training_dict)
    return {
        "message": "Training added"
    }

    training_dict = training.dict()

    training_collection.insert_one(
        training_dict
    )

    return {
        "message": "Training added"
    }


@router.get("/trainings")
def get_trainings():

    trainings = list(

        training_collection.find(
            {},
            {"_id": 0}
        )

    )

    return trainings