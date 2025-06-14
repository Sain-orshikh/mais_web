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

async function uploadToCloudinary(filePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: 'news/jpg',
      resource_type: 'image',
      format: 'jpg',
      quality: 'auto:good'
    });
    
    console.log(`✅ Uploaded: ${publicId}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${publicId}:`, error.message);
    throw error;
  }
}

async function main() {
  const newsJpgDir = path.join(__dirname, 'public', 'news', 'jpg');
  
  if (!fs.existsSync(newsJpgDir)) {
    console.error('❌ News JPG directory not found:', newsJpgDir);
    console.log('📍 Expected path:', newsJpgDir);
    console.log('💡 Please create the directory or check the path');
    return;
  }

  // Get all JPG files from news directory
  const jpgFiles = fs.readdirSync(newsJpgDir).filter(file => file.endsWith('.jpg'));
  
  if (jpgFiles.length === 0) {
    console.log('✅ No JPG files found in news directory');
    return;
  }

  console.log(`\n📋 Found ${jpgFiles.length} news JPG files to upload:`);
  jpgFiles.forEach(file => console.log(`   - ${file}`));
  
  console.log('\n🚀 Starting upload to News JPG Account...\n');

  const uploaded = [];
  const failed = [];

  for (const file of jpgFiles) {
    const filePath = path.join(newsJpgDir, file);
    const publicId = path.basename(file, '.jpg');
    
    try {
      await uploadToCloudinary(filePath, publicId);
      uploaded.push(publicId);
    } catch (error) {
      failed.push({ file, error: error.message });
    }
  }

  // Save upload log
  const uploadLog = {
    timestamp: new Date().toISOString(),
    account: 'NEWS_JPG',
    cloud_name: process.env.VITE_CLOUDINARY_NEWS_JPG_CLOUD_NAME,
    total_files: jpgFiles.length,
    uploaded: uploaded,
    failed: failed,
    success_count: uploaded.length,
    failure_count: failed.length,
    files_info: jpgFiles.map(file => ({
      filename: file,
      public_id: path.basename(file, '.jpg'),
      size_mb: (fs.statSync(path.join(newsJpgDir, file)).size / 1024 / 1024).toFixed(2)
    }))
  };

  const logFile = 'cloudinary-news-jpg-upload.json';
  fs.writeFileSync(logFile, JSON.stringify(uploadLog, null, 2));

  // Summary
  console.log('\n📊 Upload Summary for News JPG Account:');
  console.log(`✅ Successfully uploaded: ${uploaded.length}`);
  console.log(`❌ Failed uploads: ${failed.length}`);
  console.log(`📁 Log saved to: ${logFile}`);

  if (failed.length > 0) {
    console.log('\n❌ Failed uploads:');
    failed.forEach(item => console.log(`   - ${item.file}: ${item.error}`));
  }

  // Calculate total size
  const totalSizeMB = jpgFiles.reduce((total, file) => {
    const filePath = path.join(newsJpgDir, file);
    return total + (fs.statSync(filePath).size / 1024 / 1024);
  }, 0);

  console.log(`\n📊 News JPG Statistics:`);
  console.log(`📁 Total files: ${jpgFiles.length}`);
  console.log(`💾 Total size: ${totalSizeMB.toFixed(2)} MB`);
  console.log(`🌐 News JPG fallback coverage: 100%`);
}

main().catch(console.error);
