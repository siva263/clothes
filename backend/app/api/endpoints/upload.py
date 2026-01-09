from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import List, Optional
from app.services.upload import upload_service
from app.api.endpoints.auth import get_current_user_id
from fastapi.security import HTTPBearer
from pydantic import BaseModel

router = APIRouter()
security = HTTPBearer()

class ImageDeleteRequest(BaseModel):
    public_id: str

@router.post("/image")
def upload_single_image(
    file: UploadFile = File(...),
    folder: Optional[str] = "products",
    user_id: str = Depends(get_current_user_id)
):
    """Upload a single image"""
    try:
        result = upload_service.upload_image(file, folder)
        return {
            "success": True,
            "message": "Image uploaded successfully",
            "data": result
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/images")
def upload_multiple_images(
    files: List[UploadFile] = File(...),
    folder: Optional[str] = "products",
    user_id: str = Depends(get_current_user_id)
):
    """Upload multiple images"""
    try:
        # Validate number of files
        if len(files) == 0:
            raise HTTPException(status_code=400, detail="No files provided")
        
        results = upload_service.upload_multiple_images(files, folder)
        return {
            "success": True,
            "message": f"{len(results)} images uploaded successfully",
            "data": results
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/image")
def delete_image(
    delete_request: ImageDeleteRequest,
    user_id: str = Depends(get_current_user_id)
):
    """Delete an image"""
    try:
        success = upload_service.delete_image(delete_request.public_id)
        if success:
            return {
                "success": True,
                "message": "Image deleted successfully"
            }
        else:
            raise HTTPException(status_code=400, detail="Failed to delete image")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/image/{public_id}")
def get_image_info(
    public_id: str,
    user_id: str = Depends(get_current_user_id)
):
    """Get image information"""
    try:
        result = upload_service.get_image_info(public_id)
        return {
            "success": True,
            "data": result
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
