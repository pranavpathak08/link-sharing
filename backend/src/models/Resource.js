import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    }
}, {timestamps: true, discriminatorKey: 'type'})

export const Resource = mongoose.model('Resource', resourceSchema);

//Link Resource
export const LinkResource = Resource.discriminator(
    'LINK',
    new mongoose.Schema({
        url: {
            type: String,
            required: true
        }
    })
);

//Document Resource
export const DocumentResource = Resource.discriminator(
    'DOCUMENT',
    new mongoose.Schema({
        filePath: {
            type: String,
            required: true
        }
    })
);