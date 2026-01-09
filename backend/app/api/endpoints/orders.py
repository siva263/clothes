from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from app.core.database import get_db
from app.services.order import OrderService
from app.schemas.order import OrderCreate, OrderResponse, OrderUpdate
from app.api.endpoints.auth import get_current_user_id
from fastapi.security import HTTPBearer

router = APIRouter()
security = HTTPBearer()

def get_order_service(db: Session = Depends(get_db)) -> OrderService:
    return OrderService(db)

@router.get("/", response_model=List[OrderResponse])
def get_orders(
    user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    """Get user's orders"""
    return order_service.get_orders(UUID(user_id))

@router.get("/history", response_model=List[OrderResponse])
def get_order_history(
    limit: int = 20,
    user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    """Get user's order history"""
    return order_service.get_user_order_history(UUID(user_id), limit)

@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: UUID,
    user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    """Get order by ID"""
    order = order_service.get_order_by_id(order_id, UUID(user_id))
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.get("/number/{order_number}", response_model=OrderResponse)
def get_order_by_number(
    order_number: str,
    user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    """Get order by order number"""
    order = order_service.get_order_by_number(order_number, UUID(user_id))
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/", response_model=OrderResponse)
def create_order(
    order_data: OrderCreate,
    user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    """Create new order"""
    try:
        return order_service.create_order(UUID(user_id), order_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{order_id}", response_model=OrderResponse)
def update_order(
    order_id: UUID,
    order_data: OrderUpdate,
    user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    """Update order (limited updates for users)"""
    try:
        # Only allow updating notes for regular users
        user_update = OrderUpdate(notes=order_data.notes) if order_data.notes else OrderUpdate()
        return order_service.update_order(order_id, user_update, UUID(user_id))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/{order_id}/cancel", response_model=OrderResponse)
def cancel_order(
    order_id: UUID,
    user_id: str = Depends(get_current_user_id),
    order_service: OrderService = Depends(get_order_service)
):
    """Cancel order"""
    try:
        return order_service.cancel_order(order_id, UUID(user_id))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
