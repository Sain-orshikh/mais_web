import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        default: "",
    },
    content:{
        type: String,
        required: true,
        default: "",
    },
    image:{
        type: String,
        required: true,
        default: "",
    },
    category:{
        type: String,
        required: false,
        default: "",
    },
    imageurl:{
        type: String,
        default: "",
    },
    author:{
        type: String,
        default: "Anonymous",
    },
    likes:{
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['draft', 'pending', 'published'],
        default: 'draft',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    approvedAt: {
        type: Date,
    },
},{timestamps: true});

const News = mongoose.model("News", newsSchema);

export default News;
