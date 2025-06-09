export interface University {
  id: number;
  name: string;
  countryCode: string;
  countryName: string;
  alumniCount: number;
}

export interface CountryAlumniData {
  countryCode: string;
  countryName: string;
  totalAlumni: number;
  universities: University[];
}

// Real alumni data from MAIS school records
export const realAlumniData: University[] = [
  // Australia
  { id: 1, name: "University of Melbourne", countryCode: "AU", countryName: "Australia", alumniCount: 1 },
  { id: 2, name: "University of Sydney", countryCode: "AU", countryName: "Australia", alumniCount: 1 },
  { id: 3, name: "Canberra University", countryCode: "AU", countryName: "Australia", alumniCount: 1 },
  { id: 4, name: "Monash University", countryCode: "AU", countryName: "Australia", alumniCount: 1 },
  { id: 5, name: "RMIT University, Melbourne", countryCode: "AU", countryName: "Australia", alumniCount: 1 },
  { id: 6, name: "University of Western Australia", countryCode: "AU", countryName: "Australia", alumniCount: 1 },
  { id: 7, name: "University of Technology Sydney", countryCode: "AU", countryName: "Australia", alumniCount: 1 },

  // Austria
  { id: 8, name: "University of Vienna", countryCode: "AT", countryName: "Austria", alumniCount: 1 },

  // Canada
  { id: 9, name: "University of Toronto", countryCode: "CA", countryName: "Canada", alumniCount: 5 },
  { id: 10, name: "University of Calgary", countryCode: "CA", countryName: "Canada", alumniCount: 1 },
  { id: 11, name: "University of British Columbia", countryCode: "CA", countryName: "Canada", alumniCount: 1 },

  // China
  { id: 12, name: "East China Normal University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 13, name: "Shaanxi Railway Institute", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 14, name: "Shenzhen University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 15, name: "University of Science and Technology Beijing", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 16, name: "Xi'an Jiaotong - Liverpool University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 17, name: "Beijing Foreign Studies University in Foshan", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 18, name: "Beijing Language and Culture University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 19, name: "Capital Medical University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 20, name: "China Pharmaceutical University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 21, name: "Duke Kunshan University", countryCode: "CN", countryName: "China", alumniCount: 4 },
  { id: 22, name: "East China University of Science and Technology", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 23, name: "Peking University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 24, name: "Shanghai Polytechnic University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 25, name: "Shanghai University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 26, name: "Tsinghua University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 27, name: "Tongji University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 28, name: "Wuhan University", countryCode: "CN", countryName: "China", alumniCount: 1 },
  { id: 29, name: "NYU Shanghai", countryCode: "CN", countryName: "China", alumniCount: 4 },

  // Czech Republic
  { id: 30, name: "Charles University, Prague", countryCode: "CZ", countryName: "Czech Republic", alumniCount: 1 },

  // France
  { id: 31, name: "IFA Paris", countryCode: "FR", countryName: "France", alumniCount: 1 },
  { id: 32, name: "University of Paris", countryCode: "FR", countryName: "France", alumniCount: 1 },
  { id: 33, name: "American Business School of Paris", countryCode: "FR", countryName: "France", alumniCount: 1 },
  { id: 34, name: "École Polytechnique, Paris", countryCode: "FR", countryName: "France", alumniCount: 1 },

  // Germany
  { id: 35, name: "Bundeswehr University Munich", countryCode: "DE", countryName: "Germany", alumniCount: 1 },
  { id: 36, name: "Constructor University", countryCode: "DE", countryName: "Germany", alumniCount: 1 },
  { id: 37, name: "Ludwig Maximilian University of Munich", countryCode: "DE", countryName: "Germany", alumniCount: 1 },
  { id: 38, name: "Mediadesign Hochschule", countryCode: "DE", countryName: "Germany", alumniCount: 1 },
  { id: 39, name: "Hochschule Rhein-Waal University, Kleve", countryCode: "DE", countryName: "Germany", alumniCount: 1 },

  // Hong Kong
  { id: 40, name: "The Hong Kong Polytechnic University", countryCode: "HK", countryName: "Hong Kong", alumniCount: 1 },

  // Hungary
  { id: 41, name: "Budapest Business University", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 42, name: "Budapest University of Technology and Economics", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 43, name: "Corvinus University", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 44, name: "Debrecen University", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 45, name: "Eötvös Loránd University", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 46, name: "Óbuda University", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 47, name: "Széchenyi István University", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 48, name: "University of Debrecen", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 49, name: "University of Dunaújváros", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },
  { id: 50, name: "University of Pécs", countryCode: "HU", countryName: "Hungary", alumniCount: 1 },

  // Italy
  { id: 51, name: "Università Bocconi", countryCode: "IT", countryName: "Italy", alumniCount: 1 },
  { id: 52, name: "University of Bologna", countryCode: "IT", countryName: "Italy", alumniCount: 1 },
  { id: 53, name: "University of Florence", countryCode: "IT", countryName: "Italy", alumniCount: 1 },
  { id: 54, name: "University of Milan", countryCode: "IT", countryName: "Italy", alumniCount: 1 },
  { id: 55, name: "University of Trieste", countryCode: "IT", countryName: "Italy", alumniCount: 1 },
  { id: 56, name: "Politecnico di Torino", countryCode: "IT", countryName: "Italy", alumniCount: 1 },

  // Japan
  { id: 57, name: "Temple University, Japan Campus", countryCode: "JP", countryName: "Japan", alumniCount: 1 },
  { id: 58, name: "Tokyo International University", countryCode: "JP", countryName: "Japan", alumniCount: 1 },
  { id: 59, name: "Ritsumeikan Asia Pacific University", countryCode: "JP", countryName: "Japan", alumniCount: 1 },
  { id: 60, name: "Tama Art University", countryCode: "JP", countryName: "Japan", alumniCount: 1 },
  { id: 61, name: "University of Nagoya", countryCode: "JP", countryName: "Japan", alumniCount: 1 },
  { id: 62, name: "Kyoto University of Advanced Science", countryCode: "JP", countryName: "Japan", alumniCount: 1 },

  // Kyrgyzstan
  { id: 63, name: "American University of Central Asia", countryCode: "KG", countryName: "Kyrgyzstan", alumniCount: 1 },

  // Mongolia
  { id: 64, name: "Medical University of Mongolia", countryCode: "MN", countryName: "Mongolia", alumniCount: 1 },
  { id: 65, name: "National University of Mongolia", countryCode: "MN", countryName: "Mongolia", alumniCount: 27 },
  { id: 66, name: "Science and Technology University of Mongolia", countryCode: "MN", countryName: "Mongolia", alumniCount: 20 },
  { id: 67, name: "University of Finance and Economics", countryCode: "MN", countryName: "Mongolia", alumniCount: 2 },
  { id: 68, name: "Finance and Economics Institute", countryCode: "MN", countryName: "Mongolia", alumniCount: 1 },
  { id: 69, name: "German Mongolian Joint Institute of Technology", countryCode: "MN", countryName: "Mongolia", alumniCount: 1 },
  { id: 70, name: "National University of Medical Science", countryCode: "MN", countryName: "Mongolia", alumniCount: 1 },
  { id: 71, name: "Raffles International Institute of Ulaanbaatar", countryCode: "MN", countryName: "Mongolia", alumniCount: 1 },
  { id: 72, name: "University of Humanities", countryCode: "MN", countryName: "Mongolia", alumniCount: 1 },

  // Poland
  { id: 73, name: "University of Lodz", countryCode: "PL", countryName: "Poland", alumniCount: 1 },
  { id: 74, name: "University of Warsaw", countryCode: "PL", countryName: "Poland", alumniCount: 1 },
  { id: 75, name: "Wrocław University of Technology", countryCode: "PL", countryName: "Poland", alumniCount: 1 },

  // Romania
  { id: 76, name: "Transylvania University", countryCode: "RO", countryName: "Romania", alumniCount: 1 },

  // Russia
  { id: 77, name: "Sechenov Medical University", countryCode: "RU", countryName: "Russia", alumniCount: 1 },
  { id: 78, name: "Far Eastern Federal University", countryCode: "RU", countryName: "Russia", alumniCount: 1 },
  { id: 79, name: "Moscow Power Engineering Institute", countryCode: "RU", countryName: "Russia", alumniCount: 1 },
  { id: 80, name: "Moscow State University", countryCode: "RU", countryName: "Russia", alumniCount: 1 },

  // South Korea
  { id: 81, name: "Korea University", countryCode: "KR", countryName: "South Korea", alumniCount: 1 },
  { id: 82, name: "Seoul National University", countryCode: "KR", countryName: "South Korea", alumniCount: 1 },
  { id: 83, name: "Underwood International College - Yonsei University", countryCode: "KR", countryName: "South Korea", alumniCount: 2 },
  { id: 84, name: "Hanyang University", countryCode: "KR", countryName: "South Korea", alumniCount: 1 },
  { id: 85, name: "Hanseo University", countryCode: "KR", countryName: "South Korea", alumniCount: 1 },
  { id: 86, name: "Inha University", countryCode: "KR", countryName: "South Korea", alumniCount: 1 },
  { id: 87, name: "Korea Science Academy", countryCode: "KR", countryName: "South Korea", alumniCount: 1 },
  { id: 88, name: "Linton School of Global Business", countryCode: "KR", countryName: "South Korea", alumniCount: 1 },
  { id: 89, name: "Yonsei University", countryCode: "KR", countryName: "South Korea", alumniCount: 1 },

  // Spain
  { id: 90, name: "IE University", countryCode: "ES", countryName: "Spain", alumniCount: 1 },

  // Taiwan
  { id: 91, name: "Asian University of Taiwan", countryCode: "TW", countryName: "Taiwan", alumniCount: 1 },
  { id: 92, name: "I-Shou University", countryCode: "TW", countryName: "Taiwan", alumniCount: 1 },
  { id: 93, name: "National Cheng Kung University", countryCode: "TW", countryName: "Taiwan", alumniCount: 1 },
  { id: 94, name: "National Yang Ming Chiao Tung University", countryCode: "TW", countryName: "Taiwan", alumniCount: 1 },
  { id: 95, name: "National Dong Hwa University", countryCode: "TW", countryName: "Taiwan", alumniCount: 1 },
  { id: 96, name: "National Taiwan University", countryCode: "TW", countryName: "Taiwan", alumniCount: 1 },
  { id: 97, name: "Tamkang University", countryCode: "TW", countryName: "Taiwan", alumniCount: 1 },
  { id: 98, name: "Yuan Ze University", countryCode: "TW", countryName: "Taiwan", alumniCount: 1 },

  // Turkey
  { id: 99, name: "Turkish Government Scholarship", countryCode: "TR", countryName: "Turkey", alumniCount: 1 },
  { id: 100, name: "Hacettepe University", countryCode: "TR", countryName: "Turkey", alumniCount: 1 },

  // Ukraine
  { id: 101, name: "Kyiv University of Aeronautics", countryCode: "UA", countryName: "Ukraine", alumniCount: 1 },

  // United Kingdom
  { id: 102, name: "BPP University", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 103, name: "Imperial College London", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 104, name: "London South Bank University", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 105, name: "Manchester University", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 106, name: "Royal Holloway", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 107, name: "Swansea University", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 108, name: "University College London", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 109, name: "University of London", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 110, name: "University of Bristol", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },
  { id: 111, name: "University of Roehampton", countryCode: "GB", countryName: "United Kingdom", alumniCount: 1 },

  // United States
  { id: 112, name: "Augustana College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 113, name: "Carroll University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 114, name: "DePaul University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 115, name: "Rochester Institute of Technology", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 116, name: "SUNY Buffalo State University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 117, name: "Trinity University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 118, name: "University of Alabama", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 119, name: "University of Arizona", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 120, name: "University of Louisville", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 121, name: "Webber International University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 122, name: "BAU International University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 123, name: "Brigham Young University, Utah", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 124, name: "Cascadia College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 125, name: "Concordia College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 126, name: "Florida State University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 127, name: "Iowa State University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 128, name: "University of Kansas", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 129, name: "LDS Business College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 130, name: "Marymount University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 131, name: "Michigan State University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 132, name: "New York University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 133, name: "Pensacola State College, Florida", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 134, name: "Purdue University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 135, name: "Rice University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 136, name: "Seattle College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 137, name: "Shoreline Community College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 138, name: "Sierra College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 139, name: "Southern Illinois University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 140, name: "St. Olaf College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 141, name: "State University of New York", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 142, name: "University of California, Berkeley", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 143, name: "University of Colorado, Denver", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 144, name: "University of Michigan - Ann Arbor", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 145, name: "University of Mississippi - Ole Miss", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 146, name: "University of Utah", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 147, name: "Vanderbilt University", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 148, name: "Whitman College", countryCode: "US", countryName: "United States", alumniCount: 1 },
  { id: 149, name: "Whitworth University", countryCode: "US", countryName: "United States", alumniCount: 1 }
];

// Calculate country data with total alumni counts
export const getCountryAlumniData = (): CountryAlumniData[] => {
  const countryMap = new Map<string, CountryAlumniData>();

  realAlumniData.forEach(university => {
    const { countryCode, countryName } = university;
    
    if (!countryMap.has(countryCode)) {
      countryMap.set(countryCode, {
        countryCode,
        countryName,
        totalAlumni: 0,
        universities: []
      });
    }

    const countryData = countryMap.get(countryCode)!;
    countryData.totalAlumni += university.alumniCount;
    countryData.universities.push(university);
  });

  return Array.from(countryMap.values());
};

// Function to get universities by country code
export const getUniversitiesByCountry = (countryCode: string): University[] => {
  return realAlumniData.filter(university => university.countryCode === countryCode);
};

// Function to get total alumni count
export const getTotalAlumniCount = (): number => {
  return realAlumniData.reduce((total, university) => total + university.alumniCount, 0);
};

// Function to get total number of universities
export const getTotalUniversityCount = (): number => {
  return realAlumniData.length;
};

// Function to get total number of countries
export const getTotalCountryCount = (): number => {
  const uniqueCountries = new Set(realAlumniData.map(university => university.countryCode));
  return uniqueCountries.size;
};

// Legacy interface and data for backward compatibility (now using real data)
export interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  university: string;
  major: string;
  countryCode: string;
  image?: string;
}

// Legacy function for backward compatibility
export const getAlumniByCountry = (countryCode: string): University[] => {
  return getUniversitiesByCountry(countryCode);
};