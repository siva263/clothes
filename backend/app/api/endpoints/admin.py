from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from app.core.database import get_db
from app.services.product import ProductService
from app.services.category import CategoryService
from app.services.order import OrderService
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse, ProductFilter
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from app.schemas.order import OrderResponse, OrderUpdate
from app.api.endpoints.auth import get_current_user_id
from fastapi.security import HTTPBearer

router = APIRouter()
security = HTTPBearer()

def get_product_service(db: Session = Depends(get_db)) -> ProductService:
    return ProductService(db)

def get_category_service(db: Session = Depends(get_db)) -> CategoryService:
    return CategoryService(db)

def get_order_service(db: Session = Depends(get_db)) -> OrderService:
    return OrderService(db)

# TODO: Add admin authentication middleware
# For now, using basic token authentication

@router.get("/dashboard")
def get_dashboard_stats(
    user_id: str = Depends(get_current_user_id),
    product_service: ProductService = Depends(get_product_service),
    order_service: OrderService = Depends(get_order_service)
):
    """Get admin dashboard statistics"""
    # TODO: Add admin check
    
    # Get basic stats
    stats = order_service.get_order_statistics()
    
    return {
        "total_orders": stats["total_orders"],
        "total_revenue": stats["total_revenue"],
        "status_counts": stats["status_counts"],
        "average_order_value": stats["average_order_value"]
    }

# Product Management
@router.get("/products", response_model=List[ProductResponse])
def admin_get_products(
    category_id: Optional[UUID] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    product_service: ProductService = Depends(get_product_service),
    user_id: str = Depends(get_current_user_id)
):
    """Get all products (including inactive) for admin"""
    # TODO: Add admin check
    
    filters = ProductFilter(
        category_id=category_id,
        min_price=min_price,
        max_price=max_price,
        search=search,
        skip=skip,
        limit=limit
    )
    
    return product_service.get_products(filters)

@router.post("/products", response_model=ProductResponse)
def admin_create_product(
    product_data: ProductCreate,
    product_service: ProductService = Depends(get_product_service),
    user_id: str = Depends(get_current_user_id)
):
    """Create product"""
    # TODO: Add admin check
    try:
        return product_service.create_product(product_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/products/{product_id}", response_model=ProductResponse)
def admin_update_product(
    product_id: UUID,
    product_data: ProductUpdate,
    product_service: ProductService = Depends(get_product_service),
    user_id: str = Depends(get_current_user_id)
):
    """Update product"""
    # TODO: Add admin check
    try:
        return product_service.update_product(product_id, product_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/products/{product_id}")
def admin_delete_product(
    product_id: UUID,
    product_service: ProductService = Depends(get_product_service),
    user_id: str = Depends(get_current_user_id)
):
    """Delete product"""
    # TODO: Add admin check
    try:
        product_service.delete_product(product_id)
        return {"message": "Product deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Category Management
@router.get("/categories", response_model=List[CategoryResponse])
def admin_get_categories(
    include_inactive: bool = True,
    category_service: CategoryService = Depends(get_category_service),
    user_id: str = Depends(get_current_user_id)
):
    """Get all categories for admin"""
    # TODO: Add admin check
    return category_service.get_categories(include_inactive)

@router.post("/categories", response_model=CategoryResponse)
def admin_create_category(
    category_data: CategoryCreate,
    category_service: CategoryService = Depends(get_category_service),
    user_id: str = Depends(get_current_user_id)
):
    """Create category"""
    # TODO: Add admin check
    try:
        return category_service.create_category(category_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/categories/{category_id}", response_model=CategoryResponse)
def admin_update_category(
    category_id: UUID,
    category_data: CategoryUpdate,
    category_service: CategoryService = Depends(get_category_service),
    user_id: str = Depends(get_current_user_id)
):
    """Update category"""
    # TODO: Add admin check
    try:
        return category_service.update_category(category_id, category_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/categories/{category_id}")
def admin_delete_category(
    category_id: UUID,
    category_service: CategoryService = Depends(get_category_service),
    user_id: str = Depends(get_current_user_id)
):
    """Delete category"""
    # TODO: Add admin check
    try:
        category_service.delete_category(category_id)
        return {"message": "Category deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Order Management
@router.get("/orders", response_model=List[OrderResponse])
def admin_get_orders(
    order_service: OrderService = Depends(get_order_service),
    user_id: str = Depends(get_current_user_id)
):
    """Get all orders for admin"""
    # TODO: Add admin check
    return order_service.get_orders(include_all=True)

@router.get("/orders/{order_id}", response_model=OrderResponse)
def admin_get_order(
    order_id: UUID,
    order_service: OrderService = Depends(get_order_service),
    user_id: str = Depends(get_current_user_id)
):
    """Get order by ID for admin"""
    # TODO: Add admin check
    order = order_service.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.put("/orders/{order_id}", response_model=OrderResponse)
def admin_update_order(
    order_id: UUID,
    order_data: OrderUpdate,
    order_service: OrderService = Depends(get_order_service),
    user_id: str = Depends(get_current_user_id)
):
    """Update order for admin"""
    # TODO: Add admin check
    try:
        return order_service.update_order(order_id, order_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
