from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from app.core.database import get_db
from app.services.product import ProductService
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse, ProductFilter
from app.api.endpoints.auth import get_current_user_id
from fastapi.security import HTTPBearer

router = APIRouter()
security = HTTPBearer()

def get_product_service(db: Session = Depends(get_db)) -> ProductService:
    return ProductService(db)

@router.get("/", response_model=List[ProductResponse])
def get_products(
    category_id: Optional[UUID] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    sizes: Optional[List[str]] = Query(None),
    colors: Optional[List[str]] = Query(None),
    is_featured: Optional[bool] = Query(None),
    search: Optional[str] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    product_service: ProductService = Depends(get_product_service)
):
    """Get products with optional filters"""
    filters = ProductFilter(
        category_id=category_id,
        min_price=min_price,
        max_price=max_price,
        sizes=sizes or [],
        colors=colors or [],
        is_featured=is_featured,
        search=search,
        skip=skip,
        limit=limit
    )
    
    products = product_service.get_products(filters)
    return products

@router.get("/featured", response_model=List[ProductResponse])
def get_featured_products(
    limit: int = Query(8, ge=1, le=20),
    product_service: ProductService = Depends(get_product_service)
):
    """Get featured products"""
    return product_service.get_featured_products(limit)

@router.get("/category/{category_id}", response_model=List[ProductResponse])
def get_products_by_category(
    category_id: UUID,
    limit: int = Query(20, ge=1, le=100),
    product_service: ProductService = Depends(get_product_service)
):
    """Get products by category"""
    return product_service.get_products_by_category(category_id, limit)

@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: UUID,
    product_service: ProductService = Depends(get_product_service)
):
    """Get product by ID"""
    product = product_service.get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/sku/{sku}", response_model=ProductResponse)
def get_product_by_sku(
    sku: str,
    product_service: ProductService = Depends(get_product_service)
):
    """Get product by SKU"""
    product = product_service.get_product_by_sku(sku)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductResponse)
def create_product(
    product_data: ProductCreate,
    product_service: ProductService = Depends(get_product_service),
    credentials: str = Depends(security)
):
    """Create new product (Admin only)"""
    # TODO: Add admin check
    try:
        return product_service.create_product(product_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: UUID,
    product_data: ProductUpdate,
    product_service: ProductService = Depends(get_product_service),
    credentials: str = Depends(security)
):
    """Update product (Admin only)"""
    # TODO: Add admin check
    try:
        return product_service.update_product(product_id, product_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{product_id}")
def delete_product(
    product_id: UUID,
    product_service: ProductService = Depends(get_product_service),
    credentials: str = Depends(security)
):
    """Delete product (Admin only)"""
    # TODO: Add admin check
    try:
        product_service.delete_product(product_id)
        return {"message": "Product deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
