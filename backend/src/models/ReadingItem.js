import mongoose from "mongoose";

const readingItemSchema = new mongoose.Schema({
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    }
});

readingItemSchema.index({resource: 1, user: 1}, {unique: true});

export default mongoose.model('ReadingItem', readingItemSchema);