from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.core.database import get_db
from app.services.category import CategoryService
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from app.api.endpoints.auth import get_current_user_id
from fastapi.security import HTTPBearer

router = APIRouter()
security = HTTPBearer()

def get_category_service(db: Session = Depends(get_db)) -> CategoryService:
    return CategoryService(db)

@router.get("/", response_model=List[CategoryResponse])
def get_categories(
    include_inactive: bool = False,
    category_service: CategoryService = Depends(get_category_service)
):
    """Get all categories"""
    return category_service.get_categories(include_inactive)

@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(
    category_id: UUID,
    category_service: CategoryService = Depends(get_category_service)
):
    """Get category by ID"""
    category = category_service.get_category_by_id(category_id)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.get("/slug/{slug}", response_model=CategoryResponse)
def get_category_by_slug(
    slug: str,
    category_service: CategoryService = Depends(get_category_service)
):
    """Get category by slug"""
    category = category_service.get_category_by_slug(slug)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category

@router.post("/", response_model=CategoryResponse)
def create_category(
    category_data: CategoryCreate,
    category_service: CategoryService = Depends(get_category_service),
    credentials: str = Depends(security)
):
    """Create new category (Admin only)"""
    # TODO: Add admin check
    try:
        return category_service.create_category(category_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: UUID,
    category_data: CategoryUpdate,
    category_service: CategoryService = Depends(get_category_service),
    credentials: str = Depends(security)
):
    """Update category (Admin only)"""
    # TODO: Add admin check
    try:
        return category_service.update_category(category_id, category_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{category_id}")
def delete_category(
    category_id: UUID,
    category_service: CategoryService = Depends(get_category_service),
    credentials: str = Depends(security)
):
    """Delete category (Admin only)"""
    # TODO: Add admin check
    try:
        category_service.delete_category(category_id)
        return {"message": "Category deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
