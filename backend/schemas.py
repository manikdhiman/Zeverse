from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

# --- PRODUCT SCHEMAS ---
class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    images: str
    category: str
    collection: Optional[str] = None
    rating: Optional[float] = 4.5
    stock: Optional[int] = 10
    specifications: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True

# --- ORDER SCHEMAS ---
class OrderCreate(BaseModel):
    customer_name: str
    email: str
    phone: str
    address: str
    total_amount: float
    items: str  # JSON string representing the order items

class Order(OrderCreate):
    id: int
    order_number: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# --- CONTACT SCHEMAS ---
class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class ContactMessage(ContactMessageCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
