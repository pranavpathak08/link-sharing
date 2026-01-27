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
    getMyInvites
} from '../controllers/topic.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router();

router.use(protect);

//Topic Management
router.post('/', createTopic);
router.get('/public', browseAllPublicTopics);
router.get('/my-topics', getMyTopics);
router.get('/:topicId', getTopicDetails);

//Subscription Management
router.post('/:topicId/subscribe', subscribeToTopic);
router.patch('/:topicId/seriousness', updateSeriousness);

//Invitation Management
router.post('/:topicId/invite', inviteToTopic);
router.get('/invites/pending', getMyInvites);
router.post('/invites/:inviteId/respond', respondToInvite);

export default router;

