// Utility to manage alumni posters - simplified JPG-only version
export interface AlumniPosterData {
  id: number;
  src: string;
  alt: string;
}

// Generate poster data for available JPG files
export const generateAlumniPosters = (count: number = 40): AlumniPosterData[] => {
  const posters: AlumniPosterData[] = [];
  
  for (let i = 1; i <= count; i++) {
    posters.push({
      id: i,
      src: `/alumni/jpg/${i}.jpg`,
      alt: `Alumni Poster ${i} - Achievement showcase`
    });
  }
  
  return posters;
};

// Function to check if a poster exists
export const checkPosterExists = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`/alumni/jpg/${id}.jpg`, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Get available posters count (for dynamic detection)
export const getAvailablePostersCount = async (): Promise<number> => {
  let count = 0;
  
  // Check files sequentially
  for (let i = 1; i <= 100; i++) {
    const exists = await checkPosterExists(i);
    if (exists) {
      count = i;
    } else if (i > count + 10) {
      // Stop checking after 10 consecutive missing files
      break;
    }
  }
  
  return count;
};
