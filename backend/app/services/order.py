from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_
from fastapi import HTTPException
from uuid import UUID
from datetime import datetime
import random
import string
from app.models.order import Order, OrderItem, OrderStatus
from app.models.product import Product
from app.models.cart_item import CartItem
from app.schemas.order import OrderCreate, OrderUpdate

class OrderService:
    def __init__(self, db: Session):
        self.db = db
    
    def generate_order_number(self) -> str:
        """Generate unique order number"""
        timestamp = datetime.now().strftime("%Y%m%d")
        random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        return f"ORD{timestamp}{random_str}"
    
    def get_orders(self, user_id: Optional[UUID] = None, include_all: bool = False) -> List[Order]:
        query = self.db.query(Order)
        
        if user_id:
            query = query.filter(Order.user_id == user_id)
        
        if not include_all:
            # Only return non-cancelled orders for regular users
            query = query.filter(Order.status != OrderStatus.CANCELLED)
        
        return query.order_by(Order.created_at.desc()).all()
    
    def get_order_by_id(self, order_id: UUID, user_id: Optional[UUID] = None) -> Optional[Order]:
        query = self.db.query(Order).filter(Order.id == order_id)
        
        if user_id:
            query = query.filter(Order.user_id == user_id)
        
        return query.first()
    
    def get_order_by_number(self, order_number: str, user_id: Optional[UUID] = None) -> Optional[Order]:
        query = self.db.query(Order).filter(Order.order_number == order_number)
        
        if user_id:
            query = query.filter(Order.user_id == user_id)
        
        return query.first()
    
    def create_order(self, user_id: UUID, order_data: OrderCreate) -> Order:
        # Validate all products and calculate total
        total_amount = 0.0
        order_items = []
        
        for item_data in order_data.items:
            # Check if product exists and is active
            product = self.db.query(Product).filter(
                and_(Product.id == item_data.product_id, Product.is_active == True)
            ).first()
            
            if not product:
                raise HTTPException(status_code=404, detail=f"Product {item_data.product_id} not found")
            
            # Check stock
            if product.stock_quantity < item_data.quantity:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Insufficient stock for product {product.name}"
                )
            
            # Calculate item total
            item_total = float(product.price) * item_data.quantity
            total_amount += item_total
            
            order_items.append({
                "product_id": product.id,
                "product_name": product.name,
                "product_sku": product.sku,
                "quantity": item_data.quantity,
                "unit_price": product.price,
                "total_price": item_total,
                "size": item_data.size,
                "color": item_data.color
            })
        
        # Create order
        order = Order(
            user_id=user_id,
            order_number=self.generate_order_number(),
            total_amount=total_amount,
            shipping_address=order_data.shipping_address,
            billing_address=order_data.billing_address,
            notes=order_data.notes
        )
        
        self.db.add(order)
        self.db.flush()  # Get the order ID
        
        # Create order items
        for item_data in order_items:
            order_item = OrderItem(
                order_id=order.id,
                **item_data
            )
            self.db.add(order_item)
            
            # Update product stock
            product = self.db.query(Product).filter(Product.id == item_data["product_id"]).first()
            product.stock_quantity -= item_data["quantity"]
        
        # Clear user's cart
        cart_items = self.db.query(CartItem).filter(CartItem.user_id == user_id).all()
        for cart_item in cart_items:
            self.db.delete(cart_item)
        
        self.db.commit()
        self.db.refresh(order)
        
        return order
    
    def update_order(self, order_id: UUID, order_data: OrderUpdate, user_id: Optional[UUID] = None) -> Order:
        order = self.get_order_by_id(order_id, user_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        for field, value in order_data.dict(exclude_unset=True).items():
            setattr(order, field, value)
        
        self.db.commit()
        self.db.refresh(order)
        return order
    
    def cancel_order(self, order_id: UUID, user_id: Optional[UUID] = None) -> Order:
        order = self.get_order_by_id(order_id, user_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        # Check if order can be cancelled
        if order.status in [OrderStatus.SHIPPED, OrderStatus.DELIVERED]:
            raise HTTPException(status_code=400, detail="Cannot cancel shipped or delivered order")
        
        # Update order status
        order.status = OrderStatus.CANCELLED
        
        # Restore product stock
        for order_item in order.order_items:
            product = self.db.query(Product).filter(Product.id == order_item.product_id).first()
            if product:
                product.stock_quantity += order_item.quantity
        
        self.db.commit()
        self.db.refresh(order)
        return order
    
    def get_user_order_history(self, user_id: UUID, limit: int = 20) -> List[Order]:
        return self.db.query(Order).filter(
            Order.user_id == user_id
        ).order_by(Order.created_at.desc()).limit(limit).all()
    
    def get_order_statistics(self, start_date: Optional[datetime] = None, end_date: Optional[datetime] = None):
        query = self.db.query(Order)
        
        if start_date:
            query = query.filter(Order.created_at >= start_date)
        
        if end_date:
            query = query.filter(Order.created_at <= end_date)
        
        orders = query.all()
        
        total_orders = len(orders)
        total_revenue = sum(float(order.total_amount) for order in orders)
        
        status_counts = {}
        for status in OrderStatus:
            status_counts[status.value] = sum(1 for order in orders if order.status == status)
        
        return {
            "total_orders": total_orders,
            "total_revenue": total_revenue,
            "status_counts": status_counts,
            "average_order_value": total_revenue / total_orders if total_orders > 0 else 0
        }
