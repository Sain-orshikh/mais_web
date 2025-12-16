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
        required: true,
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
},{timestamps: true});

const News = mongoose.model("News", newsSchema);

export default News;
