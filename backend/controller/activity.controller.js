import Activity from "../models/activity.model.js";

// Log an activity
export const logActivity = async (action, actorId, targetType, targetId, description, metadata = {}) => {
    try {
        const activity = new Activity({
            action,
            actor: actorId,
            targetType,
            targetId,
            description,
            metadata
        });
        await activity.save();
    } catch (error) {
        console.error("Error logging activity:", error.message);
        // Don't throw error - logging failure shouldn't break the main operation
    }
};

// Get all activities
export const getAllActivities = async (req, res) => {
    try {
        const { limit = 20, targetType } = req.query;
        
        let query = {};
        if (targetType) {
            query.targetType = targetType;
        }
        
        const activities = await Activity.find(query)
            .populate('actor', 'username')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));
        
        res.status(200).json(activities);
    } catch (error) {
        console.log("Error in getAllActivities controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get recent activities for dashboard
export const getRecentActivities = async (req, res) => {
    try {
        const activities = await Activity.find()
            .populate('actor', 'username')
            .sort({ createdAt: -1 })
            .limit(10);
        
        res.status(200).json(activities);
    } catch (error) {
        console.log("Error in getRecentActivities controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
