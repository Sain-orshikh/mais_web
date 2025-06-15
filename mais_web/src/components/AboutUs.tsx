import { motion } from 'framer-motion';
import { useAboutUsTranslation } from '../translations/useTranslation';
import TranslationLoading from './TranslationLoading';

const AboutUs: React.FC = () => {
  const { t, loading, error } = useAboutUsTranslation();

  // Show loading state while translations are being loaded
  if (loading || !t) {
    return <TranslationLoading error={error} />;
  }
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const graduates = [
    { country: t.scholarshipRecipients.countries["USA"], count: 10, amount: "$1,500,000" },
    { country: t.scholarshipRecipients.countries["Australia"], count: 1, amount: "$50,000" },
    { country: t.scholarshipRecipients.countries["Japan"], count: 1, amount: "$45,000" },
    { country: t.scholarshipRecipients.countries["Hungary"], count: 2, amount: "$80,000" },
    { country: t.scholarshipRecipients.countries["South Korea"], count: 6, amount: "$300,000" },
    { country: t.scholarshipRecipients.countries["Canada"], count: 4, amount: "$200,000" },
    { country: t.scholarshipRecipients.countries["Turkey"], count: 1, amount: "$30,000" },
    { country: t.scholarshipRecipients.countries["China"], count: 14, amount: "$700,000" }
  ];
  const achievements2024 = t.achievements.recent.items;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">          <motion.div className="max-w-4xl mx-auto text-center" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {t.hero.subtitle}
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              {t.hero.description}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision & Mission Section */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm"
              variants={fadeInLeft}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>                <h2 className="text-2xl font-bold text-gray-800">{t.vision.title}</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t.vision.content}
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-sm"
              variants={fadeInUp}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>                <h2 className="text-2xl font-bold text-gray-800">{t.mission.title}</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {t.mission.content}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Historical Timeline */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.journey.title}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t.journey.description}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-blue-600 h-full"></div>
                {t.journey.timeline.map((item, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  variants={fadeInUp}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
                      <div className="text-blue-600 font-bold text-xl mb-2">{item.year}</div>
                      <h3 className="font-semibold text-gray-800 mb-2">{item.event}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* School Statistics */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.statistics.title}</h2>
            <p className="text-gray-600 text-lg">{t.statistics.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center shadow-sm"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.statistics.cards.students.title}</h3>
              <div className="space-y-1">
                <p className="text-blue-600 font-semibold">{t.statistics.cards.students.male}</p>
                <p className="text-pink-600 font-semibold">{t.statistics.cards.students.female}</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center shadow-sm"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.statistics.cards.faculty.title}</h3>
              <div className="space-y-1">
                <p className="text-blue-600 font-semibold">{t.statistics.cards.faculty.male}</p>
                <p className="text-pink-600 font-semibold">{t.statistics.cards.faculty.female}</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center shadow-sm"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                </svg>
              </div>              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.statistics.cards.alumni.title}</h3>
              <p className="text-purple-600 font-semibold text-lg">{t.statistics.cards.alumni.percentage}</p>
              <p className="text-gray-600 text-sm">{t.statistics.cards.alumni.subtitle}</p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center shadow-sm"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>              <h3 className="text-2xl font-bold text-gray-800 mb-2">{t.statistics.cards.scholarships.title}</h3>
              <p className="text-orange-600 font-semibold text-lg">{t.statistics.cards.scholarships.amount}</p>
              <p className="text-gray-600 text-sm">{t.statistics.cards.scholarships.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Curriculum Programs */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.curriculum.title}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              {t.curriculum.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.curriculum.programs.map((program, index) => (
              <motion.div 
                key={index}
                className={`bg-white p-6 rounded-xl shadow-sm border-l-4 border-${program.color}-600 hover:shadow-md transition-shadow`}
                variants={fadeInUp}
              >
                <h3 className={`text-xl font-bold text-${program.color}-600 mb-2`}>{program.title}</h3>
                <p className="text-gray-700 font-medium mb-3">{program.subtitle}</p>
                <p className="text-gray-600 text-sm">{program.subjects}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Scholarship Recipients */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.scholarshipRecipients.title}</h2>
            <p className="text-gray-600 text-lg">{t.scholarshipRecipients.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {graduates.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow"
                variants={fadeInUp}
              >
                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.country}</h3>
                <div className="space-y-2">
                  <p className="text-blue-600 font-semibold">{item.count} student{item.count > 1 ? 's' : ''}</p>
                  <p className="text-green-600 font-bold text-lg">{item.amount}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Outstanding Achievements */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.achievements.title}</h2>
            <p className="text-gray-600 text-lg">{t.achievements.description}</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Historic Achievements */}
            <motion.div className="mb-12" variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.achievements.historic.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.achievements.historic.items.map((item, index) => (
                  <div key={index} className={`bg-white p-6 rounded-xl shadow-sm text-center border-l-4 ${
                    index % 4 === 0 ? 'border-yellow-500' : 
                    index % 4 === 1 ? 'border-green-500' : 
                    index % 4 === 2 ? 'border-yellow-500' : 'border-blue-500'
                  }`}>
                    <div className={`text-2xl font-bold mb-2 ${
                      index % 4 === 0 ? 'text-yellow-600' : 
                      index % 4 === 1 ? 'text-green-600' : 
                      index % 4 === 2 ? 'text-yellow-600' : 'text-blue-600'
                    }`}>{item.year}</div>
                    <p className="text-gray-800 font-semibold">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 2024 Achievements */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.achievements.recent.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements2024.map((achievement, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-600">
                    <h4 className="font-bold text-gray-800 mb-2">{achievement.title}</h4>
                    <p className="text-gray-600">{achievement.count}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Cambridge PDQ Program */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.pdqProgram.title}</h2>
            <p className="text-gray-600 text-lg">{t.pdqProgram.description}</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm mb-8" variants={fadeInUp}>
              <h3 className="text-xl font-bold text-gray-800 mb-6">{t.pdqProgram.certificate.title}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {t.pdqProgram.certificate.cohorts.map((cohort, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-800 mb-3">{cohort.title}</h4>
                    <p className="text-gray-600 mb-2">{cohort.period}</p>
                    <p className="text-blue-600 font-medium">{cohort.participants}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-sm" variants={fadeInUp}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{t.pdqProgram.diploma.title}</h3>
              <p className="text-gray-600 mb-2">{t.pdqProgram.diploma.period}</p>
              <p className="text-green-600 font-medium">{t.pdqProgram.diploma.participants}</p>
            </motion.div>          </div>
        </div>
      </motion.section>

      {/* Back to Homepage Button */}
      <motion.div 
        className="py-8 text-center bg-gray-50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.a 
          href="/"
          className="inline-flex items-center text-accent hover:text-accent-dark transition-colors font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          {t.callToAction.buttons.backToHome}
        </motion.a>
      </motion.div>

    </div>
  );
};

export default AboutUs;
