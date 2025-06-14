import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdConstruction } from 'react-icons/md';

const WorkInProgress: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Construction Icon */}
        <div className="mb-8">
          <MdConstruction className="mx-auto text-6xl md:text-8xl text-orange-500 animate-bounce" />
        </div>
        
        {/* Main Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Work in Progress
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          We're working hard to bring you this page. Check back soon!
        </p>
        
        <p className="text-sm md:text-base text-gray-500 mb-8">
          This section is currently under development. We appreciate your patience as we build something amazing for you.
        </p>
        
        {/* Call to Action */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <AiOutlineHome className="mr-2" />
            Back to Home
          </Link>
          
          <p className="text-sm text-gray-400">
            or explore our completed sections:
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link 
              to="/" 
              className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/aboutus" 
              className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </div>
  );
};

export default WorkInProgress;
