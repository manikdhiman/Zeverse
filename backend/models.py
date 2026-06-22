from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    images = Column(Text, nullable=False)  # Comma-separated image URLs or local paths
    category = Column(String, index=True, nullable=False)  # Earrings, Rings, Neckpieces, etc.
    collection = Column(String, index=True, nullable=True)  # Everyday Luxe, Beach, etc.
    rating = Column(Float, default=4.5)
    stock = Column(Integer, default=10)
    specifications = Column(Text, nullable=True)  # JSON-formatted string of custom specs (e.g. weight, dimensions)

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, index=True, nullable=False)
    customer_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    address = Column(Text, nullable=False)
    total_amount = Column(Float, nullable=False)
    status = Column(String, default="Pending")  # Pending, Shipped, Delivered, Cancelled
    items = Column(Text, nullable=False)  # JSON string of cart items: [{"product_id": 1, "name": "...", "price": 10.0, "quantity": 2, "image": "..."}]
    created_at = Column(DateTime, default=datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
