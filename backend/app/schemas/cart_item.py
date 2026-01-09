from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class CartItemBase(BaseModel):
    product_id: UUID
    quantity: int = 1
    size: Optional[str] = None
    color: Optional[str] = None

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: Optional[int] = None
    size: Optional[str] = None
    color: Optional[str] = None

class CartItemResponse(CartItemBase):
    id: UUID
    user_id: UUID
    
    class Config:
        from_attributes = True
