import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, HTTPException
from typing import List, Optional
from app.core.config import settings
import uuid

class UploadService:
    def __init__(self):
        # Configure Cloudinary
        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET
        )
    
    def upload_image(self, file: UploadFile, folder: str = "products") -> dict:
        """
        Upload an image to Cloudinary
        """
        try:
            # Validate file type
            if not file.content_type.startswith('image/'):
                raise HTTPException(status_code=400, detail="File must be an image")
            
            # Validate file size (max 5MB)
            file.file.seek(0, 2)  # Seek to end
            file_size = file.file.tell()
            file.file.seek(0)  # Reset file pointer
            
            if file_size > 5 * 1024 * 1024:  # 5MB
                raise HTTPException(status_code=400, detail="File size must be less than 5MB")
            
            # Generate unique filename
            file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
            unique_filename = f"{uuid.uuid4()}.{file_extension}"
            
            # Upload to Cloudinary
            upload_result = cloudinary.uploader.upload(
                file.file,
                public_id=f"{folder}/{unique_filename}",
                folder=folder,
                resource_type="image",
                format=file_extension,
                quality="auto",
                fetch_format="auto"
            )
            
            return {
                "url": upload_result.get("secure_url"),
                "public_id": upload_result.get("public_id"),
                "width": upload_result.get("width"),
                "height": upload_result.get("height"),
                "format": upload_result.get("format"),
                "size": upload_result.get("bytes")
            }
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")
    
    def upload_multiple_images(self, files: List[UploadFile], folder: str = "products") -> List[dict]:
        """
        Upload multiple images to Cloudinary
        """
        if len(files) > 10:  # Limit to 10 images
            raise HTTPException(status_code=400, detail="Maximum 10 images allowed")
        
        uploaded_images = []
        for file in files:
            try:
                result = self.upload_image(file, folder)
                uploaded_images.append(result)
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Failed to upload {file.filename}: {str(e)}")
        
        return uploaded_images
    
    def delete_image(self, public_id: str) -> bool:
        """
        Delete an image from Cloudinary
        """
        try:
            result = cloudinary.uploader.destroy(public_id)
            return result.get("result") == "ok"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to delete image: {str(e)}")
    
    def get_image_info(self, public_id: str) -> dict:
        """
        Get image information from Cloudinary
        """
        try:
            result = cloudinary.api.resource(public_id)
            return {
                "url": result.get("secure_url"),
                "public_id": result.get("public_id"),
                "width": result.get("width"),
                "height": result.get("height"),
                "format": result.get("format"),
                "size": result.get("bytes"),
                "created_at": result.get("created_at")
            }
        except Exception as e:
            raise HTTPException(status_code=404, detail=f"Image not found: {str(e)}")

upload_service = UploadService()
