import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import News from "../models/news.model.js";
import Analytics from "../models/analytics.model.js";
import { logActivity } from "./activity.controller.js";

export const fetchNews = async (req,res) => {
	const newsId = req.params.id;
	try {
		const news = await News.findById(newsId);
		if(!news) return res.status(404).json({error: "News not found"});
		
		// Track news view
		try {
			await Analytics.create({
				type: 'news_view',
				page: `/news/${newsId}`,
				newsId: newsId,
				referrer: req.get('Referrer') || req.get('Referer') || '',
				userAgent: req.get('User-Agent') || '',
			});
		} catch (analyticsError) {
			console.log("Analytics tracking error (non-blocking):", analyticsError.message);
		}
		
		res.status(200).json(news);
	} catch (error) {
		console.log("error in fetching news:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const fetchAllNews = async (req, res) => {
	try {
		// Public endpoint - only return published news
		const { status } = req.query;
		
		// If authenticated admin, allow filtering by status
		let query = {};
		if (req.admin) {
			// Admin can see all news or filter by status
			if (status) query.status = status;
		} else {
			// Public users only see published news
			query.status = 'published';
		}
		
		const news = await News.find(query)
			.populate('createdBy', 'username')
			.populate('approvedBy', 'username')
			.sort({createdAt: -1});

		res.status(200).json({ data: news });
	} catch (error) {
		console.log("error in fetching news:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createNews = async (req, res) => {
	try {
	  const { title, content, category, imageUrl: directUrl, author, status } = req.body;
	  console.log("Create news - received status:", status);
	  console.log("Create news - all req.body:", req.body);
	  console.log("directUrl:", req.file);
	  console.log("file:", req.file);
	  if (!req.file && !directUrl) {
		return res.status(400).json({
		  success: false,
		  error: "Please provide an image",
		});
	  }
	  if (!title || !content || (!req.file && !directUrl)) {
		return res.status(400).json({
		  success: false,
		  error: "Please provide all required fields and an image",
		});
	  }
  
	  let finalImageUrl;
  
	  if (req.file) {
		// Uploaded file via multer (use streamifier + cloudinary)
		const streamUpload = (buffer) =>
		  new Promise((resolve, reject) => {
			const stream = cloudinary.uploader.upload_stream(
			  { folder: "news-images" },
			  (error, result) => {
				if (result) resolve(result);
				else reject(error);
			  }
			);
			streamifier.createReadStream(buffer).pipe(stream);
		  });
  
		const uploadedImage = await streamUpload(req.file.buffer);
		finalImageUrl = uploadedImage.secure_url;
	  } else if (directUrl) {
		// User provided a URL string
		// Optionally re-upload to Cloudinary for CDN benefits
		const uploadedImage = await cloudinary.uploader.upload(directUrl, {
		  folder: "news-images",
		});
		finalImageUrl = uploadedImage.secure_url;
	  }
  
	  const newNews = new News({
		title,
		content,
		category,
		image: finalImageUrl,
		author: author || "Anonymous",
		status: status || 'draft',
		createdBy: req.admin?._id,
	  });
  
	  await newNews.save();
	  
	  // Populate createdBy before sending response
	  await newNews.populate('createdBy', 'username');

	  // Log activity
	  await logActivity(
		'news_created',
		req.admin._id,
		'news',
		newNews._id,
		`Created news article: ${title}`,
		{ status: newNews.status }
	  );
  
	  res.status(201).json({ success: true, data: newNews });
  
	} catch (err) {
	  console.error("Error uploading news:", err.message);
	  res.status(500).json({ success: false, error: "Server error" });
	}
  };

export const deleteNews = async (req, res) => {
	try {
		const newsId = req.params.id;
		
		let news = await News.findById(newsId);
		if(!news) return res.status(404).json({error: "News not found"});

		const newsTitle = news.title;
		await News.findByIdAndDelete(newsId);

		// Log activity
		await logActivity(
			'news_deleted',
			req.admin._id,
			'news',
			newsId,
			`Deleted news article: ${newsTitle}`
		);

		res.status(200).json({message: "News deleted successfully"});
	} catch (error) {
		console.log("error in deleting news:", error);
		res.status(500).json({error: "Server Error"});
	}
};

export const updateNews = async (req, res) => {
  try {
    const newsId = req.params.id;

    // First check if the news exists
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ success: false, error: "News not found" });
    }

    // Extract update data from request body
    const { title, content, category, author, imageUrl, status } = req.body;
    console.log('Update news - received status:', status);
    console.log('Update news - all req.body:', req.body);

    // Prepare update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (author) updateData.author = author;
    if (status) updateData.status = status;

    // Handle image update if provided
    if (req.file) {
      const streamUpload = (buffer) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "news-images" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });

      const uploadedImage = await streamUpload(req.file.buffer);
      updateData.image = uploadedImage.secure_url;
    } else if (imageUrl) {
      // User provided a URL string
      const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
        folder: "news-images",
      });
      updateData.image = uploadedImage.secure_url;
    }

    // Update the news
    const updatedNews = await News.findByIdAndUpdate(
      newsId,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username').populate('approvedBy', 'username');

    // Log activity
    await logActivity(
      'news_updated',
      req.admin._id,
      'news',
      newsId,
      `Updated news article: ${updatedNews.title}`,
      { changes: Object.keys(updateData) }
    );

    res.status(200).json({
      success: true,
      message: "News updated successfully",
      data: updatedNews
    });

  } catch (error) {
    console.error("Error updating news:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Submit news for approval (change status to pending)
export const submitForApproval = async (req, res) => {
	try {
		const newsId = req.params.id;
		
		const news = await News.findById(newsId);
		if (!news) {
			return res.status(404).json({ error: "News not found" });
		}
		
		// Only draft news can be submitted
		if (news.status !== 'draft') {
			return res.status(400).json({ error: "Only draft news can be submitted for approval" });
		}
		
		news.status = 'pending';
		await news.save();
		await news.populate('createdBy', 'username');
		
		// Log activity
		await logActivity(
			'news_submitted',
			req.admin._id,
			'news',
			newsId,
			`Submitted news for approval: ${news.title}`
		);
		
		res.status(200).json({ success: true, message: "News submitted for approval", data: news });
	} catch (error) {
		console.log("Error in submitForApproval:", error.message);
		res.status(500).json({ error: "Server error" });
	}
};

// Approve news (admin or super_admin only)
export const approveNews = async (req, res) => {
	try {
		const newsId = req.params.id;
		
		// Check permission
		if (!['admin', 'super_admin'].includes(req.admin.permission)) {
			return res.status(403).json({ error: "Only admins can approve news" });
		}
		
		const news = await News.findById(newsId);
		if (!news) {
			return res.status(404).json({ error: "News not found" });
		}
		
		news.status = 'published';
		news.approvedBy = req.admin._id;
		news.approvedAt = new Date();
		await news.save();
		
		await news.populate(['createdBy', 'approvedBy'], 'username');
		
		// Log activity
		await logActivity(
			'news_approved',
			req.admin._id,
			'news',
			newsId,
			`Approved and published news: ${news.title}`
		);
		
		res.status(200).json({ success: true, message: "News approved and published", data: news });
	} catch (error) {
		console.log("Error in approveNews:", error.message);
		res.status(500).json({ error: "Server error" });
	}
};

// Reject news (send back to draft)
export const rejectNews = async (req, res) => {
	try {
		const newsId = req.params.id;
		const { reason } = req.body;
		
		// Check permission
		if (!['admin', 'super_admin'].includes(req.admin.permission)) {
			return res.status(403).json({ error: "Only admins can reject news" });
		}
		
		const news = await News.findById(newsId);
		if (!news) {
			return res.status(404).json({ error: "News not found" });
		}
		
		news.status = 'draft';
		await news.save();
		await news.populate('createdBy', 'username');
		
		// Log activity
		await logActivity(
			'news_rejected',
			req.admin._id,
			'news',
			newsId,
			`Rejected news and moved to draft: ${news.title}`,
			{ reason }
		);
		
		res.status(200).json({ 
			success: true, 
			message: reason || "News rejected", 
			data: news 
		});
	} catch (error) {
		console.log("Error in rejectNews:", error.message);
		res.status(500).json({ error: "Server error" });
	}
};
