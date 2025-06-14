import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Add custom styles for the labels
const labelStyles = `
  .leaflet-container {
    font-family: inherit;
  }
  
  .leaflet-control-zoom {
    margin: 10px !important;
  }
  
  @media (max-width: 768px) {
    .leaflet-control-zoom {
      margin: 5px !important;
    }
    .leaflet-control-zoom a {
      width: 26px !important;
      height: 26px !important;
      line-height: 26px !important;
      font-size: 14px !important;
    }
  }
  
  .school-label {
    background: rgba(220, 38, 38, 0.9) !important;
    color: white !important;
    border: none !important;
    border-radius: 4px !important;
    padding: 4px 8px !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
    text-align: right !important;
    white-space: nowrap !important;
  }
  
  @media (max-width: 768px) {
    .school-label {
      font-size: 10px !important;
      padding: 2px 6px !important;
    }
  }
  
  .school-label::before {
    border-left-color: rgba(220, 38, 38, 0.9) !important;
  }
  
  .shopping-center-label {
    background: rgba(37, 99, 235, 0.9) !important;
    color: white !important;
    border: none !important;
    border-radius: 4px !important;
    padding: 3px 6px !important;
    font-weight: 600 !important;
    font-size: 11px !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
  }
  
  @media (max-width: 768px) {
    .shopping-center-label {
      font-size: 9px !important;
      padding: 2px 4px !important;
    }
  }
  
  .shopping-center-label::before {
    border-right-color: rgba(37, 99, 235, 0.9) !important;
  }
`;

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = labelStyles;
  document.head.appendChild(styleElement);
}

// Fix for default markers in React + Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Create custom red icon for school
const SchoolIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41">
      <path fill="#dc2626" stroke="#b91c1c" stroke-width="1" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z"/>
      <circle fill="white" cx="12.5" cy="12.5" r="6"/>
    </svg>
  `),
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create custom blue icon for shopping center (smaller)
const ShoppingCenterIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 33" width="20" height="33">
      <path fill="#2563eb" stroke="#1d4ed8" stroke-width="1" d="M10 0C4.5 0 0 4.5 0 10c0 10 10 23 10 23s10-13 10-23C20 4.5 15.5 0 10 0z"/>
      <circle fill="white" cx="10" cy="10" r="5"/>
    </svg>
  `),
  shadowUrl: markerShadow,
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -28],
  shadowSize: [33, 33]
});

// Fix default icon (fallback)
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// School coordinates - Updated with actual MAIS coordinates
const SCHOOL_LOCATION = {
  lat: 47.90472102468745,
  lng: 106.98181731242366
};

// Shopping center coordinates
const SHOPPING_CENTER_LOCATION = {
  lat: 47.9060894682372,
  lng: 106.94623516069221
};

const SCHOOL_INFO = {
  name: "Mongol Aspiration International School",
  description: "Mongol Aspiration International School",
  address: "Ulaanbaatar, Mongolia", // Replace with actual address
  phone: "+976 77110139", // Actual MAIS phone number
  website: "https://mongolaspiration.com" // Replace with actual website
};

const SHOPPING_CENTER_INFO = {
  name: "Dunjingarav Shopping Center",
  description: "Shopping and commercial center"
};

const SchoolDirections = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${SCHOOL_LOCATION.lat},${SCHOOL_LOCATION.lng}`;
    window.open(url, '_blank');
  };

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Handle window resize for mobile orientation changes
    const handleResize = () => {
      if (mapInstanceRef.current) {
        setTimeout(() => {
          mapInstanceRef.current!.invalidateSize();
        }, 100);
      }
    };

    // Add a small delay to ensure DOM is ready, especially on mobile
    const initTimer = setTimeout(() => {
      if (!mapRef.current) return;

      // Calculate center point between school and shopping center
      const centerLat = (SCHOOL_LOCATION.lat + SHOPPING_CENTER_LOCATION.lat) / 2;
      const centerLng = (SCHOOL_LOCATION.lng + SHOPPING_CENTER_LOCATION.lng) / 2;      // Initialize the map
      const map = L.map(mapRef.current, {
        center: [centerLat, centerLng],
        zoom: window.innerWidth < 768 ? 13 : 15, // More zoomed out on mobile
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true,
        preferCanvas: false
      });// Add tile layer with better mobile options
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        crossOrigin: true,
        detectRetina: true,
        errorTileUrl: 'data:image/svg+xml;base64,' + btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="#f5f5f5"/>
            <text x="128" y="128" text-anchor="middle" font-size="14" fill="#999">Map tile unavailable</text>
          </svg>
        `)
      }).addTo(map);

      // Add error handling for tile loading
      tileLayer.on('tileerror', function(e) {
        console.warn('Tile loading error:', e);
        // Could try alternative tile server here if needed
      });

      // Force map to invalidate size after a short delay for mobile
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      // Create school marker with red icon
      const schoolMarker = L.marker([SCHOOL_LOCATION.lat, SCHOOL_LOCATION.lng], {
        icon: SchoolIcon,
        title: SCHOOL_INFO.name
      }).addTo(map);

      // Add permanent label for school
      schoolMarker.bindTooltip(SCHOOL_INFO.name, {
        permanent: true,
        direction: 'left',
        offset: [-10, -5],
        className: 'school-label'
      });

      // Add popup with school information
      schoolMarker.bindPopup(`
        <div style="text-align: center; padding: 8px; max-width: 250px;">
          <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: bold; color: #dc2626;">
            ${SCHOOL_INFO.name}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #374151; font-weight: 500;">
            ${SCHOOL_INFO.description}
          </p>
          <p style="margin: 0 0 5px 0; font-size: 13px; color: #64748b;">
            ${SCHOOL_INFO.address}
          </p>
          <p style="margin: 0 0 10px 0; font-size: 13px; color: #64748b;">
            ${SCHOOL_INFO.phone}
          </p>
          <button 
            onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${SCHOOL_LOCATION.lat},${SCHOOL_LOCATION.lng}', '_blank')"
            style="background: #dc2626; color: white; padding: 6px 12px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;"
          >
            Get Directions
          </button>
        </div>
      `);

      // Create shopping center marker with blue icon (smaller)
      const shoppingCenterMarker = L.marker([SHOPPING_CENTER_LOCATION.lat, SHOPPING_CENTER_LOCATION.lng], {
        icon: ShoppingCenterIcon,
        title: SHOPPING_CENTER_INFO.name
      }).addTo(map);

      // Add permanent label for shopping center
      shoppingCenterMarker.bindTooltip(SHOPPING_CENTER_INFO.name, {
        permanent: true,
        direction: 'right',
        offset: [8, -3],
        className: 'shopping-center-label'
      });

      // Add popup with shopping center information
      shoppingCenterMarker.bindPopup(`
        <div style="text-align: center; padding: 8px; max-width: 200px;">
          <h3 style="margin: 0 0 4px 0; font-size: 15px; font-weight: bold; color: #2563eb;">
            ${SHOPPING_CENTER_INFO.name}
          </h3>
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #374151;">
            ${SHOPPING_CENTER_INFO.description}
          </p>
          <button 
            onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${SHOPPING_CENTER_LOCATION.lat},${SHOPPING_CENTER_LOCATION.lng}', '_blank')"
            style="background: #2563eb; color: white; padding: 5px 10px; border: none; border-radius: 5px; cursor: pointer; font-size: 11px;"
          >
            Get Directions
          </button>
        </div>
      `);

      mapInstanceRef.current = map;
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleResize);
    }, 50);

    // Cleanup function
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

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
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">            {/* Map Container - Leaflet Implementation */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
              <div 
                ref={mapRef} 
                className="w-full h-full"
                style={{ 
                  minHeight: '256px',
                  position: 'relative',
                  zIndex: 1
                }}
              />
            </div>            {/* Additional Info Section */}
            <div className="p-4 sm:p-6 bg-gray-50">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{SCHOOL_INFO.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{SCHOOL_INFO.address}</p>
                  <p className="text-sm sm:text-base text-gray-600">{SCHOOL_INFO.phone}</p>
                </div>
                <button
                  onClick={openDirections}
                  className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base w-full md:w-auto"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SchoolDirections;
