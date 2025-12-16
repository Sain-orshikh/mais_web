import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React + Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Fix default icon
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

interface WorldMapLeafletProps {
  className?: string;
}

const WorldMapLeaflet: React.FC<WorldMapLeafletProps> = ({ className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // School coordinates: MAIS, Mongolia
    const schoolLat = 47.90472102468745;
    const schoolLng = 106.98181731242366;

    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [schoolLat, schoolLng],
      zoom: 17,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      touchZoom: true
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    // Create custom school marker
    const schoolMarker = L.marker([schoolLat, schoolLng], {
      title: 'Mongol Aspiration International School'
    }).addTo(map);

    // Add popup with school information
    schoolMarker.bindPopup(`
      <div style="text-align: center; padding: 5px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #2563eb;">
          Mongol Aspiration International School
        </h3>
        <p style="margin: 0 0 5px 0; font-size: 14px; color: #64748b;">
          Excellence in Education
        </p>
        <p style="margin: 0; font-size: 12px; color: #64748b;">
          📍 Ulaanbaatar, Mongolia
        </p>
      </div>
    `);

    // Optional: Add a circle to highlight the school area
    L.circle([schoolLat, schoolLng], {
      color: '#2563eb',
      fillColor: '#3b82f6',
      fillOpacity: 0.1,
      radius: 100 // 100 meters radius
    }).addTo(map);

    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[300px] rounded-lg overflow-hidden shadow-lg"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
};

export default WorldMapLeaflet;
