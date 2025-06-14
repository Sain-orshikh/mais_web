const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary for Account A (WebP)
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_A_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_ALUMNI_WEBP_A_API_KEY,
  api_secret: process.env.CLOUDINARY_ALUMNI_WEBP_A_API_SECRET,
});

// Account A files (30 files)
const accountAFiles = [
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
  "enguun tamir"
];

const webpDir = './public/alumni/webp';

async function uploadToCloudinaryAccountA() {
  console.log('🚀 Starting upload to Cloudinary Account A (WebP)...');
  console.log(`📁 Cloud Name: ${process.env.VITE_CLOUDINARY_ALUMNI_WEBP_A_CLOUD_NAME}`);
  console.log(`📊 Files to upload: ${accountAFiles.length}\n`);

  let uploadedCount = 0;
  let failedCount = 0;
  const failedFiles = [];

  for (const fileName of accountAFiles) {
    const filePath = path.join(webpDir, `${fileName}.webp`);
    
    try {
      // Check if file exists locally
      if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${fileName}.webp`);
        failedCount++;
        failedFiles.push(`${fileName}.webp (file not found)`);
        continue;
      }

      // Get file size for reporting
      const stats = fs.statSync(filePath);
      const fileSizeKB = (stats.size / 1024).toFixed(2);

      console.log(`📤 Uploading: ${fileName}.webp (${fileSizeKB} KB)...`);

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: fileName,
        folder: 'alumni',
        resource_type: 'image',
        format: 'webp',
        quality: 'auto:good',
        fetch_format: 'auto',
        overwrite: true,
        unique_filename: false,
        use_filename: false
      });

      console.log(`✅ Success: ${fileName}.webp → ${result.secure_url}`);
      uploadedCount++;

    } catch (error) {
      console.error(`❌ Failed: ${fileName}.webp →`, error.message);
      failedCount++;
      failedFiles.push(`${fileName}.webp (${error.message})`);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Summary report
  console.log('\n📊 Upload Summary for Account A:');
  console.log(`✅ Successfully uploaded: ${uploadedCount} files`);
  console.log(`❌ Failed uploads: ${failedCount} files`);
  
  if (failedFiles.length > 0) {
    console.log('\n❌ Failed files:');
    failedFiles.forEach(file => console.log(`   - ${file}`));
  }

  // Create backup record
  const uploadRecord = {
    timestamp: new Date().toISOString(),
    account: 'A',
    cloudName: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_A_CLOUD_NAME,
    totalFiles: accountAFiles.length,
    uploadedCount,
    failedCount,
    uploadedFiles: accountAFiles.slice(0, uploadedCount),
    failedFiles
  };

  fs.writeFileSync('./cloudinary-account-a-upload.json', JSON.stringify(uploadRecord, null, 2));
  console.log('\n💾 Upload record saved to: cloudinary-account-a-upload.json');

  if (uploadedCount === accountAFiles.length) {
    console.log('\n🎉 All files uploaded successfully to Account A!');
    console.log('🔥 Next step: Upload Account B files');
  } else {
    console.log(`\n⚠️  ${failedCount} files failed. Please check and retry failed uploads.`);
  }
}

// Test Cloudinary connection first
async function testConnection() {
  try {
    console.log('🔍 Testing Cloudinary Account A connection...');
    const result = await cloudinary.api.ping();
    console.log('✅ Connection successful:', result);
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n💡 Please check your credentials in .env file:');
    console.log('   - VITE_CLOUDINARY_ALUMNI_WEBP_A_CLOUD_NAME');
    console.log('   - CLOUDINARY_ALUMNI_WEBP_A_API_KEY'); 
    console.log('   - CLOUDINARY_ALUMNI_WEBP_A_API_SECRET');
    return false;
  }
}

// Main execution
async function main() {
  console.log('🎯 Cloudinary Account A Upload Script\n');
  
  const connectionOk = await testConnection();
  if (!connectionOk) {
    process.exit(1);
  }

  console.log('\n');
  await uploadToCloudinaryAccountA();
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { uploadToCloudinaryAccountA, testConnection };
