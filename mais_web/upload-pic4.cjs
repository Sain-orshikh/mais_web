const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary for News JPG Account
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_NEWS_JPG_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_NEWS_JPG_API_KEY,
  api_secret: process.env.CLOUDINARY_NEWS_JPG_API_SECRET,
});

async function uploadPic4ToCloudinary() {
  try {
    // First, delete the old JPG version
    console.log('🗑️ Deleting old pic4.jpg from Cloudinary...');
    try {
      await cloudinary.uploader.destroy('misc/pic4', { 
        resource_type: 'image',
        type: 'upload'
      });
      console.log('✅ Old pic4.jpg deleted from Cloudinary');
    } catch (deleteError) {
      console.log('ℹ️ No existing pic4 found to delete (this is fine)');
    }

    const filePath = path.join(__dirname, 'public', 'pic4.jpeg');
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ pic4.jpeg not found in public directory');
      return;
    }

    console.log('📂 Uploading pic4.jpeg to News JPG Account...');      const result = await cloudinary.uploader.upload(filePath, {
      public_id: 'pic4',
      folder: 'misc',
      resource_type: 'image',
      quality: 'auto:good'
      // Removed format to preserve original
    });
      console.log('✅ Successfully uploaded pic4.jpeg');
    console.log('🌐 Cloudinary URL:', result.secure_url);
    console.log('📊 File size:', Math.round(result.bytes / 1024 / 1024 * 100) / 100, 'MB');
    
    // Save the URL for reference
    const urlInfo = {
      timestamp: new Date().toISOString(),
      original_file: 'pic4.jpeg',
      cloudinary_url: result.secure_url,
      public_id: result.public_id,
      size_bytes: result.bytes,
      size_mb: Math.round(result.bytes / 1024 / 1024 * 100) / 100
    };
    
    fs.writeFileSync('pic4-cloudinary-url.json', JSON.stringify(urlInfo, null, 2));
    console.log('📁 URL info saved to: pic4-cloudinary-url.json');
      console.log('\n💡 You can now replace references to /pic4.jpeg with:');
    console.log('   ', result.secure_url);
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
  }
}

uploadPic4ToCloudinary();
