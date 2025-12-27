import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['page_view', 'news_view', 'event_view'],
        required: true,
    },
    page: {
        type: String,
        required: true,
    },
    newsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
        default: null,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        default: null,
    },
    referrer: {
        type: String,
        default: "",
    },
    userAgent: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
