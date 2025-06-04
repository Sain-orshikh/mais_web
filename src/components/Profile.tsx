import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              <span className="text-gray-400">1024 x 1024</span>
            </div>
            <h2 className="text-4xl font-bold mt-6 mb-2">Dorbesh Baba</h2>
            <p className="text-gray-600 text-center mb-8">
              I am a Web Designer based in san francisco.
            </p>
            <h3 className="text-3xl font-bold mb-6">Achievements</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-2xl text-gray-600 hover:text-gray-800">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl text-gray-600 hover:text-gray-800">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl text-gray-600 hover:text-gray-800">
                <FaLinkedin />
              </a>
              <a href="#" className="text-2xl text-gray-600 hover:text-gray-800">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Right Cards */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <p className="text-gray-500 mb-4">Hello There!</p>
            <h1 className="text-4xl font-bold leading-tight">
              I'M <span className="font-outline">DORBESH BABA</span>, A PRODUCT DESIGNER CRAFTING{' '}
              <span className="font-outline">USER-CENTRIC DESIGN</span> WITH PIXEL-PERFECT PRECISION.
            </h1>
            <div className="mt-6 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-gray-600">Available for Freelancing</p>
            </div>
            <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors">
              Download CV
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg overflow-x-auto">
            <div className="flex space-x-8 min-w-max">
              <p className="text-gray-300">sher taka ami mere khai</p>
              <p className="text-black">Ami khuni hasinar lok</p>
              <p className="text-gray-300">Ami des</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 