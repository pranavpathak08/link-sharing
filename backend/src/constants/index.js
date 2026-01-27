/**
 * Application wide constants
 * Centralized configuration
 */

// File upload constants
export const FILE_UPLOAD = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB in bytes
    UPLOAD_DIR: 'uploads/documents',
    ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.zip', '.rar'],
    ALLOWED_MIME_TYPES: [
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
    ]
};

//Pagination defaults
export const PAGINATION = {
    DEAFULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100
};

//Resource types
export const RESOURCE_TYPES = {
    LINK: 'LINK',
    DOCUMENT: 'DOCUMENT'
};

//Topic visibility
export const TOPIC_VISIBILITY = {
    PUBLIC: 'PUBLIC',
    PRIVATE: 'PRIVATE'
};

//Subscription seriousness level
export const SERIOUSNESS_LEVELS = {
    CASUAL: 'CASUAL',
    SERIOUS: 'SERIOUS',
    VERY_SERIOUS: 'VERY_SERIOUS'
};

//Invite status
export const INVITE_STATUS = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
};

//JWT configuration
export const JWT_CONFIG = {
    EXPIRES_IN: '1d',
    ALGORITHM: 'HS256'
};

//Password reset
export const PASSWORD_RESET = {
    TOKEN_EXPIRY: 10 * 60 * 1000,
    TOKEN_LENGTH: 32
};

//Validation patterns
export const VALIDATION = {
    OBJECT_ID_PATTERN: /^[0-9a-fA-F]{24}$/,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 30,
    PASSWORD_MIN_LENGTH: 6
};

// HTTP Status codes (for consistency)
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};

//Error Messages
export const ERROR_MESSAGES = {
    // Authentication
    USER_EXISTS: 'User already exists',
    INVALID_CREDENTIALS: 'Invalid credentials',
    USER_NOT_FOUND: 'User not found',
    TOKEN_MISSING: 'Not authorized, token missing',
    TOKEN_INVALID: 'Invalid or expired token',
    USER_NO_LONGER_EXISTS: 'User no longer exists',

    // Topics
    TOPIC_EXISTS: 'You already have a topic with this name',
    TOPIC_NOT_FOUND: 'Topic not found',
    ALREADY_SUBSCRIBED: 'Already subscribed to this topic',
    NOT_SUBSCRIBED: 'You must be subscribed to perform this action',
    PRIVATE_TOPIC_ACCESS: 'Cannot subscribe to private topic without invitation',
    SUBSCRIPTION_NOT_FOUND: 'Subscription not found',

    // Resources
    RESOURCE_NOT_FOUND: 'Resource not found',
    DESCRIPTION_REQUIRED: 'Description is required',
    INVALID_RESOURCE_TYPE: 'Type must be either LINK or DOCUMENT',
    URL_REQUIRED: 'URL is required for link resources',
    FILE_REQUIRED: 'File is required for document resources',
    INVALID_URL: 'Invalid URL format',
    FILE_NOT_FOUND: 'File not found on server',
    NOT_DOCUMENT_RESOURCE: 'This is not a document resource',
    CREATOR_ONLY: 'You can only modify your own resources',

    // Invites
    INVITE_NOT_FOUND: 'Invite not found',
    ALREADY_INVITED: 'Invite already sent to this user',
    INVITE_NOT_FOR_YOU: 'This invite is not for you',
    INVITE_ALREADY_RESPONDED: 'Invite already responded to',

    // Validation
    INVALID_ID_FORMAT: 'Invalid ID format',
    INVALID_SERIOUSNESS: 'Invalid seriousness level',
    INVALID_FILE_TYPE: 'Invalid file type. Only documents are allowed',
    FILE_TOO_LARGE: 'File too large. Maximum size is 10MB',

    // Generic
    INTERNAL_ERROR: 'Internal server error',
    ACCESS_DENIED: 'Access denied'
}

// Success messages
export const SUCCESS_MESSAGES = {
    USER_REGISTERED: 'User registered successfully',
    LOGIN_SUCCESSFUL: 'Login successful',
    PASSWORD_RESET_EMAIL: 'Password reset link sent to mail',
    PASSWORD_RESET_SUCCESS: 'Password reset successful',
    TOPIC_CREATED: 'Topic created successfully',
    SUBSCRIBED: 'Successfully subscribed to topic',
    SERIOUSNESS_UPDATED: 'Seriousness level updated',
    INVITE_SENT: 'Invite sent successfully',
    INVITE_ACCEPTED: 'Invite accepted. You are now subscribed to the topic',
    INVITE_REJECTED: 'Invite rejected',
    RESOURCE_ADDED: 'Resource added successfully',
    RESOURCE_UPDATED: 'Resource updated successfully',
    RESOURCE_DELETED: 'Resource deleted successfully'
};