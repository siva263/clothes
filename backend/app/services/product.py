from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from fastapi import HTTPException
from uuid import UUID
from app.models.product import Product
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductUpdate, ProductFilter

class ProductService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_products(self, filters: ProductFilter) -> List[Product]:
        query = self.db.query(Product).join(Category)
        
        # Apply filters
        if filters.category_id:
            query = query.filter(Product.category_id == filters.category_id)
        
        if filters.min_price:
            query = query.filter(Product.price >= filters.min_price)
        
        if filters.max_price:
            query = query.filter(Product.price <= filters.max_price)
        
        if filters.sizes:
            query = query.filter(Product.sizes.overlap(filters.sizes))
        
        if filters.colors:
            query = query.filter(Product.colors.overlap(filters.colors))
        
        if filters.is_featured is not None:
            query = query.filter(Product.is_featured == filters.is_featured)
        
        if filters.search:
            search_term = f"%{filters.search}%"
            query = query.filter(
                or_(
                    Product.name.ilike(search_term),
                    Product.description.ilike(search_term),
                    Product.sku.ilike(search_term)
                )
            )
        
        # Only active products
        query = query.filter(Product.is_active == True)
        
        # Pagination
        query = query.offset(filters.skip).limit(filters.limit)
        
        return query.all()
    
    def get_product_by_id(self, product_id: UUID) -> Optional[Product]:
        return self.db.query(Product).filter(
            and_(Product.id == product_id, Product.is_active == True)
        ).first()
    
    def get_product_by_sku(self, sku: str) -> Optional[Product]:
        return self.db.query(Product).filter(
            and_(Product.sku == sku, Product.is_active == True)
        ).first()
    
    def create_product(self, product_data: ProductCreate) -> Product:
        # Check if SKU already exists
        existing_product = self.get_product_by_sku(product_data.sku)
        if existing_product:
            raise HTTPException(status_code=400, detail="Product with this SKU already exists")
        
        # Check if category exists
        category = self.db.query(Category).filter(Category.id == product_data.category_id).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        
        product = Product(**product_data.dict())
        self.db.add(product)
        self.db.commit()
        self.db.refresh(product)
        return product
    
    def update_product(self, product_id: UUID, product_data: ProductUpdate) -> Product:
        product = self.get_product_by_id(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # If updating category, check if it exists
        if product_data.category_id:
            category = self.db.query(Category).filter(Category.id == product_data.category_id).first()
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")
        
        # If updating SKU, check if it already exists
        if product_data.sku and product_data.sku != product.sku:
            existing_product = self.get_product_by_sku(product_data.sku)
            if existing_product:
                raise HTTPException(status_code=400, detail="Product with this SKU already exists")
        
        for field, value in product_data.dict(exclude_unset=True).items():
            setattr(product, field, value)
        
        self.db.commit()
        self.db.refresh(product)
        return product
    
    def delete_product(self, product_id: UUID) -> bool:
        product = self.get_product_by_id(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Soft delete
        product.is_active = False
        self.db.commit()
        return True
    
    def get_featured_products(self, limit: int = 8) -> List[Product]:
        return self.db.query(Product).filter(
            and_(Product.is_featured == True, Product.is_active == True)
        ).limit(limit).all()
    
    def get_products_by_category(self, category_id: UUID, limit: int = 20) -> List[Product]:
        return self.db.query(Product).filter(
            and_(
                Product.category_id == category_id,
                Product.is_active == True
            )
        ).limit(limit).all()
    
    def update_stock(self, product_id: UUID, quantity_change: int) -> Product:
        product = self.get_product_by_id(product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        new_stock = product.stock_quantity + quantity_change
        if new_stock < 0:
            raise HTTPException(status_code=400, detail="Insufficient stock")
        
        product.stock_quantity = new_stock
        self.db.commit()
        self.db.refresh(product)
        return product
