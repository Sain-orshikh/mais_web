export interface Student {
  id: number;
  name: string;
  school: string;
  grade: string;
  bio: string;
  currentStudy: string;
  imageUrl: string;
  socialLinks: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    portfolio?: string;
  };
  achievements: {
    id: number;
    title: string;
    description: string;
    date: string;
    icon: string;
    count?: number;
    history?: {
      title: string;
      date: string;
    }[];
  }[];
  subjects: {
    level: string;
    subjects: {
      name: string;
      grade: string;
      icon: string;
    }[];
  }[];
}

export const students: Student[] = [
  {
    id: 3341,
    name: "DULGUUN BOLOR-ERDENE",
    school: "MONGOL ASPIRATION INTERNATIONAL SCHOOL",
    grade: "11th grade",
    bio: "Hello! I'm a passionate student with interests in mathematics, science, and technology. I love learning new things and taking on challenging projects.",
    currentStudy: "Currently studying A Level",
    imageUrl: "https://robohash.org/set=set2",
    socialLinks: {
      github: "https://github.com/dulguun",
      twitter: "https://twitter.com/dulguun",
      linkedin: "https://linkedin.com/in/dulguun",
      portfolio: "https://dulguun.dev"
    },
    achievements: [
      {
        id: 1,
        title: "MVP",
        description: "Most Valuable Player",
        date: "First unlocked on Jul 1, 2022",
        icon: "🏀",
        count: 2,
        history: [
          { title: "Bronze and Silver unlocked", date: "Jul 1, 2022" },
          { title: "2nd pull request merged", date: "Jul 1, 2022" }
        ]
      },
      {
        id: 2,
        title: "Best Student",
        description: "Best Student Award 2023",
        date: "2023",
        icon: "🎯",
        count: 2,
        history: [
          { title: "Bronze and Silver unlocked", date: "Jul 1, 2022" },
          { title: "2nd pull request merged", date: "Jul 1, 2022" }
        ]
      }
    ],
    subjects: [
      {
        level: "A Level",
        subjects: [
          { name: "Mathematics", grade: "A*", icon: "📐" },
          { name: "Physics", grade: "A", icon: "⚡" },
          { name: "Chemistry", grade: "A", icon: "🧪" }
        ]
      },
      {
        level: "IGCSE",
        subjects: [
          { name: "English Language", grade: "A*", icon: "📚" },
          { name: "English Literature", grade: "A", icon: "📚" }
        ]
      }
    ]
  },
  {
    id: 3342,
    name: "BAT-ERDENE MUNKHSAIKHAN",
    school: "MONGOL ASPIRATION INTERNATIONAL SCHOOL",
    grade: "12th grade",
    bio: "Passionate about computer science and artificial intelligence. Always eager to learn and create innovative solutions.",
    currentStudy: "Currently studying A Level",
    imageUrl: "https://robohash.org/set=set3",
    socialLinks: {
      github: "https://github.com/bat-erdene",
      linkedin: "https://linkedin.com/in/bat-erdene"
    },
    achievements: [
      {
        id: 1,
        title: "Coding Champion",
        description: "National Coding Competition Winner",
        date: "2023",
        icon: "💻"
      },
      {
        id: 2,
        title: "Best Student",
        description: "Best Student Award 2023",
        date: "2023",
        icon: "🎯",
        count: 2,
        history: [
          { title: "Bronze and Silver unlocked", date: "Jul 1, 2022" },
          { title: "2nd pull request merged", date: "Jul 1, 2022" }
        ]
      }
    ],
    subjects: [
      {
        level: "A Level",
        subjects: [
          { name: "Computer Science", grade: "A*", icon: "💻" },
          { name: "Mathematics", grade: "A", icon: "📐" },
          { name: "Physics", grade: "A", icon: "⚡" }
        ]
      }
    ]
  },
  {
    id: 3343,
    name: "OYUNBILEG GANTULGA",
    school: "MONGOL ASPIRATION INTERNATIONAL SCHOOL",
    grade: "11th grade",
    bio: "Creative mind with a strong interest in arts and literature. Love expressing ideas through various mediums.",
    currentStudy: "Currently studying IGCSE",
    imageUrl: "https://robohash.org/set=set4",
    socialLinks: {
      twitter: "https://twitter.com/oyunbileg",
      portfolio: "https://oyunbileg.art"
    },
    achievements: [
      {
        id: 1,
        title: "Art Excellence",
        description: "School Art Competition Winner",
        date: "2023",
        icon: "🎨"
      }
    ],
    subjects: [
      {
        level: "IGCSE",
        subjects: [
          { name: "English Literature", grade: "A*", icon: "📚" },
          { name: "Art & Design", grade: "A*", icon: "🎨" },
          { name: "History", grade: "A", icon: "📜" }
        ]
      }
    ]
  },
  {
    id: 3344,
    name: "TEMUULEN BOLD",
    school: "MONGOL ASPIRATION INTERNATIONAL SCHOOL",
    grade: "10th grade",
    bio: "Sports enthusiast and team player. Balancing academics with athletic achievements.",
    currentStudy: "Currently studying IGCSE",
    imageUrl: "https://robohash.org/set=set5",
    socialLinks: {
      twitter: "https://twitter.com/temuulen",
      linkedin: "https://linkedin.com/in/temuulen"
    },
    achievements: [
      {
        id: 1,
        title: "Sports Captain",
        description: "School Basketball Team Captain",
        date: "2023",
        icon: "🏀"
      }
    ],
    subjects: [
      {
        level: "IGCSE",
        subjects: [
          { name: "Physical Education", grade: "A*", icon: "⚽" },
          { name: "Biology", grade: "A", icon: "🧬" },
          { name: "Mathematics", grade: "B", icon: "📐" }
        ]
      }
    ]
  },
  {
    id: 3345,
    name: "ENKHJIN ERDENE",
    school: "MONGOL ASPIRATION INTERNATIONAL SCHOOL",
    grade: "12th grade",
    bio: "Future entrepreneur with a passion for business and economics. Love analyzing market trends and developing business strategies.",
    currentStudy: "Currently studying A Level",
    imageUrl: "https://robohash.org/set=set6",
    socialLinks: {
      linkedin: "https://linkedin.com/in/enkhjin",
      portfolio: "https://enkhjin.biz"
    },
    achievements: [
      {
        id: 1,
        title: "Business Leader",
        description: "Young Entrepreneur Competition Winner",
        date: "2023",
        icon: "💼"
      }
    ],
    subjects: [
      {
        level: "A Level",
        subjects: [
          { name: "Economics", grade: "A*", icon: "📈" },
          { name: "Business Studies", grade: "A", icon: "💼" },
          { name: "Accounting", grade: "A", icon: "🧮" }
        ]
      }
    ]
  }
];

export const getStudentById = (id: number): Student | undefined => {
  return students.find(student => student.id === id);
}; 