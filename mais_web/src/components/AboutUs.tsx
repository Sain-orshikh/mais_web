import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
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
    { country: "USA", count: 10, amount: "$1,500,000" },
    { country: "Australia", count: 1, amount: "$50,000" },
    { country: "Japan", count: 1, amount: "$45,000" },
    { country: "Hungary", count: 2, amount: "$80,000" },
    { country: "South Korea", count: 6, amount: "$300,000" },
    { country: "Canada", count: 4, amount: "$200,000" },
    { country: "Turkey", count: 1, amount: "$30,000" },
    { country: "China", count: 14, amount: "$700,000" }
  ];

  const achievements2024 = [
    { title: "Country Awards", count: "4 students" },
    { title: "Top in Mongolia", count: "8 students" },
    { title: "SIMOC", count: "3 teachers, 27 students - 25 medals" },
    { title: "Vanda Science Olympiad", count: "39 students - 33 medals" },
    { title: "National Biology Olympiad", count: "Gold-1, Special place-1" },
    { title: "Science Fair", count: "1st place (Grade 11)" },
    { title: "National Mongolian Language & English Debate", count: "1st place" },
    { title: "China Robot Competition", count: "Gold, Silver, Bronze" },
    { title: "HMUN", count: "2nd place (after Tsinghua)" },
    { title: "World Scholar's Cup", count: "Central Asia Top 3" }
  ];

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
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="max-w-4xl mx-auto text-center" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About MAIS
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Mongol Aspiration International School
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Leading science school with international curriculums, preparing responsible Mongolian citizens for continuous growth
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
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become a leading science school with international curriculums
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
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Providing quality dual curriculum education, and preparing responsible Mongolian citizens aspired to continuous growth
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
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              From our establishment to becoming a leading international school in Mongolia
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-blue-600 h-full"></div>
              
              {[
                { year: "2011", event: "School established", desc: "Mongol Aspiration International School was founded" },
                { year: "2012", event: "Cambridge International Exam Center", desc: "Registered as Cambridge International Examination Center" },
                { year: "2015", event: "Cambridge International Curriculum", desc: "Cambridge International Curriculum evaluated at all levels" },
                { year: "2019", event: "Cambridge PDQ Center", desc: "Became Cambridge Professional Development Qualification center" },
                { year: "2023", event: "CIE: ICE, AICE Diploma, PDQ-center", desc: "Expanded Cambridge programs and certifications" },
                { year: "2025", event: "Duke of Edinburgh's Award", desc: "Received authorization to implement The Duke of Edinburgh's Award" }
              ].map((item, index) => (
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
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">School Statistics</h2>
            <p className="text-gray-600 text-lg">Our diverse and growing community</p>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Students</h3>
              <div className="space-y-1">
                <p className="text-blue-600 font-semibold">Male: 48%</p>
                <p className="text-pink-600 font-semibold">Female: 52%</p>
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
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Faculty</h3>
              <div className="space-y-1">
                <p className="text-blue-600 font-semibold">Male: 33%</p>
                <p className="text-pink-600 font-semibold">Female: 67%</p>
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
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Alumni Abroad</h3>
              <p className="text-purple-600 font-semibold text-lg">45.8%</p>
              <p className="text-gray-600 text-sm">Studying & Graduated</p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center shadow-sm"
              variants={fadeInUp}
            >
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Scholarships</h3>
              <p className="text-orange-600 font-semibold text-lg">$3,457,337</p>
              <p className="text-gray-600 text-sm">2023-2024 Total</p>
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
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Curriculum</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Comprehensive educational programs following international standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
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
                subjects: "1 program",
                color: "orange"
              },
              {
                title: "National Curriculum",
                subtitle: "Grades 9-12",
                subjects: "A-511 Standard",
                color: "red"
              },
              {
                title: "Duke of Edinburgh",
                subtitle: "Silver & Gold Awards",
                subjects: "Character Development",
                color: "indigo"
              }
            ].map((program, index) => (
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
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">2023-2024 Scholarships</h2>
            <p className="text-gray-600 text-lg">Our graduates earning scholarships worldwide</p>
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
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Outstanding Achievements</h2>
            <p className="text-gray-600 text-lg">Recognition and awards that showcase our excellence</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Historic Achievements */}
            <motion.div className="mb-12" variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Historic Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm text-center border-l-4 border-yellow-500">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">2016</div>
                  <p className="text-gray-800 font-semibold">IGCSE Mathematics</p>
                  <p className="text-gray-600 text-sm">Top in the World</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center border-l-4 border-yellow-500">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">2023</div>
                  <p className="text-gray-800 font-semibold">AS Mathematics</p>
                  <p className="text-gray-600 text-sm">Top in the World (2 students)</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center border-l-4 border-blue-500">
                  <div className="text-2xl font-bold text-blue-600 mb-2">2025</div>
                  <p className="text-gray-800 font-semibold">National Speech Competition</p>
                  <p className="text-gray-600 text-sm">2 teachers participated</p>
                </div>
              </div>
            </motion.div>

            {/* 2024 Achievements */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">2024 Achievements</h3>
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
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Cambridge PDQ Program</h2>
            <p className="text-gray-600 text-lg">Professional Development for Educators</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-sm mb-8" variants={fadeInUp}>
              <h3 className="text-xl font-bold text-gray-800 mb-6">"Teaching and Learning" Certificate (150 hours)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">1st Cohort</h4>
                  <p className="text-gray-600 mb-2">October 25, 2023 – February 29, 2024</p>
                  <p className="text-blue-600 font-medium">10 teachers, 10 mentors</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">2nd Cohort</h4>
                  <p className="text-gray-600 mb-2">September 3, 2024 – January 3, 2025</p>
                  <p className="text-blue-600 font-medium">9 teachers, 9 mentors</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-sm" variants={fadeInUp}>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Diploma Program</h3>
              <p className="text-gray-600 mb-2">October 20, 2024 – January 25, 2025</p>
              <p className="text-green-600 font-medium">2 teachers completed training</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover how MAIS can help shape your future with our world-class education and supportive international community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/admissions" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all hover:shadow-lg transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              Learn About Admissions
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all hover:shadow-lg transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Contact Us
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
