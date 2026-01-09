from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from uuid import UUID
from decimal import Decimal

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal
    original_price: Optional[Decimal] = None
    sku: str
    category_id: UUID
    sizes: Optional[List[str]] = []
    colors: Optional[List[str]] = []
    stock_quantity: int = 0

class ProductCreate(ProductBase):
    images: Optional[List[str]] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = None
    original_price: Optional[Decimal] = None
    category_id: Optional[UUID] = None
    images: Optional[List[str]] = None
    sizes: Optional[List[str]] = None
    colors: Optional[List[str]] = None
    stock_quantity: Optional[int] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None

class ProductResponse(ProductBase):
    id: UUID
    images: Optional[List[str]] = []
    is_active: bool
    is_featured: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ProductFilter(BaseModel):
    category_id: Optional[UUID] = None
    min_price: Optional[Decimal] = None
    max_price: Optional[Decimal] = None
    sizes: Optional[List[str]] = []
    colors: Optional[List[str]] = []
    is_featured: Optional[bool] = None
    search: Optional[str] = None
    skip: int = 0
    limit: int = 20
