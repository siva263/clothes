from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Dict, Any
from app.core.database import get_db
from app.services.payment import payment_service
from app.services.order import OrderService
from app.api.endpoints.auth import get_current_user_id
from fastapi.security import HTTPBearer
from pydantic import BaseModel
from uuid import UUID

router = APIRouter()
security = HTTPBearer()

class PaymentOrderRequest(BaseModel):
    amount: int  # Amount in paise
    currency: str = "INR"
    receipt: str = None

class PaymentVerificationRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class RefundRequest(BaseModel):
    payment_id: str
    amount: int = None  # Amount in paise (optional)

def get_order_service(db: Session = Depends(get_db)) -> OrderService:
    return OrderService(db)

@router.post("/create-order")
def create_payment_order(
    payment_request: PaymentOrderRequest,
    user_id: str = Depends(get_current_user_id)
):
    """Create Razorpay payment order"""
    try:
        # Create receipt with user ID
        receipt = f"receipt_{user_id}_{payment_request.receipt or 'order'}"
        
        order = payment_service.create_order(
            amount=payment_request.amount,
            currency=payment_request.currency,
            receipt=receipt
        )
        
        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "currency": order["currency"],
            "receipt": order["receipt"]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/verify")
def verify_payment(
    verification_data: PaymentVerificationRequest,
    order_service: OrderService = Depends(get_order_service),
    user_id: str = Depends(get_current_user_id)
):
    """Verify Razorpay payment"""
    try:
        # Verify payment signature
        is_valid = payment_service.verify_payment(
            verification_data.razorpay_order_id,
            verification_data.razorpay_payment_id,
            verification_data.razorpay_signature
        )
        
        if is_valid:
            # Get payment details
            payment_details = payment_service.get_payment_details(verification_data.razorpay_payment_id)
            
            # TODO: Update order payment status in database
            # This would typically involve finding the order by razorpay_order_id
            # and updating its payment status
            
            return {
                "status": "success",
                "payment_id": verification_data.razorpay_payment_id,
                "order_id": verification_data.razorpay_order_id,
                "payment_details": payment_details
            }
        else:
            raise HTTPException(status_code=400, detail="Payment verification failed")
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/payment/{payment_id}")
def get_payment_details(
    payment_id: str,
    user_id: str = Depends(get_current_user_id)
):
    """Get payment details"""
    try:
        payment_details = payment_service.get_payment_details(payment_id)
        return payment_details
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/refund")
def refund_payment(
    refund_request: RefundRequest,
    user_id: str = Depends(get_current_user_id)
):
    """Refund payment"""
    try:
        refund = payment_service.refund_payment(
            payment_id=refund_request.payment_id,
            amount=refund_request.amount
        )
        
        return {
            "refund_id": refund["id"],
            "amount": refund["amount"],
            "status": refund["status"]
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
