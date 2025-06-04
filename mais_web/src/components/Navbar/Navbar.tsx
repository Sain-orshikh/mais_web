import React from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu/Menu";
import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  // Check if we're on the admin/publish page
  const isAdminPublish = location.pathname.includes('/admin') && location.pathname.includes('/publish');
  
  // Conditionally add shadow based on current route
  const shadowClass = isAdminPublish ? '' : 'shadow-md';

  return (
    <div className={`flex flex-row justify-between items-center w-full h-14 border bg-white dark:bg-gray-100 pl-8 pr-8 py-2 ${shadowClass} z-20 fixed top-0`}>      {/* Left Side - Search */}
      <div className="flex flex-row items-center flex-1">
        <div className="flex flex-row items-center">
          <div className="h-7 border-l p-1 bg-gray-50 border-t border-b border-gray-500 rounded-l-md flex items-center justify-center">
            <IconContext.Provider value={{ size: "1.2em" }}>
              <IoSearch />
            </IconContext.Provider>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="h-7 w-40 border-t border-r border-b border-gray-500 rounded-r-md pl-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Center - Logo and School Name */}
      <div className="flex flex-row items-center justify-center flex-1">
        <Link to="/" className="flex flex-row items-center hover:cursor-pointer">
          <div className="w-10 h-10">
            <img src="/mais_logo_light.png" alt="logo" className="w-10"/>
          </div>          <span className="text-xl ml-2 font-medium">
            MONGOL ASPIRATION
          </span>
        </Link>
      </div>

      {/* Right Side - Menu */}
      <div className="flex flex-row justify-end flex-1">
        <Menu />
      </div>
      
    </div>
  );
};

export default Navbar;
