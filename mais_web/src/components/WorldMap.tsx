import { useState, useMemo } from 'react';
import WorldMap from 'react-svg-worldmap';
import type { CountryContext } from 'react-svg-worldmap';
import { AnimatePresence, motion } from 'framer-motion';
import { alumniData } from '../data/alumniData';
import AlumniPopup from './ui/AlumniPopup';

interface CountryData {
  country: string;
  value: number;
  color?: string;
}

const countryData: CountryData[] = [
  {
    country: "US",
    value: 3,
    color: "#4287f5"
  },
  {
    country: "GB",
    value: 2,
    color: "#41e086"
  },
  {
    country: "CN",
    value: 2,
    color: "#f542b9"
  },
  {
    country: "DE",
    value: 2,
    color: "#f5a142"
  },
  {
    country: "AU",
    value: 1,
    color: "#42b0f5"
  },
  {
    country: "JP",
    value: 1,
    color: "#f5a142"
  },
  {
    country: "CA",
    value: 1,
    color: "#f54242"
  },
  {
    country: "FR",
    value: 1,
    color: "#42f5d1"
  },
  {
    country: "KR",
    value: 1,
    color: "#b042f5"
  }
];

const countryNames: { [key: string]: string } = {
  "US": "United States",
  "DE": "Germany",
  "CN": "China",
  "BR": "Brazil",
  "AU": "Australia",
  "IN": "India",
  "FR": "France",
  "GB": "United Kingdom",
  "CA": "Canada",
  "JP": "Japan",
  "KR": "South Korea",
  // Add more country names as needed
};

// Get unique fields of study from alumni data
const getUniqueFields = () => {
  const fields = alumniData.map(alumni => alumni.major);
  return Array.from(new Set(fields));
};

// Get graduation years range
const getGraduationYears = () => {
  const years = alumniData.map(alumni => alumni.graduationYear);
  return Array.from(new Set(years)).sort();
};

const WorldMapComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const uniqueFields = useMemo(() => getUniqueFields(), []);
  const graduationYears = useMemo(() => getGraduationYears(), []);

  // Filter alumni data based on selected filters
  const filteredAlumniData = useMemo(() => {
    return alumniData.filter(alumni => {
      const matchesSearch = searchTerm === '' || 
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.major.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesField = selectedField === 'all' || alumni.major === selectedField;
      const matchesYear = selectedYear === 'all' || alumni.graduationYear.toString() === selectedYear;
      
      return matchesSearch && matchesField && matchesYear;
    });
  }, [searchTerm, selectedField, selectedYear]);

  // Create filtered country data for the map
  const filteredCountryData = useMemo(() => {
    const countryCounter: Record<string, number> = {};
    
    filteredAlumniData.forEach(alumni => {
      countryCounter[alumni.countryCode] = (countryCounter[alumni.countryCode] || 0) + 1;
    });
    
    return countryData.map(country => ({
      ...country,
      value: countryCounter[country.country] || 0
    })).filter(country => country.value > 0);
  }, [filteredAlumniData]);

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
    setSelectedField('all');
    setSelectedYear('all');
  };

  // Get filtered alumni for selected country
  const selectedCountryAlumni = useMemo(() => {
    if (!selectedCountry) return [];
    return filteredAlumniData.filter(alumni => alumni.countryCode === selectedCountry);
  }, [selectedCountry, filteredAlumniData]);

  // Calculate statistics
  const totalFilteredAlumni = filteredAlumniData.length;
  const totalCountries = filteredCountryData.length;
  
  // Count universities
  const universities = useMemo(() => {
    const unis = filteredAlumniData.map(alumni => alumni.university);
    return new Set(unis).size;
  }, [filteredAlumniData]);
  
  // Count fields of study
  const fieldsOfStudy = useMemo(() => {
    const fields = filteredAlumniData.map(alumni => alumni.major);
    return new Set(fields).size;
  }, [filteredAlumniData]);  return (
    <div className="relative w-full bg-gradient-to-br from-green-50 to-green-100 rounded-xl overflow-hidden p-4 md:p-8 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 text-center">Global Alumni Network</h2>
      
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search Alumni
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, university..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Field of Study Filter */}
          <div>
            <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study
            </label>
            <select
              id="field"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
            >
              <option value="all">All Fields</option>
              {uniqueFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
          
          {/* Graduation Year Filter */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year
            </label>
            <select
              id="year"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="all">All Years</option>
              {graduationYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
          </div>
          
          {/* Reset Button */}
          <div className="flex items-end">
            <button
              className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left Panel - World Map */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Interactive World Map</h3>
          <div className="w-full h-[400px] lg:h-[500px]">
            {filteredCountryData.length > 0 ? (
              <div className="w-full h-full">
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
                <h4 className="text-lg font-medium text-gray-700 mb-2">No alumni match your filters</h4>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  onClick={handleResetFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Map Legend */}
          {filteredCountryData.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-medium mb-3 text-gray-700 text-center">Click on a colored country to see alumni details</p>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                {filteredCountryData.map((item) => (
                  <motion.div 
                    key={item.country} 
                    className="flex items-center bg-gray-50 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedCountry(item.country)}
                  >
                    <div 
                      className="w-4 h-4 rounded-sm mr-3 flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-700 font-medium">{countryNames[item.country] || item.country}</span>
                    <span className="ml-auto text-sm text-gray-600 font-semibold">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Statistics and Info */}
        <div className="space-y-6">
          {/* Alumni Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Alumni Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{totalFilteredAlumni}</p>
                <p className="text-sm text-gray-600 mt-1">Total Alumni Abroad</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{totalCountries}</p>
                <p className="text-sm text-gray-600 mt-1">Countries</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">{universities}</p>
                <p className="text-sm text-gray-600 mt-1">Universities</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">{fieldsOfStudy}</p>
                <p className="text-sm text-gray-600 mt-1">Fields of Study</p>
              </div>
            </div>
          </div>

          {/* Top Countries */}
          {filteredCountryData.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Destinations</h3>
              <div className="space-y-3">
                {filteredCountryData
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={item.country} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-gray-400 w-6">#{index + 1}</span>
                        <div 
                          className="w-3 h-3 rounded-full mr-3" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="font-medium text-gray-800">{countryNames[item.country] || item.country}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-600">{item.value}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Quick Actions or Additional Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Info</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Click on any country to view detailed alumni information
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Use filters above to narrow down your search
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Statistics update in real-time based on your filters
              </div>
            </div>
          </div>
        </div>
      </div>      
      {/* Popup dialog */}
      <AnimatePresence>
        {selectedCountry && (
          <AlumniPopup
            alumni={selectedCountryAlumni}
            countryName={countryNames[selectedCountry] || selectedCountry}
            onClose={handleClosePopup}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorldMapComponent;