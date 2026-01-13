import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Admin from "../models/admin.model.js";
import connectMongoDB from "../db/connectMongoDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Get credentials from environment variables
        const adminUsername = process.env.SUPER_ADMIN_USERNAME || "admin";
        const adminPassword = process.env.SUPER_ADMIN_PASSWORD || "admin123";

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: adminUsername });
        if (existingAdmin) {
            console.log("Admin already exists!");
            process.exit(0);
        }

        // Create new admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const newAdmin = new Admin({
            username: adminUsername,
            password: hashedPassword,
            permission: "super_admin"
        });

        await newAdmin.save();
        console.log("✅ Admin created successfully!");
        console.log(`Username: ${adminUsername}`);
        console.log(`Password: ${adminPassword}`);
        console.log("⚠️  Please change the password after first login!");
        
        process.exit(0);
    } catch (error) {
        console.error("Error creating admin:", error.message);
        process.exit(1);
    }
};

createAdmin();
