import { Resource, LinkResource, DocumentResource } from "../models/Resource.js";
import Subscription from "../models/Subscription.js";
import fs from 'fs';
import path from 'path';

//Adding resource to a subscribed topic
export const addResource = async (req, res) => {
    try {
        const { topicId } = req.params;
        const { description, type, url } = req.body;
        const userId = req.user._id;

        //Checking if user is subscribed to the topic
        const subscription = await Subscription.findOne({
            topic: topicId,
            user: userId
        });

        if (!subscription) {
            return res.status(403).json({ message: "You must be subscribed to add resources" });
        }

        let resource;

        if (type === "LINK") {
            if (!url) {
                return res.status(400).json({ message: "URL is required for link resources" });
            }

            resource = await LinkResource.create({
                description,
                url,
                createdBy: userId,
                topic: topicId
            });
        }

        else if (type === "DOCUMENT") {
            if (!req.file) {
                return res.status(400).json({ message: "File is required for document resources" });
            }

            resource = await DocumentResource.create({
                description,
                filePath: req.file.path,
                createdBy: userId,
                topic: topicId
            });
        } else {
            return res.status(400).json({ message: "Invalid resource type. Must be a link or document" });
        }

        res.status(201).json({
            message: "Resource added successfully",
            resource
        });

        console.log(`${ req.user.filename } added a ${ type } resource to topic: ${ topicId }`);
    } catch (error) {
        console.error("Add resource error: ", error);
        res.status(500).json({ message: "Failed to add resource", error: error.message });
    }
}

//Getting all resources for a topic
export const getTopicResources = async (req, res) => {
    try {
        const { topicId } = req.params;
        const userId = req.user._id;
        const { page = 1, limit = 20 } = req.query;

        //Checking if user has access to this topic
        const subscription = await Subscription.findOne({
            topic: topicId,
            user: userId
        });

        if (!subscription) {
            return res.status(403).json({ message: "You must be subscribed to view resources" });
        }

        const resources = await Resource.find({ topic: topicId })
            .populate('createdBy', 'firstName lastName username')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
        
        const count = await Resource.countDocuments({ topic: topicId });

        res.json({
            resources,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (error) {
        console.error("Get resource error: ", error);
        res.status(500).json({ message: "Failed to fetch resource", error: error.message });
    }
}

//Getting a specific resource
export const getResource = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const userId = req.user._id;

        const resource = await Resource.findById(resourceId)
            .populate('createdBy', 'firstName lastName username')
            .populate('topic', 'name visibility');
        
        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        //Checking if user has access
        const subscription = await Subscription.findOne({
            topic: resource.topic._id,
            user: userId
        });

        if (!subscription) {
            return res.status(403).json({ message: "You must be subscribed to view this resource" });
        }

        res.json({ resource });
    } catch (error) {
        console.error("Get resource error: ", error);
        res.status(500).json({ message: "Failed to fetch resource", error: error.message });
    }
}

//Downloading document resource
export const downloadDocument = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const userId = req.user._id;

        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        if (resource.type !== "DOCUMENT") {
            return res.status(400).json({ message: "This is not a document resource" });
        }

        //Checking if user has access
        const subscription = await Subscription.findOne({
            topic: resource.topic,
            user: userId
        });

        if (!subscription) {
            return res.status(403).json({ message: "You must be subscribed to download this resource" });
        }

        //Checking if file exists
        if (!fs.existsSync(resource.filePath)) {
            return res.status(404).json({ message: "File not found on server" });
        }

        //Sending File
        const fileName = path.basename(resource.filePath);
        res.download(resource.filePath, fileName);

    } catch (error) {
        console.error("Download document error: ", error);
        res.status(500).json({ message: "Failed to download document", error: error.message });
    }
}

//Updating any resource
export const updateResource = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const { description, url } = req.body;
        const userId = req.user._id;

        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        //Only creator can update
        if (resource.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You can only update your own resources" });
        }

        if (description) {
            resource.description = description;
        }

        if (url && resource.type === "LINK") {
            resource.url = url;
        }

        await resource.save();

        res.json({
            message: "Resource updated successfully",
            resource
        });
    } catch (error) {
        console.error("Update resource error: ", error);
        res.status(500).json({ message: "Failed to update resource", error: error.message });
    }
}

//Deletign any resource
export const deleteResource = async (req, res) => {
    try {
        const { resourceId } = req.params;
        const userId = req.user._id;

        const resource = await Resource.findById(resourceId);

        if (!resource) {
            return res.status(404).json({ message: "Resource not found" });
        }

        //Only creator can delete
        if (resource.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You can only delete your own resources" });
        }

        //Deleting the file if its a document resource
        if (resource.type === "DOCUMENT" && fs.existsSync(resource.filePath)) {
            fs.unlinkSync(resource.filePath);
        }

        await Resource.findByIdAndDelete(resourceId);

        
    } catch (error) {
        
    }
}