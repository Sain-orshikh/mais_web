import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Statistics from './Statistics';
import WorldMap from './WorldMap';
import SlidingHero from './ui/SlidingHero';
import EventCard from './ui/EventCard';
import NewsCard from './ui/NewsCard';
import SchoolDirections from './SchoolDirections';
import RegistrationNotification from './ui/RegistrationNotification';
import RegistrationTestNotification from './ui/RegistrationTestNotification';
import { getAllLocalizedNews } from '../data/localizedNewsData';
import { useHomeTranslation } from '../translations/useTranslation';
import TranslationLoading from './TranslationLoading';
import { useAtom } from 'jotai';
import { isMenuOpen } from '../store/ThemeAtom';

const Home = () => {
  // Hook for detecting when elements are in view - must be at the top
  const useScrollAnimation = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    
    useEffect(() => {
      if (inView) {
        controls.start('visible');
      }
    }, [controls, inView]);
    
    return { ref, controls };
  };  const { ref: newsRef, controls: newsControls } = useScrollAnimation();
    const { t, loading, error, language } = useHomeTranslation();
  const [menuOpen] = useAtom(isMenuOpen);

  // Show loading state while translations are being loaded
  if (loading || !t) {
    return <TranslationLoading error={error} />;
  }

  // School images from public folder + Cloudinary
  const schoolImages = [
    '/pic1.jpg',
    '/pic2.jpg',
    '/pic3.jpg',
    'https://res.cloudinary.com/dyez98wtv/image/upload/v1749912073/misc/pic4.jpg'
  ];
    // Get news items from data
  const newsItems = getAllLocalizedNews(language);
  // Sample upcoming events
  const upcomingEvents = t.events.eventData;

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with sliding background */}
      <div className="relative h-screen">        <SlidingHero images={schoolImages} />
          {/* Hero content overlay */}
        {!menuOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
            <motion.div 
              className="text-center text-white px-4 max-w-4xl mx-auto relative z-30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {t.hero.title}
              </h1>            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                {t.hero.subtitle}
              </p>            <Link to="/aboutus" className="relative z-40 inline-block">
                <motion.div
                  className="bg-accent hover:bg-accent-dark text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 relative z-40 cursor-pointer inline-block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.hero.buttonText}
                </motion.div>
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      {/* Registration Notification */}
      <RegistrationNotification />

      {/* News Section */}
      <motion.section 
        ref={newsRef}
        variants={fadeInUp}
        initial="hidden"
        animate={newsControls}
        className="py-20 bg-gray-50"
      >        <div className="container mx-auto px-4">          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{t.news.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NewsCard {...item} href={`/news/${item.id}`} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/news" className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
              {t.news.viewAll}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.events.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard {...event} />
              </motion.div>
            ))}
          </div>
            <div className="text-center mt-10">
            <Link to="/wip" className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 inline-block">
              {t.events.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <WorldMap />
        </div>
      </section>

      <Statistics />

      <SchoolDirections />

      {/* Footer Section */}
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* School Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3 p-2">
                  <img
                    src='/mais_logo_light.png'
                    alt="MAIS Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{t?.footer.school.name}</h3>
                  <p className="text-sm text-gray-300">{t?.footer.school.subtitle}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                {t?.footer.school.description}
              </p>
              <div className="flex space-x-4">
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
              <h4 className="text-lg font-semibold mb-4">{t?.footer.quickLinks.title}</h4>
              <ul className="space-y-2">
                {t?.footer.quickLinks.links.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t?.footer.programs.title}</h4>
              <ul className="space-y-2">
                {t?.footer.programs.items.map((program, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                      {program}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t?.footer.contact.title}</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-accent mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">{t?.footer.contact.address.city}</p>
                    <p className="text-gray-300 text-sm">{t?.footer.contact.address.street}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <div className='flex flex-col space-y-2'>
                    {t?.footer.contact.phones.map((phone, index) => (
                      <p key={index} className="text-gray-300 text-sm">{phone}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <p className="text-gray-300 text-sm">{t?.footer.contact.email}</p>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <div>
                    <p className="text-gray-300 text-sm">{t?.footer.contact.hours}</p>
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
                  {t?.footer.bottom.copyright}
                </p>
              </div>
              <div className="flex space-x-6">
                {t?.footer.bottom.links.map((link, index) => (
                  <Link key={index} to={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Fixed Registration Test Notification */}
      <RegistrationTestNotification />
    </div>
  );
};

export default Home;