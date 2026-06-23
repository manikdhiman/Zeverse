from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
import random
import jwt

# 🚀 1. Define the core application instance FIRST
app = FastAPI(title="Zeverse Luxury Jewelry API Portal")

# 🏛️ CORS Security Configurations (Allows port 3000 to talk to port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔐 SECURITY METRICS DEFINITIONS
SECRET_KEY = "SUPER_SECRET_ZEVERSE_KEY_MATRIX_9982"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 180 * 24 * 60 


# 📦 STATIC DATABASE REGISTRY (Temporary Mock Vault)
JEWELRY_PRODUCTS = [
    {
        "id": "1",
        "name": "Sunny Resin Daisy Drop Earrings",
        "category": "earrings",
        "price": 349,
        "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80",
        "material": "High-grade clear resin & 18k gold-plated brass base pins.",
        "size": "Length: 4.5cm | Weight: 6g (Ultra Lightweight Scale)",
        "care": "Waterproof, perfume-safe. Wipe dry with a microfiber cloth after wear."
    },
    {
        "id": "2",
        "name": "Terracotta Heritage Jhumkas",
        "category": "earrings",
        "price": 599,
        "image": "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&q=80",
        "material": "Organic baked terracotta clay with micro-fine lacquer seal.",
        "size": "Drop length: 6cm | Umbrella diameter: 2.5cm",
        "care": "Avoid direct submersion in water. Delicate clay construction—handle gently."
    },
    {
        "id": "3",
        "name": "Baroque Statement Pearl Choker",
        "category": "neckpieces",
        "price": 1299,
        "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&q=80",
        "material": "Genuine irregular AAA baroque pearls on reinforced steel cord.",
        "size": "Length: 36cm + 5cm premium extension tail chain.",
        "care": "Keep safe from abrasive chemicals and cosmetics. Store in a padded velvet pouch."
    },
    {
        "id": "4",
        "name": "Serpent Scale Heavy Ring",
        "category": "rings",
        "price": 450,
        "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80",
        "material": "316L Surgical Stainless Steel matrix with thick PVD gold overlay.",
        "size": "Adjustable split band design. Fits standard ring sizes 6 to 9.",
        "care": "100% Sweatproof, showerproof, and completely non-tarnish guarantee."
    },
    # ✦ ADDED NEW BROOCHES REGISTRIES PERFECTLY HERE
    {
        "id": "5",
        "name": "Baroque Gilded Crest Brooch",
        "category": "brooches",
        "price": 899,
        "image": "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=500&q=80",
        "material": "Aged brass base, 18k antique gold overlay, micro-set zircon stones.",
        "size": "Dimensions: 5.5cm x 5.5cm | Safety lock pins.",
        "care": "Store in a dry velvet casing. Avoid spraying premium perfumes directly onto metal plating."
    },
    {
        "id": "6",
        "name": "Midnight Orchid Enamel Pin",
        "category": "brooches",
        "price": 750,
        "image": "https://images.unsplash.com/photo-1590548784585-645d2b604d6e?w=500&q=80",
        "material": "Hand-painted liquid glass enamel, zinc alloy matrix, central freshwater pearl.",
        "size": "Dimensions: 6.0cm x 4.2cm | Heavy fabric support pin.",
        "care": "Scratch-resistant coating applied. Clean using only a damp soft cloth microfiber wipe."
    }
]

# 📝 MEMORY ORDER LOG ENGINE
ORDERS_DATABASE = {}


# 👤 SCHEMAS MATRIX LAYER
class LoginRequest(BaseModel):
    email: str
    password: str

class CheckoutRequest(BaseModel):
    fullName: str
    phoneNumber: str
    emailAddress: str
    shippingAddress: str
    city: str
    postalCode: str
    total_payable: int


# -------------------------------------------------------------------
# 🌐 ROUTES & ACTIONS PORTS
# -------------------------------------------------------------------

@app.get("/")
async def server_root_check():
    return {"status": "operational", "engine": "FastAPI V8000"}


# 🔑 PORT 1: ACCOUNT AUTHENTICATION PORTAL
@app.post("/api/auth/login")
async def login_endpoint(payload: LoginRequest):
    # Standard Luxury testing user credentials
    if payload.email == "customer@zeverse.com" and payload.password == "securepassword123":
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token_payload = {"sub": payload.email, "exp": expire}
        encoded_jwt = jwt.encode(token_payload, SECRET_KEY, algorithm=ALGORITHM)
        
        return {
            "access_token": encoded_jwt,
            "token_type": "bearer",
            "email": payload.email
        }
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="The email profile or secure password does not match our records."
    )


# 🛍️ PORT 2: GET ALL PRODUCTS DATA
@app.get("/api/products")
async def get_all_products():
    return JEWELRY_PRODUCTS


# 🔍 PORT 3: GET SPECIFIC PRODUCT DATA BY DYNAMIC ID
@app.get("/api/products/{product_id}")
async def get_single_product(product_id: str):
    for item in JEWELRY_PRODUCTS:
        if item["id"] == product_id:
            return item
    raise HTTPException(status_code=404, detail="Artisan statement design missing.")


# 🛒 PORT 4: PLACE NEW CUSTOMER ORDER (Updated endpoint match for frontend)
@app.post("/api/orders/place")
async def create_new_order(payload: CheckoutRequest):
    generated_id = f"ZV-2026-{random.randint(10000, 99999)}"
    
    new_order_record = {
        "order_number": generated_id,
        "customer_name": payload.fullName,
        "email": payload.emailAddress,
        "total_payable": payload.total_payable,
        "current_stage": 1,
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    ORDERS_DATABASE[generated_id] = new_order_record
    return new_order_record


# 🚚 PORT 5: SCAN AND LOCATE LIVE RECORD IN TRANSIT
@app.get("/api/orders/track/{order_number}")
async def fetch_order_status(order_number: str):
    lookup_code = order_number.strip()
    if lookup_code in ORDERS_DATABASE:
        return ORDERS_DATABASE[lookup_code]
    raise HTTPException(status_code=404, detail="Tracking reference identity token missing.")