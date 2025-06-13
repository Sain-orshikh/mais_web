import { motion } from 'framer-motion';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';

// School coordinates - Replace with your actual school coordinates
const SCHOOL_LOCATION = {
  lat: 47.9184, // Example coordinates for Ulaanbaatar, Mongolia
  lng: 106.9177
};

const SCHOOL_INFO = {
  name: "Mongolian-American International School (MAIS)",
  address: "Ulaanbaatar, Mongolia", // Replace with actual address
  phone: "+976-11-123456", // Replace with actual phone
  website: "https://mais.edu.mn" // Replace with actual website
};

const SchoolDirections = () => {
  const [selectedMarker, setSelectedMarker] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${SCHOOL_LOCATION.lat},${SCHOOL_LOCATION.lng}`;
    window.open(url, '_blank');
  };
  // You'll need to get a Google Maps API key and add it to your environment variables
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Fallback component when no API key is provided
  const MapFallback = () => (
    <div className="h-96 md:h-[500px] bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Map View Unavailable</h3>
        <p className="text-gray-500 mb-4">Google Maps API key is required to display the interactive map.</p>
        <button
          onClick={openDirections}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open in Google Maps
        </button>
      </div>
    </div>
  );

  return (
    <motion.section 
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Find Us on the Map
          </h2>
          
        </motion.div>

        <motion.div 
          className="max-w-7xl mx-auto"
          variants={fadeInUp}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">            {/* Map Container */}
            <div className="relative h-96 md:h-[500px]">
              {API_KEY ? (                <APIProvider apiKey={API_KEY}>
                  <Map
                    center={SCHOOL_LOCATION}
                    zoom={15}
                    mapId="school-map"
                    className="w-full h-full"
                    disableDefaultUI={false}
                    clickableIcons={false}
                    scrollwheel={true}
                  >
                    <Marker
                      position={SCHOOL_LOCATION}
                      onClick={() => setSelectedMarker(true)}
                      title={SCHOOL_INFO.name}
                    />
                    
                    {selectedMarker && (
                      <InfoWindow
                        position={SCHOOL_LOCATION}
                        onCloseClick={() => setSelectedMarker(false)}
                      >
                        <div className="p-3 max-w-xs">
                          <h3 className="font-bold text-lg mb-2">{SCHOOL_INFO.name}</h3>
                          <p className="text-gray-600 mb-2">{SCHOOL_INFO.address}</p>
                          <p className="text-gray-600 mb-3">{SCHOOL_INFO.phone}</p>
                          <button
                            onClick={openDirections}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Get Directions
                          </button>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </APIProvider>
              ) : (
                <MapFallback />
              )}            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SchoolDirections;
