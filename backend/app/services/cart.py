from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from fastapi import HTTPException
from uuid import UUID
from app.models.cart_item import CartItem
from app.models.product import Product
from app.schemas.cart_item import CartItemCreate, CartItemUpdate

class CartService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_cart_items(self, user_id: UUID) -> List[CartItem]:
        return self.db.query(CartItem).filter(CartItem.user_id == user_id).all()
    
    def get_cart_item(self, user_id: UUID, product_id: UUID) -> Optional[CartItem]:
        return self.db.query(CartItem).filter(
            and_(CartItem.user_id == user_id, CartItem.product_id == product_id)
        ).first()
    
    def add_to_cart(self, user_id: UUID, cart_item_data: CartItemCreate) -> CartItem:
        # Check if product exists and is active
        product = self.db.query(Product).filter(
            and_(Product.id == cart_item_data.product_id, Product.is_active == True)
        ).first()
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Check if product has sufficient stock
        if product.stock_quantity < cart_item_data.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")
        
        # Check if item already exists in cart
        existing_item = self.get_cart_item(user_id, cart_item_data.product_id)
        
        if existing_item:
            # Update quantity if same size and color
            if (existing_item.size == cart_item_data.size and 
                existing_item.color == cart_item_data.color):
                new_quantity = existing_item.quantity + cart_item_data.quantity
                if product.stock_quantity < new_quantity:
                    raise HTTPException(status_code=400, detail="Insufficient stock")
                
                existing_item.quantity = new_quantity
                self.db.commit()
                self.db.refresh(existing_item)
                return existing_item
            else:
                # Create new cart item for different size/color
                cart_item = CartItem(
                    user_id=user_id,
                    **cart_item_data.dict()
                )
                self.db.add(cart_item)
                self.db.commit()
                self.db.refresh(cart_item)
                return cart_item
        else:
            # Create new cart item
            cart_item = CartItem(
                user_id=user_id,
                **cart_item_data.dict()
            )
            self.db.add(cart_item)
            self.db.commit()
            self.db.refresh(cart_item)
            return cart_item
    
    def update_cart_item(self, user_id: UUID, product_id: UUID, cart_item_data: CartItemUpdate) -> CartItem:
        cart_item = self.get_cart_item(user_id, product_id)
        if not cart_item:
            raise HTTPException(status_code=404, detail="Cart item not found")
        
        # Check if product has sufficient stock for new quantity
        if cart_item_data.quantity is not None:
            product = self.db.query(Product).filter(Product.id == product_id).first()
            if product and product.stock_quantity < cart_item_data.quantity:
                raise HTTPException(status_code=400, detail="Insufficient stock")
        
        for field, value in cart_item_data.dict(exclude_unset=True).items():
            setattr(cart_item, field, value)
        
        self.db.commit()
        self.db.refresh(cart_item)
        return cart_item
    
    def remove_from_cart(self, user_id: UUID, product_id: UUID) -> bool:
        cart_item = self.get_cart_item(user_id, product_id)
        if not cart_item:
            raise HTTPException(status_code=404, detail="Cart item not found")
        
        self.db.delete(cart_item)
        self.db.commit()
        return True
    
    def clear_cart(self, user_id: UUID) -> bool:
        cart_items = self.get_cart_items(user_id)
        for item in cart_items:
            self.db.delete(item)
        self.db.commit()
        return True
    
    def get_cart_total(self, user_id: UUID) -> float:
        cart_items = self.get_cart_items(user_id)
        total = 0.0
        
        for item in cart_items:
            product = self.db.query(Product).filter(Product.id == item.product_id).first()
            if product:
                total += float(product.price) * item.quantity
        
        return total
    
    def get_cart_count(self, user_id: UUID) -> int:
        cart_items = self.get_cart_items(user_id)
        return sum(item.quantity for item in cart_items)
