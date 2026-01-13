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
    permission:{
        type: String,
        enum: ['super_admin', 'admin', 'editor'],
        default: 'admin',
    },
    lastLogin:{
        type: Date,
        default: null,
    },
},{timestamps: true});

// Drop the email index if it exists
adminSchema.index({ email: 1 }, { unique: false });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
