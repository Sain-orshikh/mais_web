  import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Statistics from './Statistics';
import WorldMap from './WorldMap';
import SlidingHero from './ui/SlidingHero';
import EventCard from './ui/EventCard';
import NewsCard from './ui/NewsCard';
import StudentLife from './StudentLife';

const Home = () => {
  // Sample school images - replace with actual image paths
  const schoolImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1432&q=80'
  ];  // Sample news items
  const newsItems = [
    { 
      id: 1, 
      title: "Spring Festival Celebration 2025", 
      excerpt: "Join us for our annual Spring Festival featuring cultural performances, traditional food, and student art exhibitions. A celebration of our diverse community and rich traditions.",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&h=300&fit=crop"
    },
    { 
      id: 2, 
      title: "MAIS Students Win International Math Competition", 
      excerpt: "Our talented mathematics team secured first place at the Asia-Pacific International Mathematics Olympiad, showcasing exceptional problem-solving skills and dedication.",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&h=300&fit=crop"
    },
    { 
      id: 3, 
      title: "New Science Lab Opening Ceremony", 
      excerpt: "State-of-the-art laboratory facilities now open for advanced research and experiments. Equipped with cutting-edge technology to enhance learning experiences.",
      imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=300&fit=crop"
    },
    { 
      id: 4, 
      title: "Student Exchange Program Announcement", 
      excerpt: "Exciting opportunities for cultural exchange with partner schools worldwide. Applications now open for semester programs in Europe, North America, and Australia.",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=300&fit=crop"
    },
    { 
      id: 5, 
      title: "Annual Sports Day Championships", 
      excerpt: "Athletes showcase their talents in various sports competitions. Inter-house competitions foster teamwork, sportsmanship, and healthy competition among students.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop"
    },
    { 
      id: 6, 
      title: "Environmental Sustainability Initiative", 
      excerpt: "New green campus initiatives launched to promote environmental awareness. Solar panels, recycling programs, and eco-friendly practices implemented across the school.",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop"
    }
  ];

  // Sample upcoming events
  const upcomingEvents = [
    { 
      id: 1, 
      title: "Grade 12 Graduation Ceremony", 
      date: "2025-06-15", 
      time: "10:00 AM", 
      location: "Main Auditorium",
      category: "Ceremony"
    },
    { 
      id: 2, 
      title: "International Science Fair", 
      date: "2025-06-20", 
      time: "2:00 PM", 
      location: "Science Building",
      category: "Academic"
    },
    { 
      id: 3, 
      title: "Summer Camp Registration", 
      date: "2025-06-25", 
      time: "9:00 AM", 
      location: "Administration Office",
      category: "Registration"
    }
  ];
  
  // Animation for scroll reveal
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Hook for detecting when elements are in view
  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    
    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);
    
    return { ref, controls };
  };

  const { ref: featuresRef, controls: featuresControls } = useScrollAnimation();
  const { ref: newsRef, controls: newsControls } = useScrollAnimation();
  const { ref: ctaRef, controls: ctaControls } = useScrollAnimation();

  return (
    <div className="min-h-screen">
      {/* Hero Section with Sliding Background */}
      <section className="relative h-screen">
        <SlidingHero images={schoolImages} interval={7000} overlayOpacity={0.6}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-4 max-w-4xl">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Welcome to MAIS
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-white drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Mongol Aspiration International School
              </motion.p>              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Link 
                  to="/3341" 
                  className="bg-white text-accent-dark px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-50 transition-all hover:shadow-lg transform hover:-translate-y-1"
                >
                  View Student Profiles
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Scroll down indicator */}

        </SlidingHero>
      </section>      {/* Latest News Section */}
      <motion.section 
        ref={newsRef}
        variants={fadeInUp}
        initial="hidden"
        animate={newsControls}
        className="py-12 bg-white"
      >        <div className="container mx-auto px-4">          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest News</h2>
            <Link 
              to="/news" 
              className="text-gray-900 hover:text-gray-700 font-medium text-sm inline-flex items-center group"
            >
              View All
              <div className="ml-2 w-8 h-8 bg-accent rounded-md flex items-center justify-center group-hover:bg-accent-dark transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {newsItems.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                excerpt={item.excerpt}
                imageUrl={item.imageUrl}
                href="/news"
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Upcoming Events Section */}
      <section className="py-12 bg-gray-50">        <div className="container mx-auto px-4">          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="text-gray-900 hover:text-gray-700 font-medium text-sm inline-flex items-center group"
            >
              View All
              <div className="ml-2 w-8 h-8 bg-accent rounded-md flex items-center justify-center group-hover:bg-accent-dark transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                date={event.date}
                title={event.title}
                time={event.time}
                location={event.location}
                category={event.category}
                href="/events"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}  
      {/* World Map Section */}
      <section className="p-12">
          <div>
            <WorldMap />
          </div>
      </section>
      <Statistics />

      {/* Student Life Section */}
      <StudentLife />

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        variants={fadeInUp}
        initial="hidden"
        animate={featuresControls}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose MAIS?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">Our school offers a unique learning environment designed to nurture global citizens ready for tomorrow's challenges.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">            <motion.div 
              className="p-6 bg-accent-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-accent"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-accent-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">International Curriculum</h3>
              <p className="text-gray-600">Following Cambridge International standards for global education excellence with experienced educators from around the world.</p>
            </motion.div>
              <motion.div 
              className="p-6 bg-success-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-success"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-success-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-success-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Diverse Community</h3>
              <p className="text-gray-600">A multicultural environment that fosters global understanding and collaboration with students and staff from 15+ countries.</p>
            </motion.div>
              <motion.div 
              className="p-6 bg-accent-50 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-accent"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-accent-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-accent-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Modern Facilities</h3>
              <p className="text-gray-600">State-of-the-art facilities designed for optimal learning including science labs, digital classrooms, and sports complexes.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>      {/* Call to Action */}
      <motion.section 
        ref={ctaRef}
        variants={fadeInUp}
        initial="hidden"
        animate={ctaControls}
        className="relative py-16 bg-white overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-success/5 to-accent/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-success/10 rounded-full translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            
            {/* Content */}
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover how MAIS can help shape your future with our world-class education and supportive community.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/3341" 
                className="bg-accent text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent-dark transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Learn More
              </Link>              <Link 
                to="/contact" 
                className="bg-white border-2 border-accent text-accent px-8 py-3 rounded-lg text-lg font-semibold hover:bg-accent hover:text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="#3b82f6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* School Info */}
            <div className="md:col-span-1">              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3 p-2">
                  <img
                    src='/mais_logo_light.png'
                    alt="MAIS Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Mongol Aspiration</h3>
                  <p className="text-sm text-gray-300">International School</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                Nurturing global citizens through excellence in education, innovation, and character development.
              </p>              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.736-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.986C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                    About MAIS
                  </Link>
                </li>
                <li>
                  <Link to="/admissions" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link to="/academics" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Academics
                  </Link>
                </li>
                <li>
                  <Link to="/3341" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Student Profiles
                  </Link>
                </li>
                <li>
                  <Link to="/news" className="text-gray-300 hover:text-white transition-colors text-sm">
                    News & Events
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Programs</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Primary School
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Secondary School
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Cambridge IGCSE
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    A-Levels
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Language Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Extracurriculars
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">Ulaanbaatar, Mongolia</p>
                    <p className="text-gray-300 text-sm">Peace Avenue 123</p>
                  </div>
                </div>                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <p className="text-gray-300 text-sm">+976 11 123456</p>
                </div>                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <p className="text-gray-300 text-sm">info@mais.edu.mn</p>
                </div>                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">Mon - Fri: 8:00 - 17:00</p>
                    <p className="text-gray-300 text-sm">Sat: 9:00 - 15:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-300 text-sm">
                  © 2025 Mongol Aspiration International School. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;