import { useState, useMemo } from 'react';
import WorldMap from 'react-svg-worldmap';
import type { CountryContext } from 'react-svg-worldmap';
import { AnimatePresence } from 'framer-motion';
import { getCountryAlumniData, getUniversitiesByCountry } from '../data/alumniData';
import AlumniPopup from './ui/AlumniPopup';
import AlumniPostersSlider from './ui/AlumniPostersSlider';

interface CountryData {
  country: string;
  value: number;
  color?: string;
}

// Generate country data with strategically assigned colors to avoid similar colors for adjacent countries
// Excludes Mongolia (MN) since the school is located there - this is for showing abroad alumni only
const generateCountryData = (): CountryData[] => {
  const countryAlumniData = getCountryAlumniData();
    // Enhanced color palette with better contrast and more distinct colors
  const distinctColors = [
    "#E53E3E", // Red
    "#3182CE", // Blue  
    "#38A169", // Green
    "#D69E2E", // Orange
    "#805AD5", // Purple
    "#DD6B20", // Deep Orange
    "#319795", // Teal
    "#D53F8C", // Magenta
    "#2D3748", // Dark Gray
    "#C53030", // Dark Red
    "#2B6CB0", // Dark Blue
    "#276749", // Dark Green
    "#B7791F", // Dark Orange
    "#553C9A", // Dark Purple
    "#C05621", // Brown
    "#2C7A7B", // Dark Teal
    "#97266D", // Dark Pink
    "#4A5568", // Slate
    "#9C4221", // Rust
    "#1A365D", // Navy
    "#22543D", // Forest Green
    "#744210", // Bronze
    "#44337A", // Indigo
    "#2A4365"  // Steel Blue
  ];

  // Define geographical regions to ensure neighboring countries get contrasting colors
  const regionColorAssignment: { [key: string]: string } = {
    // North America - Cool colors
    "US": distinctColors[1], // Blue
    "CA": distinctColors[6], // Teal
    
    // Europe - Warm colors, distributed to avoid clustering
    "GB": distinctColors[0], // Red
    "DE": distinctColors[4], // Purple
    "FR": distinctColors[3], // Orange
    "IT": distinctColors[7], // Magenta
    "ES": distinctColors[5], // Deep Orange
    "AT": distinctColors[12], // Dark Orange
    "PL": distinctColors[11], // Dark Green
    "CZ": distinctColors[14], // Brown
    "HU": distinctColors[16], // Dark Pink
    "RO": distinctColors[18], // Rust
    "UA": distinctColors[10], // Dark Blue
    "TR": distinctColors[22], // Indigo
    
    // Asia-Pacific - Mixed colors to separate from Europe
    "CN": distinctColors[2], // Green
    "JP": distinctColors[8], // Dark Gray
    "KR": distinctColors[3], // Dark Purple
    "TW": distinctColors[15], // Dark Teal
    "HK": distinctColors[19], // Navy
    "KG": distinctColors[21], // Bronze
    "RU": distinctColors[23], // Steel Blue
    
    // Oceania
    "AU": distinctColors[9], // Dark Red
  };

  // Filter out Mongolia (MN) since this map shows abroad alumni only
  return countryAlumniData
    .filter((countryData) => countryData.countryCode !== 'MN')
    .map((countryData) => ({
      country: countryData.countryCode,
      value: countryData.totalAlumni,
      color: regionColorAssignment[countryData.countryCode] || distinctColors[0]
    }));
};

const countryData: CountryData[] = generateCountryData();

const countryNames: { [key: string]: string } = {
  "US": "United States",
  "GB": "United Kingdom", 
  "CN": "China",
  "AU": "Australia",
  "CA": "Canada",
  "DE": "Germany",
  "FR": "France",
  "JP": "Japan",
  "KR": "South Korea",
  "MN": "Mongolia",
  "AT": "Austria",
  "HK": "Hong Kong",
  "IT": "Italy",
  "KG": "Kyrgyzstan",
  "PL": "Poland",
  "RO": "Romania",
  "RU": "Russia",
  "ES": "Spain",
  "TW": "Taiwan",
  "TR": "Turkey",
  "UA": "Ukraine",
  "CZ": "Czech Republic",
  "HU": "Hungary"
};

const WorldMapComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Enhanced custom styles for WorldMap to fill container and center
  const worldMapStyles = `
    .world-map-container {
      position: relative !important;
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
      background: transparent !important;
    }
    
    .world-map-container > figure {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    
    .world-map-container svg {
      max-width: 100% !important;
      max-height: 100% !important;
      width: auto !important;
      height: 100% !important;
      object-fit: contain !important;
    }
  `;

  // Filter country data based on search term
  const filteredCountryData = useMemo(() => {
    if (searchTerm === '') return countryData;
    
    return countryData.filter(country => {
      const countryName = countryNames[country.country] || country.country;
      const universities = getUniversitiesByCountry(country.country);
      
      return countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             universities.some(uni => uni.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [searchTerm]);

  const getTooltipContent = (ctx: CountryContext) => {
    const data = filteredCountryData.find(item => item.country === ctx.countryCode);
    if (data) {
      return `${countryNames[ctx.countryCode] || ctx.countryCode}: ${data.value} ${data.value === 1 ? 'alumnus' : 'alumni'}`;
    }
    return "";
  };

  const handleCountryClick = (ctx: CountryContext) => {
    // Check if we have alumni data for this country
    const data = filteredCountryData.find(item => item.country === ctx.countryCode);
    if (data && data.value > 0) {
      setSelectedCountry(ctx.countryCode);
    }
  };

  const handleClosePopup = () => {
    setSelectedCountry(null);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
  };
  // Get universities for selected country
  const selectedCountryUniversities = useMemo(() => {
    if (!selectedCountry) return [];
    return getUniversitiesByCountry(selectedCountry);
  }, [selectedCountry]);

  return (
    <>
      {/* Custom styles for WorldMap SVG stretching */}
      <style dangerouslySetInnerHTML={{ __html: worldMapStyles }} />
      
      <div className="relative w-full bg-gradient-to-br from-green-50 to-green-100 rounded-xl overflow-hidden p-4 md:p-8 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Global Alumni Network</h2>
        
        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Countries or Universities
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by country or university name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Reset Button */}
            <div className="flex items-end">
              <button
                className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleResetFilters}
              >
                Reset Search
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 min-h-[500px]">
          {/* Left Panel - World Map (takes 2/3 of the width) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm h-full overflow-hidden">
            <div className="w-full h-full">
              {filteredCountryData.length > 0 ? (
                <div className="w-full h-full world-map-container">
                  <WorldMap
                    color="red"
                    title=""
                    valueSuffix="alumni"
                    size="responsive"
                    data={filteredCountryData}
                    tooltipTextFunction={getTooltipContent}
                    onClickFunction={handleCountryClick}
                    styleFunction={(ctx: CountryContext) => {
                      const countryInfo = filteredCountryData.find(item => item.country === ctx.countryCode);
                      return {
                        fill: countryInfo?.color || "#F3F4F6",
                        stroke: "#E5E7EB",
                        strokeWidth: 0.5,
                        cursor: countryInfo ? 'pointer' : 'default',
                        hover: {
                          fill: countryInfo?.color ? `${countryInfo.color}dd` : "#E5E7EB",
                          outline: "none",
                          strokeWidth: 1,
                          stroke: "#000"
                        }
                      };
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No countries match your search</h4>
                  <p className="text-gray-500 mb-4">Try searching for a different country or university</p>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    onClick={handleResetFilters}
                  >
                    Reset Search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Statistics and Info (takes 1/3 of the width) */}
          <div className="lg:col-span-1 flex flex-col space-y-6 h-full">            {/* Alumni Stats */}
            <div className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Alumni Statistics</h3>              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <p className="text-xl font-bold text-blue-600">{filteredCountryData.reduce((sum, country) => sum + country.value, 0)}</p>
                  <p className="text-xs text-gray-600 mt-1">Alumni Abroad</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <p className="text-xl font-bold text-green-600">{filteredCountryData.length}</p>
                  <p className="text-xs text-gray-600 mt-1">Countries</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <p className="text-xl font-bold text-purple-600">{filteredCountryData.reduce((sum, country) => sum + getUniversitiesByCountry(country.country).length, 0)}</p>
                  <p className="text-xs text-gray-600 mt-1">Universities</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <p className="text-xl font-bold text-orange-600">{searchTerm ? filteredCountryData.length : countryData.length}</p>
                  <p className="text-xs text-gray-600 mt-1">Showing Countries</p>
                </div>
              </div>
            </div>            {/* Top Countries */}
            {filteredCountryData.length > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-sm flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Top Destinations</h3>
                <div className="space-y-2">
                  {filteredCountryData
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={item.country} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-400 w-6">#{index + 1}</span>
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="font-medium text-gray-800 text-sm">{countryNames[item.country] || item.country}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-600">{item.value}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>        </div>

        {/* Alumni Posters Slider - Full Width Section */}
        <AlumniPostersSlider />

        {/* Popup dialog */}
        <AnimatePresence>
          {selectedCountry && (
            <AlumniPopup
              universities={selectedCountryUniversities}
              countryName={countryNames[selectedCountry] || selectedCountry}
              onClose={handleClosePopup}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default WorldMapComponent;
