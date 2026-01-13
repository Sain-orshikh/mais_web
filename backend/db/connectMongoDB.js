import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }   catch(error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectMongoDB;
