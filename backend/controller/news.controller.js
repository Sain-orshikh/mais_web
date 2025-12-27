import {v2 as cloudinary} from "cloudinary";
import streamifier from "streamifier";
import News from "../models/news.model.js";
import Analytics from "../models/analytics.model.js";

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
		const news = await News.find().sort({createdAt: -1});

		res.status(200).json({ data: news });
	} catch (error) {
		console.log("error in fetching news:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createNews = async (req, res) => {
	try {
	  const { title, content, category, imageUrl: directUrl, author } = req.body;
	  console.log("directUrl:", req.file);
	  console.log("file:", req.file);
	  if (!req.file && !directUrl) {
		return res.status(400).json({
		  success: false,
		  error: "Please provide an image",
		});
	  }
	  if (!title || !content || !category || (!req.file && !directUrl)) {
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
	  });
  
	  await newNews.save();
  
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

		await News.findByIdAndDelete(newsId);

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
    const { title, content, category, author, imageUrl } = req.body;

    // Prepare update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (author) updateData.author = author;

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
