from typing import Dict, Any
import razorpay
from fastapi import HTTPException
from app.core.config import settings

class PaymentService:
    def __init__(self):
        self.client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
    
    def create_order(self, amount: int, currency: str = "INR", receipt: str = None) -> Dict[str, Any]:
        """
        Create Razorpay order
        amount: amount in paise (100 paise = 1 INR)
        """
        try:
            order_data = {
                "amount": amount,
                "currency": currency,
                "receipt": receipt,
                "payment_capture": 1  # Auto capture payment
            }
            
            order = self.client.order.create(order_data)
            return order
            
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to create payment order: {str(e)}")
    
    def verify_payment(self, razorpay_order_id: str, razorpay_payment_id: str, razorpay_signature: str) -> bool:
        """
        Verify Razorpay payment signature
        """
        try:
            params = {
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": razorpay_payment_id,
                "razorpay_signature": razorpay_signature
            }
            
            self.client.utility.verify_payment_signature(params)
            return True
            
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Payment verification failed: {str(e)}")
    
    def get_payment_details(self, payment_id: str) -> Dict[str, Any]:
        """
        Get payment details from Razorpay
        """
        try:
            payment = self.client.payment.fetch(payment_id)
            return payment
            
        except Exception as e:
            raise HTTPException(status_code=404, detail=f"Payment not found: {str(e)}")
    
    def refund_payment(self, payment_id: str, amount: int = None) -> Dict[str, Any]:
        """
        Refund payment
        amount: amount in paise (optional, full refund if not provided)
        """
        try:
            refund_data = {}
            if amount:
                refund_data["amount"] = amount
            
            refund = self.client.payment.refund(payment_id, refund_data)
            return refund
            
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Refund failed: {str(e)}")

payment_service = PaymentService()
