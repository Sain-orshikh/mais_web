// Utility to manage alumni posters - using Cloudinary URLs with 3-tier fallback
import { generateSmartAlumniUrls } from './cloudinaryConfig';

export interface AlumniPosterData {
  fileName: string;
  webpPrimary: string;
  webpFallback: string;
  jpgFallback: string;
  alt: string;
  accountUsed: 'A' | 'B';
}

// Generate poster data for all 61 alumni with Cloudinary URLs
export const generateAlumniPosters = (): AlumniPosterData[] => {
  // All 61 alumni file names (without extension)
  const allAlumniFileNames = [
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

  return allAlumniFileNames.map(fileName => {
    const urls = generateSmartAlumniUrls(fileName);
    return {
      fileName,
      webpPrimary: urls.webpPrimary,
      webpFallback: urls.webpFallback,
      jpgFallback: urls.jpgFallback,
      alt: `Alumni Poster ${fileName} - Achievement showcase`,      accountUsed: urls.accountUsed
    };
  });
};

// Function to check if Cloudinary is configured properly
export const checkCloudinaryConfiguration = (): boolean => {
  try {
    // This will be implemented when we need to validate Cloudinary config
    return true;
  } catch {
    return false;
  }
};
