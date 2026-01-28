import express from 'express'
import {
    createTopic,
    subscribeToTopic,
    updateSeriousness,
    inviteToTopic,
    respondToInvite,
    browseAllPublicTopics,
    getMyTopics,
    getTopicDetails,
    getMyInvites,
    deleteTopic,
    getTrendingTopics
} from '../controllers/topic.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { validateObjectId } from '../middleware/validation.middleware.js';

const router = express.Router();

router.use(protect);

//Topic Management
router.post('/', createTopic);
router.get('/public', browseAllPublicTopics);
router.get('/my-topics', getMyTopics);

/**
 * @route GET /api/topics/trending
 * @desc Get trending topics based on subscription count - Feature 14
 * @access Private
 * @query ?limit=10
 */
router.get('/trending', getTrendingTopics);
router.get('/:topicId', validateObjectId('topicId'), getTopicDetails);

/**
 * @route DELETE /api/topics/:topicId
 * @desc Delete a topic and all its resources - Feature 13
 * @access Private (creator or admin only)
 */
router.delete('/:topicId', validateObjectId('topicId'), deleteTopic);

//Subscription Management
router.post('/:topicId/subscribe',validateObjectId('topicId') ,subscribeToTopic);
router.patch('/:topicId/seriousness', validateObjectId('topicId') ,updateSeriousness);

//Invitation Management
router.post('/:topicId/invite', validateObjectId('topicId'), inviteToTopic);
router.get('/invites/pending', getMyInvites);
router.post('/invites/:inviteId/respond', validateObjectId('inviteId'), respondToInvite);

export default router;

