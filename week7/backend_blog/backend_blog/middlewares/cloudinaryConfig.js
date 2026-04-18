import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import "dotenv/config";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'blogapp_profiles',
    allowedFormats: ['jpg', 'png', 'jpeg'], // Notice it's allowedFormats, not allowed_formats usually, though sometimes both work. Wait, the docs say allowedFormats
  },
});

export const upload = multer({ storage: storage });
