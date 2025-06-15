import React from "react";
import { useAtom } from "jotai";
import { Language, setLanguage, type LanguageType } from "../store/ThemeAtom";

const LanguageToggle: React.FC = () => {
  const [currentLanguage] = useAtom(Language);
  const [, setLang] = useAtom(setLanguage);

  const handleLanguageChange = (language: LanguageType) => {
    setLang(language);
  };  return (
    <div className="relative inline-flex items-center bg-white border border-gray-200 rounded-lg shadow-sm p-1">
      <button
        onClick={() => handleLanguageChange("en")}
        className={`relative z-10 flex items-center justify-center w-10 h-8 rounded-md transition-all duration-300 ${
          currentLanguage === "en"
            ? "bg-blue-500 shadow-md transform scale-105"
            : "hover:bg-gray-50"
        }`}
        title="Switch to English"
      >
        <img 
          src="/united-kingdom.png" 
          alt="English" 
          className={`w-6 h-4 object-cover rounded-sm transition-all duration-300 ${
            currentLanguage === "en" ? "brightness-110" : "opacity-70 hover:opacity-100"
          }`}
        />
      </button>
      <button
        onClick={() => handleLanguageChange("mn")}
        className={`relative z-10 flex items-center justify-center w-10 h-8 rounded-md transition-all duration-300 ${
          currentLanguage === "mn"
            ? "bg-blue-500 shadow-md transform scale-105"
            : "hover:bg-gray-50"
        }`}
        title="Монгол руу шилжүүлэх"
      >
        <img 
          src="/mongolian.png" 
          alt="Mongolian" 
          className={`w-6 h-4 object-cover rounded-sm transition-all duration-300 ${
            currentLanguage === "mn" ? "brightness-110" : "opacity-70 hover:opacity-100"
          }`}
        />
      </button>
    </div>
  );
};

export default LanguageToggle;
