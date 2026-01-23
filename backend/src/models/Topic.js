import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    visibility: {
        type: String,
        enum: ['PUBLIC, PRIVATE'],
        default: 'PUBLIC'
    }
}, {timestamps: true});

topicSchema.index({name: 1, createdBy: 1}, {unique: true});

export default mongoose.model('Topic', topicSchema);