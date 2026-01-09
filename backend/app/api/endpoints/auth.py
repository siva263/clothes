from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.auth import auth_service
from app.schemas.user import UserCreate, UserLogin, UserResponse

router = APIRouter()
security = HTTPBearer()

@router.post("/signup", response_model=dict)
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    try:
        user = await auth_service.signup(
            email=user_data.email,
            password=user_data.password,
            full_name=user_data.full_name,
            phone=user_data.phone,
            address=user_data.address
        )
        return {
            "message": "User created successfully",
            "user": {
                "id": user.id,
                "email": user.email,
                "full_name": user.user_metadata.get("full_name") if user.user_metadata else None
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=dict)
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user and return access token"""
    try:
        result = await auth_service.login(
            email=user_credentials.email,
            password=user_credentials.password
        )
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/logout", response_model=dict)
async def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Logout user"""
    try:
        await auth_service.logout(credentials.credentials)
        return {"message": "Successfully logged out"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to logout")

@router.get("/me", response_model=dict)
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current user information"""
    try:
        payload = auth_service.verify_token(credentials.credentials)
        return {
            "user_id": payload.get("sub"),
            "email": payload.get("email")
        }
    except HTTPException:
        raise

async def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Dependency to get current user ID"""
    payload = auth_service.verify_token(credentials.credentials)
    return payload.get("sub")
