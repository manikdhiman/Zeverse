import uuid
from sqlalchemy.orm import Session
from sqlalchemy import or_
import models
import schemas

# --- PRODUCT CRUD ---
def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def get_products(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    category: str = None,
    collection: str = None,
    min_price: float = None,
    max_price: float = None,
    search: str = None,
):
    query = db.query(models.Product)
    
    if category and category.lower() != "all":
        query = query.filter(models.Product.category.ilike(category))
        
    if collection and collection.lower() != "all":
        query = query.filter(models.Product.collection.ilike(collection))
        
    if min_price is not None:
        query = query.filter(models.Product.price >= min_price)
        
    if max_price is not None:
        query = query.filter(models.Product.price <= max_price)
        
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            or_(
                models.Product.name.ilike(search_filter),
                models.Product.description.ilike(search_filter)
            )
        )
        
    return query.offset(skip).limit(limit).all()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# --- ORDER CRUD ---
def create_order(db: Session, order: schemas.OrderCreate):
    # Generate unique order number (e.g., ZEV-XXXX-XXXX)
    order_number = f"ZEV-{uuid.uuid4().hex[:8].upper()}"
    db_order = models.Order(
        order_number=order_number,
        customer_name=order.customer_name,
        email=order.email,
        phone=order.phone,
        address=order.address,
        total_amount=order.total_amount,
        items=order.items,
        status="Pending"
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_order_by_number(db: Session, order_number: str):
    return db.query(models.Order).filter(models.Order.order_number == order_number).first()

# --- CONTACT CRUD ---
def create_contact_message(db: Session, message: schemas.ContactMessageCreate):
    db_message = models.ContactMessage(
        name=message.name,
        email=message.email,
        message=message.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
