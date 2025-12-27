import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

export const getAllAdmins = async (req, res) => {
    try {
        // Only super_admin can view all admins
        if (req.admin.permission !== 'super_admin') {
            return res.status(403).json({ error: "Unauthorized: Only super admins can view all accounts" });
        }

        const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json(admins);
    } catch (error) {
        console.log("Error in getAllAdmins controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const createAdmin = async (req, res) => {
    try {
        // Only super_admin can create admins
        if (req.admin.permission !== 'super_admin') {
            return res.status(403).json({ error: "Unauthorized: Only super admins can create accounts" });
        }

        const { username, password, permission } = req.body;

        // Validation
        if (!username || !password || !permission) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ error: "Username already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Validate permission
        const validPermissions = ['super_admin', 'admin', 'editor'];
        if (!validPermissions.includes(permission)) {
            return res.status(400).json({ error: "Invalid permission level" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            username,
            password: hashedPassword,
            permission
        });

        await newAdmin.save();

        res.status(201).json({
            _id: newAdmin._id,
            username: newAdmin.username,
            permission: newAdmin.permission,
        });
    } catch (error) {
        console.log("Error in createAdmin controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        // Only super_admin can delete admins
        if (req.admin.permission !== 'super_admin') {
            return res.status(403).json({ error: "Unauthorized: Only super admins can delete accounts" });
        }

        const { id } = req.params;

        // Prevent deleting yourself
        if (id === req.admin._id.toString()) {
            return res.status(400).json({ error: "You cannot delete your own account" });
        }

        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        await Admin.findByIdAndDelete(id);
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        console.log("Error in deleteAdmin controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
