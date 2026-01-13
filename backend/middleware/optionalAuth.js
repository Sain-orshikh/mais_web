import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";

// Optional authentication middleware - doesn't block request if no token
export const optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        // If no token, just continue without setting req.admin
        if (!token) {
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded) {
            const admin = await Admin.findById(decoded.adminId).select("-password");
            if (admin) {
                req.admin = admin;
            }
        }
        
        next();
    } catch (error) {
        // If there's an error (invalid token, etc.), just continue without auth
        console.log("Optional auth error (non-blocking):", error.message);
        next();
    }
};
