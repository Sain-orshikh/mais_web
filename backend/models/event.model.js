import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        default: "",
    },
    date:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        default: null,
    },
    category:{
        type: String,
        enum: ['academic', 'holiday', 'sports', 'cultural', 'meeting', 'other'],
        default: 'other',
    },
    location:{
        type: String,
        default: "",
    },
    isAllDay:{
        type: Boolean,
        default: false,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
},{timestamps: true});

const Event = mongoose.model("Event", eventSchema);

export default Event;
