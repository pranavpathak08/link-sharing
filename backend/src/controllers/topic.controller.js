import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/index.js";
import ReadingItem from "../models/ReadingItem.js";
import { Resource } from "../models/Resource.js";
import ResourceRating from "../models/ResourceRating.js";
import Subscription from "../models/Subscription.js";
import Topic from "../models/Topic.js";
import TopicInvite from "../models/TopicInvite.js";
import fs from 'fs';


//Creating a new topic
export const createTopic = async (req, res) => {
    try {
        const { name, visibility } = req.body;
        const userId = req.user._id;

        //Checking if user already has a topic with this name
        const existingTopic = await Topic.findOne({ name, createdBy: userId });
        if (existingTopic) {
            return res.status(400).json({ message: "You already have a topic with this name" });
        }

        const topic = await Topic.create({
            name,
            createdBy: userId,
            visibility: visibility || 'PUBLIC'
        });

        //Automatically subscribing the creator
        await Subscription.create({
            topic: topic._id,
            user: userId,
            seriousness: "VERY_SERIOUS"
        });

        res.status(201).json({ message: "Topic created successfully" , topic});

        //Log statement
        console.log(`${ req.user.firstName } ${ req.user.lastName } created topic: ${ name }`); 

    } catch (error) {
        console.error("Create topic error", error);
        res.status(500).json({ message: "Failed to create topic", error: error.message });
        
    }
}

//Subscribing to an existing public topic
export const subscribeToTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { seriousness } = req.body;
        const userId = req.user._id;

        //Checking if topic exists and it is public
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        if (topic.visibility === "PRIVATE") {
            return res.status(403).json({ message: "Cannot subscribe to private topic without invitation" });
        }

        //Checking if user has already subscribed to the topic
        const existingSubscription = await Subscription.findOne({ topic: topicId, user: userId });
        if (existingSubscription) {
            return res.status(400).json({ message: "Already subscribed to this topic" });
        }

        //Creating Subscription
        const subscription = await Subscription.create({
            topic: topicId,
            user: userId,
            seriousness: seriousness || "SERIOUS"
        });

        res.status(201).json({
            message: "Successfully subscribed to the topic",
            subscription
        });

        //Log Statement
        console.log(`${ req.user.firstName } ${ req.user.lastName } subscribed to topic: ${ topic.name } `);

    } catch (error) {
        console.error("Subscribe error: ", error);
        res.status(500).json({ message: "Failed to subscribe", error: error.message });
    }
};

//Updating seriousness level for a topic
export const updateSeriousness = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { seriousness } = req.body;
        const userId = req.user._id;

        if (!["SERIOUS", "VERY_SERIOUS", "CASUAL"].includes(seriousness)) {
            return res.status(400).json({ message: "Invalid seriousness level" });
        }

        const subscription = await Subscription.findOneAndUpdate(
            { topic: topicId, user: userId },
            { seriousness },
            { new: true }
        );

        if (!subscription) {
            res.status(404).json({ message: "Subscription not found" });
        }

        res.json({ message: "Seriousness level updated", subscription });

    } catch (error) {
        console.error("Updated seriousness error: ", error);
        res.status(500).json({ message: "Failed to update seriousness", error: error.message });
    }
};

// Sending Invite to a topic - pub and pvt
export const inviteToTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { inviteeId } = req.body;
        const inviterId = req.user._id;

        //Check if inviter is subscribed to the topic 
        const inviterSubscription = await Subscription.findOne({
            topic: topicId,
            user: inviterId
        });

        if (!inviterSubscription) {
            return res.status(403).json({ message: "You must be subscribed to invite others" });
        }

        //Checking if topic exists
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        //Checking if invitee is already subscribed
        const inviteeAlreadySubscribed = await Subscription.findOne({
            topic: topicId,
            user: inviteeId
        });

        if (inviteeAlreadySubscribed) {
            return res.status(400).json({ message: "User is already subscribed to this topic" });
        }

        //Checking for existing pending invite
        const existingPendingInvite = await TopicInvite.findOne({
            topic: topicId,
            invitee: inviteeId,
            status: "PENDING"
        });

        if (existingPendingInvite) {
            return res.status(400).json({ message: "Invite already sent to this user" });
        }

        //Creating Invite
        const invite = await TopicInvite.create({
            topic: topicId,
            inviter: inviterId,
            invitee: inviteeId
        });

        res.status(201).json({
            message: "Invite sent successfully",
            invite
        });

        //Log Statement
        console.log(`${ req.user.firstName } invited user to topic: ${ topic.name }`);
    } catch (error) {
        console.error("Invite Error", error);
        res.status(500).json({ message: "Failed to send invite", error: error.message });
    }
}

// Accept or Reject Invite
export const respondToInvite = async (req, res) => {
    try {
        const { inviteId } = req.params;
        const { accept } = req.body; //true or false
        const userId = req.user._id;

        const invite = await TopicInvite.findById(inviteId)

        if (!invite) {
            return res.status(404).json({ message: "Invite not found" });
        }

        if (invite.invitee.toString() !== userId.toString()) {
            return res.status(403).json({ message: "This invite is not for you" });
        }

        if (invite.status !== "PENDING") {
            return res.status(400).json({ message: "Invite already responded to" });
        }

        if (accept) {
            //Accepting invite and creating subscription
            await Subscription.create({
                topic: invite.topic,
                user: userId,
                seriousness: "SERIOUS"
            });

            invite.status = "ACCEPTED";
            await invite.save();

            res.json({
                message: "Invite accepted. You are now subscribed to the topic",
                invite
            })
        } else {
            //Rejecting Invite
            invite.status = "REJECTED";
            await invite.save();

            res.json({
                message: "Invite rejected",
                invite
            })
        }
    } catch (error) {
        console.error("Respond to invite error: ", error);
        res.status(500).json({ message: "Failed to respond to invite", error: error.message });
    }
}

// Browsing all public topics - FIXED VERSION
export const browseAllPublicTopics = async (req, res) => {
    try {
        const { page = 1, limit = 20, search } = req.query;
        const query = { visibility: "PUBLIC" }
        
        //Adding search functionality
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const topics = await Topic.find(query)
            .populate('createdBy', 'firstName lastName username')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
        
        const count = await Topic.countDocuments(query);

        const topicsWithStats = await Promise.all( // FIXED: was Prmomise.all
            topics.map(async (topic) => {
                const subscriberCount = await Subscription.countDocuments({ topic: topic._id });
                return {
                    ...topic.toObject(),
                    subscriberCount
                };
            })
        );

        res.json({
            topics: topicsWithStats,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        })
    } catch (error) {
        console.error("Browse topics error: ", error);
        res.status(500).json({ message: "Failed to fetch topics", error: error.message });
    }
}

//Get user's subscribed topics
export const getMyTopics = async (req, res) => {
    try {
        const userId = req.user._id;

        const subscriptions = await Subscription.find({ user: userId })
            .populate({
                path: 'topic',
                populate: {
                    path: 'createdBy',
                    select: 'firstName lastName username'
                }
            })
            .sort({ createdAt: -1 });
        
        res.json({ subscriptions });
    } catch (error) {
        console.error("Get my topics error: ", error);
        res.status(500).json({ message: "Failed to fetch subscriptions", error: error.message });
    }
}

//Get Topic details
export const getTopicDetails = async (req, res) => {
    try {
        const { topicId } = req.params;
        const userId = req.user._id;

        const topic = await Topic.findById(topicId)
            .populate('createdBy', 'firstName lastName username');
        
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        if (topic.visibility === "PRIVATE") {
            const subscription = await Subscription.findOne({
                topic: topicId,
                user: userId
            });

            if (!subscription) {
                return res.status(403).json({ message: "Access denied to private topic" });
            }
        }

        //User's subscription status
        const userSubscription = await Subscription.findOne({
            topic: topicId,
            user: userId
        });

        const subscriberCount = await Subscription.countDocuments({ topic: topicId });

        res.json({
            topic: {
                ...topic.toObject(),
                subscriberCount
            },
            isSubscribed: !!userSubscription,
            subscription: userSubscription
        });
    } catch (error) {
        console.error("Get topic details error: ", error);
        res.status(500).json({ message: "Failed to fetch topic details", error: error.message });
    }
}

//Getting pending invites for current user
export const getMyInvites = async (req, res) => {
    try {
        const userId = req.user._id;

        const invites = await TopicInvite.find({
            invitee: userId,
            status: "PENDING"
        })
            .populate("topic", "name visibility")
            .populate("inviter", "firstName lastName username")
            .sort({ createdAt: -1 });
        
        res.json({ invites });
    }       
    catch (error) {
        console.error("Get invites error: ", error);
        res.status(500).json({ message: "Failed to fetch invites", error: error.message });
    }
}

export const deleteTopic = async (req, res) => {
    try {
        const { topicId } = req.params;
        const userId = req.user._id;
        const isAdmin = req.user.isAdmin;

        const topic = await Topic.findById(topicId);

        if (!topic) {
            return res.status(404).json({ message: ERROR_MESSAGES.TOPIC_NOT_FOUND });
        }

        //Check if user is creator or admin
        const isCreator = topic.createdBy.toString() === userId.toString();
        if (!isCreator && !isAdmin) {
            return res.status(403).json({
                message: "Only the topic creator or admin can delete this topic"
            })
        }

        //Getting all resources associated with this topic
        const resources = await Resource.find({ topic: topicId });

        //Deleting all associated files for document resources
        for (const resource of resources) {
            if (resource.type === "DOCUMENT" && fs.existsSync(resource.filePath)) {
                fs.unlinkSync(resource.filePath);
            }
        }

        const resourceIds = resources.map(r => r._id);

        //Deleting all reading items for these resources
        await ReadingItem.deleteMany({ resource: { $in: resourceIds } });

        //Deleting all ratings for these resources
        await ResourceRating.deleteMany({ resource: { $in: resourceIds } });

        //Deleting all resources
        await Resource.deleteMany({ topic: topicId });

        //Delete all subscriptions
        await Subscription.deleteMany({ topic: topicId });

        //Delete all invites
        await TopicInvite.deleteMany({ topic: topicId });

        //Deleting the topic 
        await Topic.findByIdAndDelete(topicId);

        res.json({
            message: "Topic and all associated data deleted successfully",
            deletedResources: resources.length
        });

        console.log(`Topic ${ topic.name } deleted by ${ isAdmin ? 'admin' : 'creator' } - ${ resources.length } resources removed`);

    } catch (error) {
        console.error("Delete topic error: ", error);
        res.status(500).json({ message: "Failed to delete topic", error: error.message });
    }
};

export const getTrendingTopics = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const trendingTopics = await Subscription.aggregate([
            {
                $group: {
                    _id: '$topic',
                    subscriberCount: { $sum: 1 }
                }
            },
            {
                $sort: { subscriberCount: -1 }
            },
            {
                $limit: parseInt(limit)
            },
            {
                $lookup: {
                    from: 'topics',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'topicDetails'
                }
            },
            {
                $unwind: '$topicDetails'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'topicDetails.createdBy',
                    foreignField: '_id',
                    as: 'creatorDetails'
                }
            },
            {
                $unwind: '$creatorDetails'
            },
            {
                $match: {
                    'topicDetails.visibility': 'PUBLIC'
                }
            },
            {
                $project: {
                    _id: '$topicDetails._id',
                    name: '$topicDetails.name',
                    visibility: '$topicDetails.visibility',
                    createdAt: '$topicDetails.createdAt',
                    createdBy: {
                        _id: '$creatorDetails._id',
                        firstName: '$creatorDetails.firstName',
                        lastName: '$creatorDetails.lastName',
                        username: '$creatorDetails.username'
                    },
                    subscriberCount: 1
                }
            }
        ]);

        res.json({
            message: "Trending topics based on subscriber count",
            topics: trendingTopics
        });

    } catch (error) {
        console.error("Get trending topics error: ", error);
        res.status(500).json({ message: "Failed to fetch trending topics", error: error.message });
    }
}