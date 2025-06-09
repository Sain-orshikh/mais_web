import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const RegistrationNotification = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-06-16T09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative py-8 bg-white overflow-hidden"
    >      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/20 rounded-full translate-x-24 translate-y-24"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-accent/5 rounded-full -translate-x-12 -translate-y-12"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Alert Icon */}
          <motion.div 
            className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </motion.div>
          
          {/* Content */}
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
            🎓 Admissions Test Registration Opens Soon!
          </h2>
          
          {/* Countdown Timer */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg p-6 mb-6 max-w-3xl mx-auto shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span className="text-gray-900 font-semibold text-lg">Registration Opens In</span>
            </div>
            
            {/* Countdown Display */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-accent/10 rounded-lg p-3">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{timeLeft.days}</div>
                <div className="text-sm text-gray-600 font-medium">Days</div>
              </div>
              <div className="bg-accent/10 rounded-lg p-3">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{timeLeft.hours}</div>
                <div className="text-sm text-gray-600 font-medium">Hours</div>
              </div>
              <div className="bg-accent/10 rounded-lg p-3">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-600 font-medium">Minutes</div>
              </div>
              <div className="bg-accent/10 rounded-lg p-3">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-600 font-medium">Seconds</div>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm mb-2">
              <strong>Registration Period:</strong> June 16, 2025 (09:00) - June 20, 2025 (09:00)
            </p>
          </div>
            {/* Call to Action Button */}          <motion.a 
            href="https://mongolaspiration.edu.mn/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 inline-flex items-center justify-center text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
            Visit Registration Website
          </motion.a>
          
          {/* Additional Info */}
          <p className="text-gray-600 text-xs mt-4">
            Don't miss your chance to join MAIS - Limited spots available
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default RegistrationNotification;
