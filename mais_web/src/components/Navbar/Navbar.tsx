import React from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu/Menu";
import LanguageToggle from "../LanguageToggle";
import { useCommonTranslation } from "../../translations/useTranslation";

const Navbar: React.FC = () => {
  const { t } = useCommonTranslation();
  const location = useLocation();
  
  // Check if we're on the admin/publish page
  const isAdminPublish = location.pathname.includes('/admin') && location.pathname.includes('/publish');
  
  // Conditionally add shadow based on current route
  const shadowClass = isAdminPublish ? '' : 'shadow-md';
  return (
    <div className={`relative w-full ${shadowClass} z-20 fixed top-0`}>
      <div className={`flex flex-row justify-between items-center w-full h-14 border bg-white dark:bg-gray-100 pl-4 sm:pl-8 pr-4 sm:pr-8 py-2`}>
        {/* Left Side - Language Toggle */}
        <div className="flex flex-row items-center flex-1">
          <LanguageToggle />
        </div>

        {/* Center - Logo and School Name */}
        <div className="flex flex-row items-center justify-center flex-1">
          <Link to="/" className="flex flex-row items-center hover:cursor-pointer">
            <div className="w-8 h-8 sm:w-10 sm:h-10 hidden sm:block">
              <img src="/mais_logo_light.png" alt="logo" className="w-full h-full"/>
            </div>            <span className="text-lg sm:text-xl text-center ml-2 font-medium hidden min-[400px]:block">
              {t?.school.name?.toUpperCase() || "MONGOL ASPIRATION"}
            </span>
          </Link>
        </div>

        {/* Right Side - Menu */}
        <div className="flex flex-row justify-end flex-1">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
