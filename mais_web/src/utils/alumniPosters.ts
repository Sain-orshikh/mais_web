// Utility to manage alumni posters - using file names with WebP/JPG fallback
export interface AlumniPosterData {
  fileName: string;
  webpSrc: string;
  jpgSrc: string;
  alt: string;
}

// Generate poster data for available alumni files with WebP/JPG fallback
export const generateAlumniPosters = (): AlumniPosterData[] => {  // List of all 16 available alumni poster file names (without extension)
  const availableFileNames = [
    "misheel mend-amar",
    "altansuvd erdenebileg",
    "anar tserendavaa", 
    "bolormaa munkhbat",
    "davkharbayar chuluunsukh",
    "enkhriimaa tuvshinjargal",
    "maral baatarkhuyag",
    "misheel dulguun",
    "nomunzul bayasgalan",
    "sanchirbold enkhtaivan",
    "tamir gankhuu",
    "temuulen ganzorig",
    "tergel tuguldur",
    "tsendmaa erdenebat",
    "tsogtzul dulguun",
    "tuguldur munkh-erdene"
  ];  return availableFileNames.map(fileName => ({
    fileName,
    webpSrc: `/alumni/webp/${fileName}.webp`,
    jpgSrc: `/alumni/jpg/${fileName}.jpg`,
    alt: `Alumni Poster ${fileName} - Achievement showcase`
  }));
};

// Function to check if a poster exists by fileName (checks both formats)
export const checkPosterExists = async (fileName: string): Promise<boolean> => {
  try {
    // Check WebP first
    const webpResponse = await fetch(`/alumni/webp/${fileName}.webp`, { method: 'HEAD' });
    if (webpResponse.ok) return true;
    
    // Fallback to JPG
    const jpgResponse = await fetch(`/alumni/jpg/${fileName}.jpg`, { method: 'HEAD' });
    return jpgResponse.ok;
  } catch {
    return false;
  }
};
