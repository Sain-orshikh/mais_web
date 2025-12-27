import Analytics from "../models/analytics.model.js";
import News from "../models/news.model.js";
import Event from "../models/event.model.js";

// Track a page view or event
export const trackView = async (req, res) => {
    try {
        const { type, page, newsId, eventId } = req.body;
        const referrer = req.get('Referrer') || req.get('Referer') || '';
        const userAgent = req.get('User-Agent') || '';

        const analyticsEntry = new Analytics({
            type,
            page,
            newsId: newsId || null,
            eventId: eventId || null,
            referrer,
            userAgent,
        });

        await analyticsEntry.save();
        
        res.status(201).json({ message: "View tracked successfully" });
    } catch (error) {
        console.log("Error in trackView controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        // Total counts
        const totalNewsViews = await Analytics.countDocuments({ type: 'news_view' });
        const totalPageViews = await Analytics.countDocuments({ type: 'page_view' });
        const totalNewsArticles = await News.countDocuments();
        const totalEvents = await Event.countDocuments();

        // Views in last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const recentViews = await Analytics.countDocuments({
            createdAt: { $gte: thirtyDaysAgo }
        });

        res.status(200).json({
            totalNewsViews,
            totalPageViews,
            totalNewsArticles,
            totalEvents,
            recentViews,
        });
    } catch (error) {
        console.log("Error in getDashboardStats controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get top viewed news articles
export const getTopNews = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const topNews = await Analytics.aggregate([
            { $match: { type: 'news_view', newsId: { $ne: null } } },
            { 
                $group: { 
                    _id: '$newsId', 
                    views: { $sum: 1 } 
                } 
            },
            { $sort: { views: -1 } },
            { $limit: limit },
            {
                $lookup: {
                    from: 'news',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'newsData'
                }
            },
            { $unwind: '$newsData' },
            {
                $project: {
                    _id: 1,
                    views: 1,
                    title: '$newsData.title',
                    date: '$newsData.date',
                    imageUrl: '$newsData.imageUrl',
                }
            }
        ]);

        res.status(200).json(topNews);
    } catch (error) {
        console.log("Error in getTopNews controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get views over time (last 30 days)
export const getViewsOverTime = async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const viewsData = await Analytics.aggregate([
            { 
                $match: { 
                    createdAt: { $gte: startDate }
                } 
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.date': 1 } },
            {
                $project: {
                    _id: 0,
                    date: '$_id.date',
                    count: 1
                }
            }
        ]);

        res.status(200).json(viewsData);
    } catch (error) {
        console.log("Error in getViewsOverTime controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get recent activity log
export const getRecentActivity = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;

        const recentActivity = await Analytics.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate('newsId', 'title')
            .populate('eventId', 'title')
            .select('type page createdAt newsId eventId');

        res.status(200).json(recentActivity);
    } catch (error) {
        console.log("Error in getRecentActivity controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get page view breakdown
export const getPageBreakdown = async (req, res) => {
    try {
        const pageBreakdown = await Analytics.aggregate([
            { $match: { type: 'page_view' } },
            { 
                $group: { 
                    _id: '$page', 
                    views: { $sum: 1 } 
                } 
            },
            { $sort: { views: -1 } },
            { $limit: 10 },
            {
                $project: {
                    _id: 0,
                    page: '$_id',
                    views: 1
                }
            }
        ]);

        res.status(200).json(pageBreakdown);
    } catch (error) {
        console.log("Error in getPageBreakdown controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
