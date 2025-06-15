import type { AboutUsTranslations } from '../types';

export const aboutUsTranslations: AboutUsTranslations = {
  hero: {
    title: "About MAIS",
    subtitle: "Mongol Aspiration International School",
    description: "Leading science school with international curriculums, preparing responsible Mongolian citizens for continuous growth"
  },
  vision: {
    title: "Vision",
    content: "To become a leading science school with international curriculums"
  },
  mission: {
    title: "Mission",
    content: "Providing quality dual curriculum education, and preparing responsible Mongolian citizens aspired to continuous growth"
  },
  journey: {
    title: "Our Journey",
    description: "From our establishment to becoming a leading international school in Mongolia",
    timeline: [
      {
        year: "2011",
        event: "School established",
        desc: "Mongol Aspiration International School was founded"
      },
      {
        year: "2012",
        event: "Cambridge International Exam Center",
        desc: "Registered as Cambridge International Examination Center"
      },
      {
        year: "2015",
        event: "Cambridge International Curriculum",
        desc: "Cambridge International Curriculum evaluated at all levels"
      },
      {
        year: "2019",
        event: "Cambridge PDQ Center",
        desc: "Became Cambridge Professional Development Qualification center"
      },
      {
        year: "2023",
        event: "CIE: ICE, AICE Diploma, PDQ-center",
        desc: "Expanded Cambridge programs and certifications"
      }
    ]
  },
  statistics: {
    title: "School Statistics",
    description: "Our diverse and growing community",
    cards: {
      students: {
        title: "Students",
        male: "Male: 48%",
        female: "Female: 52%"
      },
      faculty: {
        title: "Faculty",
        male: "Male: 33%",
        female: "Female: 67%"
      },
      alumni: {
        title: "Alumni Abroad",
        percentage: "45.8%",
        subtitle: "Studying & Graduated"
      },
      scholarships: {
        title: "Scholarships",
        amount: "$3,457,337",
        subtitle: "2023-2024 Total"
      }
    }
  },
  curriculum: {
    title: "Our Curriculum",
    description: "Comprehensive educational programs following international standards",    programs: [
      {
        title: "IGCSE",
        subtitle: "International General Certificate of Secondary Education",
        subjects: "17 subjects",
        color: "blue"
      },
      {
        title: "AS Level",
        subtitle: "Advanced Subsidiary Level",
        subjects: "16 subjects",
        color: "green"
      },
      {
        title: "A2 Level",
        subtitle: "Advanced Level",
        subjects: "11 subjects",
        color: "purple"
      },
      {
        title: "PDQ",
        subtitle: "Professional Development Qualification",
        subjects: "2 program",
        color: "orange"
      },
      {
        title: "National Curriculum",
        subtitle: "Grades 9-12",
        subjects: "A-511 Standard",
        color: "red"
      }
    ]
  },
  scholarshipRecipients: {
    title: "2023-2024 Scholarships",
    description: "Our graduates earning scholarships worldwide",
    countries: {
      "USA": "USA",
      "Australia": "Australia",
      "Japan": "Japan",
      "Hungary": "Hungary",
      "South Korea": "South Korea",
      "Canada": "Canada",
      "Turkey": "Turkey",
      "China": "China"
    }
  },
  achievements: {
    title: "Outstanding Achievements",
    description: "Recognition and awards that showcase our excellence",
    historic: {
      title: "Historic Milestones",
      items: [
        {
          year: "2016",
          title: "IGCSE Mathematics",
          subtitle: "Top in the World"
        },
        {
          year: "2022",
          title: "PISA Assessment",
          subtitle: "Top in Mongolia"
        },
        {
          year: "2023",
          title: "AS Mathematics",
          subtitle: "Top in the World (2 students)"
        },
        {
          year: "2025",
          title: "National Speech Competition",
          subtitle: "2 teachers participated"
        }
      ]
    },
    recent: {
      title: "2024 Achievements",
      items: [
        { title: "Country Awards", count: "4 students" },
        { title: "Top in Mongolia", count: "14 students" },
        { title: "SIMOC", count: "3 teachers, 27 students - 25 medals" },
        { title: "Vanda Science Olympiad", count: "39 students - 33 medals" },
        { title: "National Biology Olympiad", count: "Gold-1, Special place-1" },
        { title: "Science Fair", count: "1st place (Grade 11)" },
        { title: "National Mongolian Language & English Debate", count: "1st place" },
        { title: "China Robot Competition", count: "Gold, Silver, Bronze" },
        { title: "HMUN", count: "2nd place (after Tsinghua)" },
        { title: "World Scholar's Cup", count: "Central Asia Top 3" }
      ]
    }
  },
  pdqProgram: {
    title: "Cambridge PDQ Program",
    description: "Professional Development for Educators",
    certificate: {
      title: '"Teaching and Learning" Certificate (150 hours)',
      cohorts: [
        {
          title: "1st Cohort",
          period: "October 25, 2023 – February 29, 2024",
          participants: "10 teachers, 10 mentors"
        },
        {
          title: "2nd Cohort",
          period: "September 3, 2024 – January 3, 2025",
          participants: "9 teachers, 9 mentors"
        }
      ]
    },
    diploma: {
      title: "Diploma Program",
      period: "October 20, 2024 – January 25, 2025",
      participants: "2 teachers completed training"
    }
  },
  callToAction: {
    title: "Join Our Community",
    description: "Discover how MAIS can help shape your future with our world-class education and supportive international community.",    buttons: {
      admissions: "Learn About Admissions",
      contact: "Contact Us",
      backToHome: "Back to Homepage"
    }
  }
};

export default aboutUsTranslations;
