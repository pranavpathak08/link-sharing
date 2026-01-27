// Middleware to handler multer specific errors

import multer from 'multer';

export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    message: "File too large. Maximum size is 10MB"
                });
            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({
                    message: "Too many files. Only one file allowed"
                });
            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({
                    message: "Unexpected field in file upload"
                });
            default:
                return res.status(400).json({
                    message: `Upload error: ${ err.message }`
                });
        }
    } else if (err) {
        return res.status(400).json({
            message: err.message || 'File upload failed'
        });
    }
    next();
}
