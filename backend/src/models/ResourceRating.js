import mongoose from "mongoose";

const resourceRatingSchema = new mongoose.Schema({
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
        required: true
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    score: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }
});

resourceRatingSchema.index({ resource: 1, user: 1 }, { unique: true });
export default mongoose.model('ResourceRating', resourceRatingSchema);
