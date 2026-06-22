from fastapi import FastAPI, Depends, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
import crud
from database import engine, get_db

# Initialize database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Zeverse Jewelry API",
    description="Backend API for the Zeverse e-commerce platform",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for dev/test simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Zeverse Jewelry API. Visit /docs for Swagger documentation."}

# --- PRODUCTS ENDPOINTS ---
@app.get("/api/products", response_model=List[schemas.Product])
def read_products(
    category: Optional[str] = Query(None, description="Filter by category (e.g. Earrings, Rings, Neckpieces, etc.)"),
    collection: Optional[str] = Query(None, description="Filter by collection (e.g. Everyday Luxe, Festive, Wedding, Beach Vacation)"),
    min_price: Optional[float] = Query(None, description="Minimum price filter"),
    max_price: Optional[float] = Query(None, description="Maximum price filter"),
    search: Optional[str] = Query(None, description="Search products by title or description"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Retrieve all products matching the query parameters."""
    products = crud.get_products(
        db, 
        skip=skip, 
        limit=limit, 
        category=category, 
        collection=collection, 
        min_price=min_price, 
        max_price=max_price, 
        search=search
    )
    return products

@app.get("/api/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    """Retrieve a single product by ID."""
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

# --- ORDER ENDPOINTS ---
@app.post("/api/orders", response_model=schemas.Order, status_code=status.HTTP_201_CREATED)
def place_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    """Submit a new purchase order."""
    try:
        db_order = crud.create_order(db=db, order=order)
        return db_order
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to place order: {str(e)}")

@app.get("/api/orders/{order_number}", response_model=schemas.Order)
def track_order(order_number: str, db: Session = Depends(get_db)):
    """Retrieve order details by order tracking number."""
    db_order = crud.get_order_by_number(db, order_number=order_number)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found. Please verify your tracking ID.")
    return db_order

# --- CONTACT ENDPOINTS ---
@app.post("/api/contact", response_model=schemas.ContactMessage, status_code=status.HTTP_201_CREATED)
def submit_contact(message: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    """Submit a contact query message."""
    try:
        db_message = crud.create_contact_message(db=db, message=message)
        return db_message
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to submit message: {str(e)}")
