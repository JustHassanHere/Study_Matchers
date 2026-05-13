from fastapi import APIRouter

from schemas.training_schema import TrainingField

from database import training_collection
from fastapi import Depends

from utils.admin_dependency import (
    admin_only
)
router = APIRouter()


@router.post("/trainings")
def create_training(

    training: TrainingField,

    current_user = Depends(
        admin_only
    )

):
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