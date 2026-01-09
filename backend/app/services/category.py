from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from fastapi import HTTPException
from uuid import UUID
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate

class CategoryService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_categories(self, include_inactive: bool = False) -> List[Category]:
        query = self.db.query(Category)
        if not include_inactive:
            query = query.filter(Category.is_active == True)
        return query.all()
    
    def get_category_by_id(self, category_id: UUID) -> Optional[Category]:
        return self.db.query(Category).filter(Category.id == category_id).first()
    
    def get_category_by_slug(self, slug: str) -> Optional[Category]:
        return self.db.query(Category).filter(
            and_(Category.slug == slug, Category.is_active == True)
        ).first()
    
    def create_category(self, category_data: CategoryCreate) -> Category:
        # Check if category name already exists
        existing_category = self.db.query(Category).filter(Category.name == category_data.name).first()
        if existing_category:
            raise HTTPException(status_code=400, detail="Category with this name already exists")
        
        # Check if slug already exists
        existing_slug = self.db.query(Category).filter(Category.slug == category_data.slug).first()
        if existing_slug:
            raise HTTPException(status_code=400, detail="Category with this slug already exists")
        
        category = Category(**category_data.dict())
        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)
        return category
    
    def update_category(self, category_id: UUID, category_data: CategoryUpdate) -> Category:
        category = self.get_category_by_id(category_id)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        
        # If updating name, check if it already exists
        if category_data.name and category_data.name != category.name:
            existing_category = self.db.query(Category).filter(Category.name == category_data.name).first()
            if existing_category:
                raise HTTPException(status_code=400, detail="Category with this name already exists")
        
        # If updating slug, check if it already exists
        if category_data.slug and category_data.slug != category.slug:
            existing_slug = self.db.query(Category).filter(Category.slug == category_data.slug).first()
            if existing_slug:
                raise HTTPException(status_code=400, detail="Category with this slug already exists")
        
        for field, value in category_data.dict(exclude_unset=True).items():
            setattr(category, field, value)
        
        self.db.commit()
        self.db.refresh(category)
        return category
    
    def delete_category(self, category_id: UUID) -> bool:
        category = self.get_category_by_id(category_id)
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        
        # Check if category has products
        from app.models.product import Product
        products_count = self.db.query(Product).filter(Product.category_id == category_id).count()
        if products_count > 0:
            raise HTTPException(status_code=400, detail="Cannot delete category with existing products")
        
        # Soft delete
        category.is_active = False
        self.db.commit()
        return True
