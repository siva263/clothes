from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from decimal import Decimal
from app.models.order import OrderStatus

class OrderItemBase(BaseModel):
    product_id: UUID
    quantity: int
    size: Optional[str] = None
    color: Optional[str] = None

class OrderCreate(BaseModel):
    items: List[OrderItemBase]
    shipping_address: str
    billing_address: Optional[str] = None
    notes: Optional[str] = None

class OrderItemResponse(BaseModel):
    id: UUID
    product_id: UUID
    product_name: str
    product_sku: str
    quantity: int
    unit_price: Decimal
    total_price: Decimal
    size: Optional[str] = None
    color: Optional[str] = None
    
    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: UUID
    user_id: UUID
    order_number: str
    total_amount: Decimal
    status: OrderStatus
    shipping_address: str
    billing_address: Optional[str] = None
    payment_id: Optional[str] = None
    payment_status: str
    notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    order_items: List[OrderItemResponse] = []
    
    class Config:
        from_attributes = True

class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    payment_status: Optional[str] = None
    notes: Optional[str] = None
