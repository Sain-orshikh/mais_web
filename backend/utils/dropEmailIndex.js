import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectMongoDB from "../db/connectMongoDB.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const dropEmailIndex = async () => {
    try {
        await connectMongoDB();
        
        const db = mongoose.connection.db;
        const collection = db.collection('admins');
        
        // Try to drop the email index
        try {
            await collection.dropIndex('email_1');
            console.log("✅ Email index dropped successfully!");
        } catch (error) {
            if (error.code === 27) {
                console.log("ℹ️  Email index doesn't exist (already dropped or never created)");
            } else {
                throw error;
            }
        }
        
        console.log("✅ Database migration completed!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error dropping email index:", error.message);
        process.exit(1);
    }
};

dropEmailIndex();
