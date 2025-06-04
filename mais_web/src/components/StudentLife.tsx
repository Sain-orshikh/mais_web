import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StudentLife = () => {
  return (    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
          {/* Image Section */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl shadow-lg h-full min-h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=500&fit=crop&crop=center" 
              alt="Students collaborating and studying together in a modern campus environment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </motion.div>

          {/* Content Section */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg h-full min-h-[500px] flex flex-col justify-between"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}          >
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Student Life at <span className="text-accent">MAIS</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Experience a vibrant campus community where academic excellence meets personal growth. 
                Our students engage in diverse activities, from talent shows and art exhibitions to
                cultural celebrations, sports competitions, and leadership opportunities.
              </p>
              
              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-700">Modern Campus Facilities</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-700">Active Student Clubs</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-700">Sports & Athletics</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-gray-700">Cultural Events</span>
                </div>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="mt-auto">
              <Link 
                to="/student-life" 
                className="inline-flex items-center bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
              >
                Learn More
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentLife;
