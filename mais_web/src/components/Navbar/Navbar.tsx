import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu/Menu";
import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Collapse } from "@mui/material";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  // Check if we're on the admin/publish page
  const isAdminPublish = location.pathname.includes('/admin') && location.pathname.includes('/publish');
  
  // Conditionally add shadow based on current route
  const shadowClass = isAdminPublish ? '' : 'shadow-md';

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchValue("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={`relative w-full ${shadowClass} z-20 fixed top-0`}>
      <div className={`flex flex-row justify-between items-center w-full h-14 border bg-white dark:bg-gray-100 pl-4 sm:pl-8 pr-4 sm:pr-8 py-2`}>
        {/* Left Side - Search */}
        <div className="flex flex-row items-center flex-1">
          {/* Desktop Search - Always visible on larger screens */}
          <div className="hidden sm:flex flex-row items-center">
            <div className="h-7 border-l p-1 bg-gray-50 border-t border-b border-gray-500 rounded-l-md flex items-center justify-center">
              <IconContext.Provider value={{ size: "1.2em" }}>
                <IoSearch />
              </IconContext.Provider>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
              className="h-7 w-40 border-t border-r border-b border-gray-500 rounded-r-md pl-2 focus:outline-none"
            />
          </div>

          {/* Mobile Search - Icon only, expandable */}
          <div className="sm:hidden">
            <button
              onClick={handleSearchToggle}
              className="h-8 w-8 bg-gray-50 border border-gray-500 rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <IconContext.Provider value={{ size: "1.2em" }}>
                {isSearchExpanded ? <IoClose /> : <IoSearch />}
              </IconContext.Provider>
            </button>
          </div>
        </div>

        {/* Center - Logo and School Name */}
        <div className={`flex flex-row items-center justify-center flex-1 transition-all duration-300 ${isSearchExpanded ? 'sm:flex hidden' : 'flex'}`}>
          <Link to="/" className="flex flex-row items-center hover:cursor-pointer">
            <div className="w-8 h-8 sm:w-10 sm:h-10">
              <img src="/mais_logo_light.png" alt="logo" className="w-full h-full"/>
            </div>            <span className="text-lg sm:text-xl ml-2 font-medium hidden min-[400px]:block">
              MONGOL ASPIRATION
            </span>
          </Link>
        </div>

        {/* Right Side - Menu */}
        <div className="flex flex-row justify-end flex-1">
          <Menu />
        </div>
      </div>

      {/* Mobile Expanded Search Bar */}
      <Collapse in={isSearchExpanded} timeout={300}>
        <div className="sm:hidden bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex flex-row items-center">
            <div className="h-8 border-l p-1 bg-gray-50 border-t border-b border-gray-500 rounded-l-md flex items-center justify-center">
              <IconContext.Provider value={{ size: "1.2em" }}>
                <IoSearch />
              </IconContext.Provider>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleSearchChange}
              className="h-8 flex-1 border-t border-r border-b border-gray-500 rounded-r-md pl-2 focus:outline-none"
              autoFocus
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Navbar;
