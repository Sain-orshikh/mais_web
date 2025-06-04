export interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  university: string;
  major: string;
  countryCode: string;
  image?: string;
}

export const alumniData: Alumni[] = [
  // United States
  {
    id: 1,
    name: "Bat-Erdene Batbayar",
    graduationYear: 2023,
    university: "Harvard University",
    major: "Computer Science",
    countryCode: "US",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "Oyungerel Ganbold",
    graduationYear: 2022,
    university: "Stanford University",
    major: "Business Administration",
    countryCode: "US",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 3,
    name: "Temuulen Erdene",
    graduationYear: 2023,
    university: "MIT",
    major: "Electrical Engineering",
    countryCode: "US",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  
  // United Kingdom
  {
    id: 4,
    name: "Narantsetseg Davaanyam",
    graduationYear: 2022,
    university: "University of Oxford",
    major: "International Relations",
    countryCode: "GB",
    image: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    id: 5,
    name: "Munkhjargal Bat-Erdene",
    graduationYear: 2021,
    university: "University of Cambridge",
    major: "Economics",
    countryCode: "GB",
    image: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  
  // China
  {
    id: 6,
    name: "Enkhjargal Tumenbayar",
    graduationYear: 2023,
    university: "Peking University",
    major: "East Asian Studies",
    countryCode: "CN",
    image: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    id: 7,
    name: "Chinbat Bayarsaikhan",
    graduationYear: 2022,
    university: "Tsinghua University",
    major: "Mechanical Engineering",
    countryCode: "CN",
    image: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  
  // Germany
  {
    id: 8,
    name: "Munkhtsetseg Dorj",
    graduationYear: 2023,
    university: "Technical University of Munich",
    major: "Automotive Engineering",
    countryCode: "DE",
    image: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    id: 9,
    name: "Gantulga Purev",
    graduationYear: 2021,
    university: "Humboldt University of Berlin",
    major: "Philosophy",
    countryCode: "DE",
    image: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  
  // Japan
  {
    id: 10,
    name: "Sarnai Ganbaatar",
    graduationYear: 2022,
    university: "University of Tokyo",
    major: "International Business",
    countryCode: "JP",
    image: "https://randomuser.me/api/portraits/women/10.jpg"
  },
  
  // Australia
  {
    id: 11,
    name: "Batmunkh Erdene",
    graduationYear: 2023,
    university: "University of Melbourne",
    major: "Environmental Science",
    countryCode: "AU",
    image: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  
  // Canada
  {
    id: 12,
    name: "Uyanga Tsogt",
    graduationYear: 2022,
    university: "University of Toronto",
    major: "Medical Sciences",
    countryCode: "CA",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  
  // France
  {
    id: 13,
    name: "Otgonbayar Sukhbat",
    graduationYear: 2021,
    university: "Sorbonne University",
    major: "Fine Arts",
    countryCode: "FR",
    image: "https://randomuser.me/api/portraits/men/13.jpg"
  },
  
  // South Korea
  {
    id: 14,
    name: "Delgermaa Bayar",
    graduationYear: 2023,
    university: "Seoul National University",
    major: "Computer Engineering",
    countryCode: "KR",
    image: "https://randomuser.me/api/portraits/women/14.jpg"
  }
];

// Function to get alumni by country code
export const getAlumniByCountry = (countryCode: string): Alumni[] => {
  return alumniData.filter(alumni => alumni.countryCode === countryCode);
};