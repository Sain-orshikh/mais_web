import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    permission:{
        type: String,
        enum: ['super_admin', 'admin', 'editor', 'viewer'],
        default: 'admin',
    },
},{timestamps: true});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
