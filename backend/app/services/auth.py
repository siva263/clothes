from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from app.core.config import settings
from supabase import create_client, Client
import re

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self):
        self.supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)
    
    def get_password_hash(self, password: str) -> str:
        return pwd_context.hash(password)
    
    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt
    
    def verify_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            return payload
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    
    async def signup(self, email: str, password: str, full_name: str, phone: Optional[str] = None, address: Optional[str] = None):
        # Validate email format
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            raise HTTPException(status_code=400, detail="Invalid email format")
        
        # Validate password strength
        if len(password) < 8:
            raise HTTPException(status_code=400, detail="Password must be at least 8 characters long")
        
        try:
            # Create user in Supabase Auth
            auth_response = self.supabase.auth.sign_up({
                "email": email,
                "password": password,
                "options": {
                    "data": {
                        "full_name": full_name,
                        "phone": phone,
                        "address": address
                    }
                }
            })
            
            if auth_response.user is None:
                raise HTTPException(status_code=400, detail="Failed to create user")
            
            return auth_response.user
            
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    async def login(self, email: str, password: str):
        try:
            # Sign in with Supabase Auth
            auth_response = self.supabase.auth.sign_in_with_password({
                "email": email,
                "password": password
            })
            
            if auth_response.user is None:
                raise HTTPException(status_code=401, detail="Invalid credentials")
            
            # Create custom JWT token for API
            access_token = self.create_access_token(
                data={"sub": auth_response.user.id, "email": email}
            )
            
            return {
                "access_token": access_token,
                "token_type": "bearer",
                "user": auth_response.user
            }
            
        except Exception as e:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    
    async def logout(self, token: str):
        try:
            self.supabase.auth.sign_out()
            return {"message": "Successfully logged out"}
        except Exception as e:
            raise HTTPException(status_code=400, detail="Failed to logout")

auth_service = AuthService()
