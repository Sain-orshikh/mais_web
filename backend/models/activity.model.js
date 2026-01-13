import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        enum: [
            'news_created',
            'news_updated', 
            'news_deleted',
            'news_submitted',
            'news_approved',
            'news_rejected',
            'event_created',
            'event_updated',
            'event_deleted',
            'admin_created',
            'admin_updated',
            'admin_deleted',
            'admin_login'
        ]
    },
    actor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    targetType: {
        type: String,
        enum: ['news', 'event', 'admin', 'system'],
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'targetType'
    },
    description: {
        type: String,
        required: true
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});

// Index for faster queries
activitySchema.index({ createdAt: -1 });
activitySchema.index({ actor: 1 });
activitySchema.index({ targetType: 1, targetId: 1 });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
