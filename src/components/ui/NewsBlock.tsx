"use client"

import React from 'react'
import { BsThreeDots } from "react-icons/bs";

interface NewsBlockProps {
  title: string;
  onSettingsClick?: () => void;
}

const NewsBlock: React.FC<NewsBlockProps> = ({ title, onSettingsClick }) => {
  return (
    <div className="flex justify-between items-center p-2 my-2 bg-gray-50 rounded hover:bg-gray-100 w-full">
      <span className="text-sm font-medium truncate">{title}</span>
      <button 
        className="rounded-full hover:bg-gray-200 p-1"
        onClick={onSettingsClick}
        aria-label="News settings"
      >
        <BsThreeDots className="text-lg text-gray-600" />
      </button>
    </div>
  );
};

export default NewsBlock;