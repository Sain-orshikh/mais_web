export interface AboutUsTranslations {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  vision: {
    title: string;
    content: string;
  };
  mission: {
    title: string;
    content: string;
  };
  journey: {
    title: string;
    description: string;
    timeline: Array<{
      year: string;
      event: string;
      desc: string;
    }>;
  };
  statistics: {
    title: string;
    description: string;
    cards: {
      students: {
        title: string;
        male: string;
        female: string;
      };
      faculty: {
        title: string;
        male: string;
        female: string;
      };
      alumni: {
        title: string;
        percentage: string;
        subtitle: string;
      };
      scholarships: {
        title: string;
        amount: string;
        subtitle: string;
      };
    };
  };
  curriculum: {
    title: string;
    description: string;    programs: Array<{
      title: string;
      subtitle: string;
      subjects: string;
      color: string;
    }>;
  };
  scholarshipRecipients: {
    title: string;
    description: string;
    countries: {
      [key: string]: string; // For country name translations
    };
  };
  achievements: {
    title: string;
    description: string;
    historic: {
      title: string;
      items: Array<{
        year: string;
        title: string;
        subtitle: string;
      }>;
    };
    recent: {
      title: string;
      items: Array<{
        title: string;
        count: string;
      }>;
    };
  };
  pdqProgram: {
    title: string;
    description: string;
    certificate: {
      title: string;
      cohorts: Array<{
        title: string;
        period: string;
        participants: string;
      }>;
    };
    diploma: {
      title: string;
      period: string;
      participants: string;
    };
  };  callToAction: {
    title: string;
    description: string;
    buttons: {
      admissions: string;
      contact: string;
      backToHome: string;
    };
  };
}

export interface HomeTranslations {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  news: {
    title: string;
    viewAll: string;
  };
  events: {
    title: string;
    viewAll: string;    eventData: Array<{
      title: string;
      date: string;
      time?: string;
      location: string;
      category: string;
    }>;
  };
  statistics: {
    students: string;
    teachers: string;
    courses: string;
    scholarships: string;
  };
  schoolDirections: {
    title: string;
    schoolInfo: {
      name: string;
      description: string;
      address: string;
      phone: string;
    };
    shoppingCenter: {
      name: string;
      description: string;
    };
    getDirections: string;
  };
  registrationNotification: {
    title: string;
    registrationClosesIn: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    deadline: string;
    deadlineDate: string;
    registerButton: string;
    additionalInfo: string;
  };
  registrationTestNotification: {
    title: string;
    description: string;
    dateRange: string;
    registerNow: string;
    status: {
      open: string;
      closing_soon: string;
      last_chance: string;
    };
    urgency: {
      open: string;
      closing_soon: string;
      last_chance: string;
    };
  };  worldMap: {
    title: string;
    searchPlaceholder: string;
    resetButton: string;
    noResults: {
      title: string;
      description: string;
      resetButton: string;
    };
    statistics: {
      title: string;
      alumniAbroad: string;
      countries: string;
      universities: string;
      showingCountries: string;
    };
    topDestinations: string;
    tooltipSuffix: {
      singular: string;
      plural: string;
    };
    countryNames: {
      [key: string]: string;
    };
    popup: {
      title: string;
      closeButton: string;
      programSizes: {
        title: string;
        large: string;
        medium: string;
        small: string;
      };
      topUniversities: string;
      quickFacts: string;
      labels: {
        universities: string;
        university: string;
        totalAlumni: string;
        average: string;
        alumniPerUniversity: string;
        percentage: string;
        globalAlumni: string;
        represents: string;
        of: string;
        alumnus: string;
        alumni: string;
      };
    };
  };
  alumniAchievements: {
    title: string;
    loading: string;
    noPosters: string;
  };
  footer: {
    school: {
      name: string;
      subtitle: string;
      description: string;
    };
    quickLinks: {
      title: string;
      links: Array<{
        text: string;
        href: string;
      }>;
    };
    programs: {
      title: string;
      items: Array<string>;
    };
    contact: {
      title: string;
      address: {
        city: string;
        street: string;
      };
      phones: Array<string>;
      email: string;
      hours: string;
    };
    bottom: {
      copyright: string;
      links: Array<{        text: string;
        href: string;
      }>;
    };
  };
}

export interface CommonTranslations {
  school: {
    name: string;
    fullName: string;
  };
  menu: {
    sections: {
      "Meet MAIS": string;
      "Students": string;
      "Programs": string;
      "Community": string;
      "Join Us": string;
    };
    items: {
      "Overview": string;
      "History": string;
      "Campus": string;
      "Sports": string;
      "Arts & Music": string;
      "DEA": string;
      "Student Council": string;
      "Clubs": string;
      "PDQ": string;
      "Cambridge": string;
      "Parents": string;
      "Staff": string;
      "Alumni": string;
      "Admission": string;
      "Job Posting": string;
      "Contact Us": string;
      "Forums": string;
    };
    footer: {
      "news": string;
      "events": string;
      "contact us": string;
      "forums": string;
      "Register": string;
      "copyright": string;
    };
    subtitle: string;
  };
}

export interface NewsPageTranslations {
  hero: {
    title: string;
    subtitle: string;
  };
  backToHome: string;
  article: {
    backToNews: string;
    invalidArticle: string;
    articleNotFound: string;
    articleNotFoundDescription: string;
    shareTitle: string;
    socialMedia: {
      twitter: string;
      facebook: string;
      copyLink: string;
    };
  };
}

export interface WorkInProgressTranslations {
  title: string;
  subtitle: string;
  description: string;
  backToHome: string;
  exploreText: string;
  links: {
    home: string;
    aboutUs: string;
  };
}
