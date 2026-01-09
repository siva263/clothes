from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.core.database import get_db
from app.services.cart import CartService
from app.schemas.cart_item import CartItemCreate, CartItemUpdate, CartItemResponse
from app.api.endpoints.auth import get_current_user_id
from fastapi.security import HTTPBearer

router = APIRouter()
security = HTTPBearer()

def get_cart_service(db: Session = Depends(get_db)) -> CartService:
    return CartService(db)

@router.get("/", response_model=List[CartItemResponse])
def get_cart_items(
    user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    """Get user's cart items"""
    return cart_service.get_cart_items(UUID(user_id))

@router.post("/", response_model=CartItemResponse)
def add_to_cart(
    cart_item_data: CartItemCreate,
    user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    """Add item to cart"""
    try:
        return cart_service.add_to_cart(UUID(user_id), cart_item_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{product_id}", response_model=CartItemResponse)
def update_cart_item(
    product_id: UUID,
    cart_item_data: CartItemUpdate,
    user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    """Update cart item"""
    try:
        return cart_service.update_cart_item(UUID(user_id), product_id, cart_item_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{product_id}")
def remove_from_cart(
    product_id: UUID,
    user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    """Remove item from cart"""
    try:
        cart_service.remove_from_cart(UUID(user_id), product_id)
        return {"message": "Item removed from cart"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/")
def clear_cart(
    user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    """Clear entire cart"""
    try:
        cart_service.clear_cart(UUID(user_id))
        return {"message": "Cart cleared successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/total")
def get_cart_total(
    user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    """Get cart total amount"""
    total = cart_service.get_cart_total(UUID(user_id))
    return {"total": total}

@router.get("/count")
def get_cart_count(
    user_id: str = Depends(get_current_user_id),
    cart_service: CartService = Depends(get_cart_service)
):
    """Get cart item count"""
    count = cart_service.get_cart_count(UUID(user_id))
    return {"count": count}
