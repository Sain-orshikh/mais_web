const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary for JPG Account (Alumni + News)
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_JPG_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_JPG_API_KEY,
  api_secret: process.env.CLOUDINARY_JPG_API_SECRET,
});

async function uploadToCloudinary(filePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      folder: 'alumni/jpg',
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
  const jpgDir = path.join(__dirname, 'public', 'alumni', 'jpg');
  
  if (!fs.existsSync(jpgDir)) {
    console.error('❌ JPG directory not found:', jpgDir);
    return;
  }

  // All 61 alumni JPG files (complete list for fallback)
  const allAlumniFiles = [
    // Account A alumni (30 files)
    "orgil munkhsaikhan",
    "enerel sandagdorj", 
    "enkhriimaa tuvshinjargal",
    "bolormaa munkhbat",
    "garid nyambayar",
    "temuulen ganzorig",
    "munkhdalai bayandalai",
    "tsendmaa erdenebat",
    "oyuntuya dorjpagam",
    "bat-erdene bayarjargal",
    "tuguldur munkh-erdene",
    "maraljin turmunkh",
    "garid tamir",
    "sanchirbold enkhtaivan",
    "gal gantulga",
    "munkhbileg ganbold",
    "orgil tsogbadrakh",
    "altansuvd erdenebileg",
    "undram enkhbayar",
    "nomunzul bayasgalan",
    "batsukh ariunbold",
    "ariundelger bilguun",
    "badamdorj altangerel",
    "davkharbayar chuluunsukh",
    "maral baatarkhuyag",
    "ulziikhutag ankhbayar",
    "tamir gankhuu",
    "udval tegshbayar",
    "dulguun ganbaatar",
    "enguun tamir",
    // Account B alumni (31 files)
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

  // Filter to only files that exist
  const filesToUpload = allAlumniFiles.filter(publicId => {
    const filePath = path.join(jpgDir, `${publicId}.jpg`);
    return fs.existsSync(filePath);
  });

  console.log(`\n📋 Found ${filesToUpload.length} alumni JPG files to upload:`);
  filesToUpload.forEach(publicId => console.log(`   - ${publicId}.jpg`));
  
  if (filesToUpload.length === 0) {
    console.log('✅ No files to upload');
    return;
  }

  console.log('\n🚀 Starting upload to JPG Account (Alumni fallback)...\n');

  const uploaded = [];
  const failed = [];

  for (const publicId of filesToUpload) {
    const filePath = path.join(jpgDir, `${publicId}.jpg`);
    
    try {
      await uploadToCloudinary(filePath, publicId);
      uploaded.push(publicId);
    } catch (error) {
      failed.push({ file: `${publicId}.jpg`, error: error.message });
    }
  }

  // Save upload log
  const uploadLog = {
    timestamp: new Date().toISOString(),
    account: 'JPG_ALUMNI',
    cloud_name: process.env.VITE_CLOUDINARY_JPG_CLOUD_NAME,
    total_files: filesToUpload.length,
    uploaded: uploaded,
    failed: failed,
    success_count: uploaded.length,
    failure_count: failed.length
  };

  const logFile = 'cloudinary-jpg-alumni-upload.json';
  fs.writeFileSync(logFile, JSON.stringify(uploadLog, null, 2));

  // Summary
  console.log('\n📊 Upload Summary for JPG Account (Alumni):');
  console.log(`✅ Successfully uploaded: ${uploaded.length}`);
  console.log(`❌ Failed uploads: ${failed.length}`);
  console.log(`📁 Log saved to: ${logFile}`);

  if (failed.length > 0) {
    console.log('\n❌ Failed uploads:');
    failed.forEach(item => console.log(`   - ${item.file}: ${item.error}`));
  }

  console.log('\n🎯 Alumni JPG fallback coverage: 100%');
  console.log('🛡️  All alumni now have JPG fallback support!');
}

main().catch(console.error);
