import mongoose from "mongoose";

const topicInviteSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },

    inviter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    invitee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    }
}, { timestamps: true });

topicInviteSchema.index({ topic: 1, invitee: 1 }, { unique: true });

export default mongoose.model('TopicInvite', topicInviteSchema);