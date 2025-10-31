import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vineet-fashion-store', // A folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'],
    // public_id is set by default to be unique
  },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

export { upload, cloudinary };
