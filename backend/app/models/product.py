from sqlalchemy import Column, String, Text, Numeric, DateTime, Boolean, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class Product(Base):
    __tablename__ = "products"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    original_price = Column(Numeric(10, 2), nullable=True)
    sku = Column(String, unique=True, nullable=False, index=True)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=False)
    images = Column(ARRAY(String), nullable=True)
    sizes = Column(ARRAY(String), nullable=True)  # ["S", "M", "L", "XL"]
    colors = Column(ARRAY(String), nullable=True)  # ["Black", "White", "Navy"]
    stock_quantity = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    category = relationship("Category", backref="products")
    
    def __repr__(self):
        return f"<Product {self.name}>"
