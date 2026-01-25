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