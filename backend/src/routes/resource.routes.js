import express from 'express'
import {
    addResource,
    getTopicResources,
    getResource,
    downloadDocument,
    updateResource,
    deleteResource
} from '../controllers/resource.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import upload from '../config/multer.config.js'
import { handleMulterError } from '../middleware/upload.middleware.js'
import {
    validateResourceCreation,
    validateResourceUpdate,
    validateObjectId
} from '../middleware/validation.middleware.js'


const router = express.Router();
router.use(protect);


/**
 * @route POST /api/topics/:topicId/resources
 * @desc Add a new resource (link or document) to a topic
 * @access Private (requires subscription to topic)
 * @body {description, type, url?}
 * @file file (optional for DOCUMENT type)
 */
router.post(
    '/topics/:topicId/resources',
    validateObjectId('topicId'),
    upload.single('file'),
    handleMulterError,
    validateResourceCreation,
    addResource
)

/**
 * @route GET /api/topics/:topicId/resources
 * @desc Get all resources for a specific topic
 * @access Private (requires subscription to topic)
 * @query ?page=1&limit=20
 */
router.get(
    '/topics/:topicId/resources',
    validateObjectId('topicId'),
    getTopicResources
);

/**
 * @route GET /api/resources/:resourceId
 * @desc Get a specific resource by ID
 * @access Private (requires subscription to resource's topic)
 */
router.get(
    '/resources/:resourceId',
    validateObjectId('resourceId'),
    getResource
);

/**
 * @route GET /api/resources/:resourceId/download
 * @desc Download a document resource
 * @access Private (requires subscription to a resource's topic)
 */
router.get(
    '/resources/:resourceId/download',
    validateObjectId('resourceId'),
    downloadDocument
);

/**
 * @route PATCH /api/resources/:resourceId
 * @desc Update a resource (only by creator)
 * @access Private (creator only)
 * @body {description?, url?}
 */
router.patch(
    '/resources/:resourceId',
    validateObjectId('resourceId'),
    validateResourceUpdate,
    updateResource
)

/**
 * @route DELETE /api/resources/:resourceId
 * @desc Delete a resource (only by creator)
 * @access Private (creator only)
 */
router.delete(
    '/resources/:resourceId',
    validateObjectId('resourceId'),
    deleteResource
);

export default router;