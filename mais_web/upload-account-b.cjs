const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary for Account B
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_ALUMNI_WEBP_B_API_KEY,
  api_secret: process.env.CLOUDINARY_ALUMNI_WEBP_B_API_SECRET,
});

async function uploadToCloudinary(filePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: 'alumni/webp',
      resource_type: 'image',
      format: 'webp',
      quality: 'auto:good',
      fetch_format: 'webp'
    });
    
    console.log(`✅ Uploaded: ${publicId}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${publicId}:`, error.message);
    throw error;
  }
}

async function main() {
  const webpDir = path.join(__dirname, 'public', 'alumni', 'webp');
  
  if (!fs.existsSync(webpDir)) {
    console.error('❌ WebP directory not found:', webpDir);
    return;
  }

  // Account B files (31 files) - hardcoded to avoid any mistakes
  const accountBFiles = [
    "amarbold gantumur",
    "amarzaya tselmeg", 
    "amirlangui dashdondov",
    "anar tserendavaa",
    "anungoo sergelen",
    "binderiya battsooj",
    "chinguun mungunshagai",
    "davaajargal sharavdorj",
    "delgermaa nyamdavaa",
    "erdembat yuri",
    "gantsetseg erdene-ochir",
    "gegeejin sundui",
    "itgel bayarbat",
    "jamyandorj ugtakhbayar",
    "jonatan batnasan",
    "misheel dulguun",
    "misheel mend-amar",
    "misheel purev",
    "munguntuya altangerel",
    "nomin-erdene gankhuyag",
    "orgil lkhagvadorj",
    "orgilbayar gunbaatar",
    "saikhanbileg batbold",
    "tenuun batbold",
    "tergel tuguldur",
    "tsetsenbileg gantumur",
    "tsogtzul dulguun",
    "tuguldur tumurbaatar",
    "udval ganzorig",
    "uilstuguldur adiyabaatar",
    "ujin tsogtsaikhan"
  ];

  // Filter to only files that exist and are in our Account B list
  const filesToUploadToB = accountBFiles.filter(publicId => {
    const filePath = path.join(webpDir, `${publicId}.webp`);
    return fs.existsSync(filePath);
  });
  console.log(`\n📋 Found ${filesToUploadToB.length} files to upload to Account B:`);
  filesToUploadToB.forEach(publicId => console.log(`   - ${publicId}.webp`));
  
  if (filesToUploadToB.length === 0) {
    console.log('✅ No files to upload to Account B');
    return;
  }

  console.log('\n🚀 Starting upload to Cloudinary Account B...\n');

  const uploaded = [];
  const failed = [];

  for (const publicId of filesToUploadToB) {
    const filePath = path.join(webpDir, `${publicId}.webp`);
    
    try {
      await uploadToCloudinary(filePath, publicId);
      uploaded.push(publicId);
    } catch (error) {
      failed.push({ file: `${publicId}.webp`, error: error.message });
    }
  }

  // Save upload log
  const uploadLog = {
    timestamp: new Date().toISOString(),
    account: 'B',
    cloud_name: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_CLOUD_NAME,
    total_files: filesToUploadToB.length,
    uploaded: uploaded,
    failed: failed,
    success_count: uploaded.length,
    failure_count: failed.length
  };

  const logFile = 'cloudinary-account-b-upload.json';
  fs.writeFileSync(logFile, JSON.stringify(uploadLog, null, 2));

  // Summary
  console.log('\n📊 Upload Summary for Account B:');
  console.log(`✅ Successfully uploaded: ${uploaded.length}`);
  console.log(`❌ Failed uploads: ${failed.length}`);
  console.log(`📁 Log saved to: ${logFile}`);

  if (failed.length > 0) {
    console.log('\n❌ Failed uploads:');
    failed.forEach(item => console.log(`   - ${item.file}: ${item.error}`));
  }
  // Combined summary of both accounts
  const accountACount = 30; // Known from Account A
  const accountBCount = uploaded.length;
  
  console.log('\n🌐 Overall Cloudinary WebP Distribution:');
  console.log(`📊 Total WebP files: 61`);
  console.log(`🅰️  Account A: ${accountACount} files`);
  console.log(`🅱️  Account B: ${accountBCount} files`);
  console.log(`✅ Total uploaded: ${accountACount + accountBCount}`);
}

main().catch(console.error);
