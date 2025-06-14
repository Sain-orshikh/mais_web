const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary for Account B
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_ALUMNI_WEBP_B_API_KEY,
  api_secret: process.env.CLOUDINARY_ALUMNI_WEBP_B_API_SECRET,
});

async function deleteAllAlumniFromAccountB() {
  try {
    console.log('🔍 Searching for alumni files in Account B...');
    
    // Get all resources in the alumni/webp folder
    const result = await cloudinary.search
      .expression('folder:alumni/webp')
      .max_results(500)
      .execute();

    const files = result.resources;
    
    if (files.length === 0) {
      console.log('✅ No files found in Account B alumni folder. Nothing to delete.');
      return;
    }

    console.log(`\n📋 Found ${files.length} files in Account B:`);
    files.forEach(file => console.log(`   - ${file.public_id}`));

    console.log('\n🗑️  Starting deletion...\n');

    const deleted = [];
    const failed = [];

    for (const file of files) {
      try {
        await cloudinary.uploader.destroy(file.public_id);
        console.log(`✅ Deleted: ${file.public_id}`);
        deleted.push(file.public_id);
      } catch (error) {
        console.error(`❌ Failed to delete ${file.public_id}:`, error.message);
        failed.push({ public_id: file.public_id, error: error.message });
      }
    }

    // Summary
    console.log('\n📊 Deletion Summary:');
    console.log(`✅ Successfully deleted: ${deleted.length}`);
    console.log(`❌ Failed deletions: ${failed.length}`);

    if (failed.length > 0) {
      console.log('\n❌ Failed deletions:');
      failed.forEach(item => console.log(`   - ${item.public_id}: ${item.error}`));
    }

    console.log('\n🎉 Account B cleanup complete!');

  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

// Confirmation prompt
console.log('⚠️  WARNING: This will delete ALL files in the alumni/webp folder of Account B');
console.log('🔑 Account B Cloud Name:', process.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_CLOUD_NAME);
console.log('\n💡 Run this script only if you want to clean up Account B before the proper upload.');
console.log('\n🚀 Starting cleanup in 3 seconds...\n');

setTimeout(deleteAllAlumniFromAccountB, 3000);
