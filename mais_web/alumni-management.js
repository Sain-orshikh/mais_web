const fs = require('fs');
const path = require('path');

const alumniJpgDir = './public/alumni/jpg';
const alumniWebpDir = './public/alumni/webp';

// Function to get file size in bytes
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    console.error(`Error getting size for ${filePath}:`, error.message);
    return 0;
  }
}

// Function to format bytes to human readable
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Function to shuffle array (Fisher-Yates shuffle)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function main() {
  console.log('🎯 Alumni Management Script Starting...\n');

  // Task 1: Calculate total size of all WebP files
  console.log('📊 Task 1: Calculating WebP files total size...');
  const webpFiles = fs.readdirSync(alumniWebpDir).filter(file => file.endsWith('.webp'));
  let totalWebpSize = 0;
  let webpFilesInfo = [];

  webpFiles.forEach(file => {
    const filePath = path.join(alumniWebpDir, file);
    const size = getFileSize(filePath);
    totalWebpSize += size;
    webpFilesInfo.push({ name: file, size: size });
  });

  console.log(`📁 Total WebP files: ${webpFiles.length}`);
  console.log(`📏 Total WebP size: ${formatBytes(totalWebpSize)}`);
  console.log(`📏 Average WebP size: ${formatBytes(totalWebpSize / webpFiles.length)}\n`);

  // Task 2: Randomly select 20 JPG files to keep
  console.log('🎲 Task 2: Randomly selecting 20 JPG files to keep...');
  const jpgFiles = fs.readdirSync(alumniJpgDir).filter(file => file.endsWith('.jpg'));
  console.log(`📁 Total JPG files found: ${jpgFiles.length}`);

  if (jpgFiles.length < 20) {
    console.log('❌ Error: Less than 20 JPG files available!');
    return;
  }

  // Randomly select 20 files to keep
  const shuffledJpgFiles = shuffleArray(jpgFiles);
  const filesToKeep = shuffledJpgFiles.slice(0, 20);
  const filesToRemove = shuffledJpgFiles.slice(20);

  console.log('\n✅ Files selected to KEEP (20 randomly chosen):');
  filesToKeep.forEach((file, index) => {
    console.log(`  ${index + 1}. ${file}`);
  });

  console.log(`\n🗑️  Files to be REMOVED (${filesToRemove.length} files):');
  filesToRemove.forEach((file, index) => {
    console.log(`  ${index + 1}. ${file}`);
  });

  // Ask for confirmation before deletion
  console.log('\n⚠️  CONFIRMATION REQUIRED:');
  console.log(`   - Keep: ${filesToKeep.length} JPG files`);
  console.log(`   - Remove: ${filesToRemove.length} JPG files`);
  console.log(`   - All ${webpFiles.length} WebP files will be uploaded to Cloudinary`);
  
  // For safety, let's create a backup list first
  const backupData = {
    timestamp: new Date().toISOString(),
    webpFiles: webpFilesInfo,
    jpgFilesToKeep: filesToKeep,
    jpgFilesToRemove: filesToRemove,
    totalWebpSize: totalWebpSize,
    totalWebpSizeFormatted: formatBytes(totalWebpSize)
  };

  fs.writeFileSync('./alumni-backup-info.json', JSON.stringify(backupData, null, 2));
  console.log('\n💾 Backup information saved to: alumni-backup-info.json');

  // Calculate sizes for files to remove
  let totalRemovedSize = 0;
  filesToRemove.forEach(file => {
    const filePath = path.join(alumniJpgDir, file);
    totalRemovedSize += getFileSize(filePath);
  });

  console.log(`\n📊 Summary:`);
  console.log(`   - Total WebP size: ${formatBytes(totalWebpSize)}`);
  console.log(`   - Space saved by removing ${filesToRemove.length} JPGs: ${formatBytes(totalRemovedSize)}`);
  
  return {
    webpFiles,
    totalWebpSize: formatBytes(totalWebpSize),
    filesToKeep,
    filesToRemove,
    backupFile: './alumni-backup-info.json'
  };
}

// Run the script
if (require.main === module) {
  main().then((result) => {
    if (result) {
      console.log('\n✨ Script completed successfully!');
      console.log('\n🔥 Next steps:');
      console.log('   1. Review the randomly selected files above');
      console.log('   2. If satisfied, run: node alumni-management.js --confirm-delete');
      console.log('   3. Upload all WebP files to Cloudinary');
      console.log('   4. Update code to use hybrid approach (Cloudinary WebP + local JPG fallback)');
    }
  }).catch(console.error);
}

module.exports = { main };
