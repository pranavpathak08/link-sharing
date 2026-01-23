import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seriousness: {
        type: String,
        enum: ['SERIOUS', 'VERY_SERIOUS', 'CASUAL'],
        default: 'SERIOUS'
    }
}, {timestamps: {createdAt: true, updatedAt: false}})

subscriptionSchema.index({topic: 1, user: 1}, {unique: true});

export default mongoose.model('Subscription', subscriptionSchema);