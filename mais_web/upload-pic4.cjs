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
    const filePath = path.join(__dirname, 'public', 'pic4.jpg');
    
    if (!fs.existsSync(filePath)) {
      console.error('❌ pic4.jpg not found in public directory');
      return;
    }

    console.log('📂 Uploading pic4.jpg to News JPG Account...');
    
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: 'pic4',
      folder: 'misc',
      resource_type: 'image',
      format: 'jpg',
      quality: 'auto:good'
    });
    
    console.log('✅ Successfully uploaded pic4.jpg');
    console.log('🌐 Cloudinary URL:', result.secure_url);
    console.log('📊 File size:', Math.round(result.bytes / 1024 / 1024 * 100) / 100, 'MB');
    
    // Save the URL for reference
    const urlInfo = {
      timestamp: new Date().toISOString(),
      original_file: 'pic4.jpg',
      cloudinary_url: result.secure_url,
      public_id: result.public_id,
      size_bytes: result.bytes,
      size_mb: Math.round(result.bytes / 1024 / 1024 * 100) / 100
    };
    
    fs.writeFileSync('pic4-cloudinary-url.json', JSON.stringify(urlInfo, null, 2));
    console.log('📁 URL info saved to: pic4-cloudinary-url.json');
    
    console.log('\n💡 You can now replace references to /pic4.jpg with:');
    console.log('   ', result.secure_url);
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
  }
}

uploadPic4ToCloudinary();
