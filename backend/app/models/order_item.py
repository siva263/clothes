from sqlalchemy import Column, String, Numeric, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class OrderItem(Base):
    __tablename__ = "order_items"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    order_id = Column(UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    product_name = Column(String, nullable=False)  # Denormalized for history
    product_sku = Column(String, nullable=False)   # Denormalized for history
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    total_price = Column(Numeric(10, 2), nullable=False)
    size = Column(String, nullable=True)
    color = Column(String, nullable=True)
    
    # Relationships
    order = relationship("Order", backref="order_items")
    product = relationship("Product")
    
    def __repr__(self):
        return f"<OrderItem {self.product_name}>"
