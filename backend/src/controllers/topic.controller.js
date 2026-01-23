import Subscription from "../models/Subscription.js";
import Topic from "../models/Topic.js";
import TopicInvite from "../models/TopicInvite.js";


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

        res.status(201).json({ message: "Topic created successfully" }, topic);

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