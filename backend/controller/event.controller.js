import Event from "../models/event.model.js";

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        // Optional query params for filtering
        const { category, startDate, endDate } = req.query;
        
        let query = {};
        
        if (category && category !== 'all') {
            query.category = category;
        }
        
        if (startDate || endDate) {
            query.date = {};
            if (startDate) {
                query.date.$gte = new Date(startDate);
            }
            if (endDate) {
                query.date.$lte = new Date(endDate);
            }
        }
        
        const events = await Event.find(query)
            .populate("createdBy", "username")
            .sort({ date: 1 });
        
        res.status(200).json(events);
    } catch (error) {
        console.log("Error in getAllEvents controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get single event
export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate("createdBy", "username");
        
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        
        res.status(200).json(event);
    } catch (error) {
        console.log("Error in getEvent controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create event
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, endDate, category, location, isAllDay } = req.body;
        
        // Validation
        if (!title || !date) {
            return res.status(400).json({ error: "Title and date are required" });
        }
        
        // Check if user has permission to create events (admin or super_admin)
        if (!['admin', 'super_admin'].includes(req.admin.permission)) {
            return res.status(403).json({ error: "You don't have permission to create events" });
        }
        
        const newEvent = new Event({
            title,
            description,
            date,
            endDate,
            category: category || 'other',
            location,
            isAllDay: isAllDay || false,
            createdBy: req.admin._id,
        });
        
        await newEvent.save();
        
        // Populate createdBy before sending response
        await newEvent.populate("createdBy", "username");
        
        res.status(201).json(newEvent);
    } catch (error) {
        console.log("Error in createEvent controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update event
export const updateEvent = async (req, res) => {
    try {
        const { title, description, date, endDate, category, location, isAllDay } = req.body;
        
        // Check if user has permission to update events (admin or super_admin)
        if (!['admin', 'super_admin'].includes(req.admin.permission)) {
            return res.status(403).json({ error: "You don't have permission to update events" });
        }
        
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        
        // Update fields if provided
        if (title) event.title = title;
        if (description !== undefined) event.description = description;
        if (date) event.date = date;
        if (endDate !== undefined) event.endDate = endDate;
        if (category) event.category = category;
        if (location !== undefined) event.location = location;
        if (isAllDay !== undefined) event.isAllDay = isAllDay;
        
        await event.save();
        await event.populate("createdBy", "username");
        
        res.status(200).json(event);
    } catch (error) {
        console.log("Error in updateEvent controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete event
export const deleteEvent = async (req, res) => {
    try {
        // Check if user has permission to delete events (admin or super_admin)
        if (!['admin', 'super_admin'].includes(req.admin.permission)) {
            return res.status(403).json({ error: "You don't have permission to delete events" });
        }
        
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        
        await Event.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log("Error in deleteEvent controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
