from fastapi import APIRouter, HTTPException, Depends

from schemas.reservation_schema import reservation

from database import (
    reservation_collection,
    training_collection
)

from utils.auth_dependency import get_current_user

router = APIRouter()


@router.get("/reservations")
def get_user_reservations(
    current_user = Depends(get_current_user)
):
    user_reservations = list(
        reservation_collection.find(
            {"student_email": current_user["email"]},
            {"_id": 0}
        )
    )
    return user_reservations


@router.post("/reserve")
def reserve_training(
    reservation: reservation,
    current_user = Depends(get_current_user)
):
    training = training_collection.find_one({
        "title": reservation.training_title
    })

    if not training:
        raise HTTPException(
            status_code=404,
            detail="Training not found"
        )

    if training["available_slots"] <= 0:
        raise HTTPException(
            status_code=400,
            detail="No available slots"
        )

    existing_reservation = reservation_collection.find_one({
        "student_email": current_user["email"],
        "training_title": reservation.training_title
    })

    if existing_reservation:
        raise HTTPException(
            status_code=400,
            detail="Already reserved"
        )

    reservation_dict = {
        "student_email": current_user["email"],
        "training_title": reservation.training_title
    }

    reservation_collection.insert_one(reservation_dict)

    training_collection.update_one(
        {"title": reservation.training_title},
        {"$inc": {"available_slots": -1}}
    )

    return {"message": "Reservation successful"}


@router.delete("/reservations")
def cancel_reservation(
    training_title: str,
    current_user = Depends(get_current_user)
):
    result = reservation_collection.delete_one({
        "student_email": current_user["email"],
        "training_title": training_title
    })

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )

    training_collection.update_one(
        {"title": training_title},
        {"$inc": {"available_slots": 1}}
    )

    return {"message": "Reservation cancelled successfully"}