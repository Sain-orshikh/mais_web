import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const admin = await Admin.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, admin?.password || "")

        if(!admin || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid credentials"})
        }

        // Update last login timestamp
        admin.lastLogin = new Date();
        await admin.save();

        generateTokenAndSetCookie(admin._id, res);

        res.status(200).json({
            _id: admin._id,
            username: admin.username,
            permission: admin.permission,
            lastLogin: admin.lastLogin,
        });
    }   
    catch(error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    }
    catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).select("-password");
        res.status(200).json(admin);
    }
    catch(error){
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
