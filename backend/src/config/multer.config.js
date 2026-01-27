import multer from 'multer';
import path from 'path';
import fs from 'fs';

const UPLOAD_DIR = 'upload/documents';
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Allowed MIME types for document uploads
const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'application/zip',
    'application/x-rar-compressed'
];


// Ensuring that upload directory exists
const ensureUploadDir = () => {
    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        console.log(`Created Upload directory: ${ UPLOAD_DIR }`);
    }
}

//Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        ensureUploadDir();
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${ uniqueSuffix }${ ext }`)
    }
});

//File filter to validate MIME types
const fileFilter = (req, file, cn) => {
    if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid File type. Only documents are allowed"), false);
    }
};

//Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE
    }
});

ensureUploadDir();

export default upload;
export { UPLOAD_DIR, MAX_FILE_SIZE, ALLOWED_MIME_TYPES };