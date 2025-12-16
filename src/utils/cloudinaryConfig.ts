// Cloudinary configuration and utility functions

// Environment variables for Cloudinary accounts
const cloudinaryConfig = {
  webpAccountA: {
    cloudName: import.meta.env.VITE_CLOUDINARY_ALUMNI_WEBP_A_CLOUD_NAME,
    apiKey: import.meta.env.CLOUDINARY_ALUMNI_WEBP_A_API_KEY,
    apiSecret: import.meta.env.CLOUDINARY_ALUMNI_WEBP_A_API_SECRET,
  },
  webpAccountB: {
    cloudName: import.meta.env.VITE_CLOUDINARY_ALUMNI_WEBP_B_CLOUD_NAME,
    apiKey: import.meta.env.CLOUDINARY_ALUMNI_WEBP_B_API_KEY,
    apiSecret: import.meta.env.CLOUDINARY_ALUMNI_WEBP_B_API_SECRET,
  },
  jpgAccount: {
    cloudName: import.meta.env.VITE_CLOUDINARY_JPG_CLOUD_NAME,
    apiKey: import.meta.env.CLOUDINARY_JPG_API_KEY,
    apiSecret: import.meta.env.CLOUDINARY_JPG_API_SECRET,
  },
  newsJpgAccount: {
    cloudName: import.meta.env.VITE_CLOUDINARY_NEWS_JPG_CLOUD_NAME,
    apiKey: import.meta.env.CLOUDINARY_NEWS_JPG_API_KEY,
    apiSecret: import.meta.env.CLOUDINARY_NEWS_JPG_API_SECRET,
  }
};

// Split alumni files between Account A and B
const accountASplit = [
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
]; // 30 files

const accountBSplit = [
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
]; // 31 files

// Generate Cloudinary URL with optimization parameters
const generateCloudinaryUrl = (cloudName: string, fileName: string, options: {
  format?: 'auto' | 'webp' | 'jpg';
  quality?: 'auto' | number;
  folder?: string;
} = {}) => {
  const {
    format = 'auto',
    quality = 'auto',
    folder = 'alumni'
  } = options;

  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    'c_fill', // Crop to fill
    'g_center' // Center gravity
  ].join(',');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${folder}/${fileName}`;
};

// Smart URL generation with random account selection and 3-tier fallback
export const generateSmartAlumniUrls = (fileName: string): {
  webpPrimary: string;
  webpFallback: string;
  jpgFallback: string;
  accountUsed: 'A' | 'B';
} => {
  // Determine which account this file belongs to
  const isAccountAFile = accountASplit.includes(fileName);
  const isAccountBFile = accountBSplit.includes(fileName);
  
  // If file is specifically assigned to an account, use that as primary
  let primaryAccount: 'A' | 'B';
  let fallbackAccount: 'A' | 'B';
  
  if (isAccountAFile) {
    primaryAccount = 'A';
    fallbackAccount = 'B';
  } else if (isAccountBFile) {
    primaryAccount = 'B';
    fallbackAccount = 'A';
  } else {
    // For files not in our split (shouldn't happen), use random
    primaryAccount = Math.random() < 0.5 ? 'A' : 'B';
    fallbackAccount = primaryAccount === 'A' ? 'B' : 'A';
  }

  const primaryCloudName = primaryAccount === 'A' 
    ? cloudinaryConfig.webpAccountA.cloudName
    : cloudinaryConfig.webpAccountB.cloudName;
    
  const fallbackCloudName = fallbackAccount === 'A'
    ? cloudinaryConfig.webpAccountA.cloudName  
    : cloudinaryConfig.webpAccountB.cloudName;
  return {
    webpPrimary: generateCloudinaryUrl(primaryCloudName, fileName, { format: 'webp', folder: 'alumni/webp' }),
    webpFallback: generateCloudinaryUrl(fallbackCloudName, fileName, { format: 'webp', folder: 'alumni/webp' }),
    jpgFallback: generateCloudinaryUrl(cloudinaryConfig.jpgAccount.cloudName, fileName, { format: 'jpg', folder: 'alumni/jpg' }),
    accountUsed: primaryAccount
  };
};

// Generate URLs for news images (News JPG account)
export const generateNewsImageUrl = (fileName: string): string => {
  return generateCloudinaryUrl(cloudinaryConfig.newsJpgAccount.cloudName, fileName, {
    format: 'auto',
    folder: 'news/jpg'
  });
};

// Check if all Cloudinary accounts are configured
export const areCloudinaryAccountsConfigured = (): {
  webpA: boolean;
  webpB: boolean;
  jpg: boolean;
  newsJpg: boolean;
  allConfigured: boolean;
} => {
  const webpA = !!(cloudinaryConfig.webpAccountA.cloudName && 
                   cloudinaryConfig.webpAccountA.apiKey && 
                   cloudinaryConfig.webpAccountA.apiSecret);
  
  const webpB = !!(cloudinaryConfig.webpAccountB.cloudName && 
                   cloudinaryConfig.webpAccountB.apiKey && 
                   cloudinaryConfig.webpAccountB.apiSecret);
  
  const jpg = !!(cloudinaryConfig.jpgAccount.cloudName && 
                 cloudinaryConfig.jpgAccount.apiKey && 
                 cloudinaryConfig.jpgAccount.apiSecret);

  const newsJpg = !!(cloudinaryConfig.newsJpgAccount.cloudName && 
                     cloudinaryConfig.newsJpgAccount.apiKey && 
                     cloudinaryConfig.newsJpgAccount.apiSecret);

  return {
    webpA,
    webpB, 
    jpg,
    newsJpg,
    allConfigured: webpA && webpB && jpg && newsJpg
  };
};

export { cloudinaryConfig, accountASplit, accountBSplit };
