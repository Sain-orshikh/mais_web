import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'

import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile";
import Home from "./components/Home";

// Pre-load TipTap core components to avoid duplication
const preloadTipTapCore = () => import("@tiptap/react");

// Lazy load the components that use TipTap editor with improved naming to help with webpack chunks
const NewsPage = lazy(() => {
  console.time("NewsPage-load");
  return Promise.all([
    import("./components/News"),
    preloadTipTapCore() // Ensure TipTap core is loaded beforehand
  ])
    .then(([moduleExport]) => {
      console.timeEnd("NewsPage-load");
      return moduleExport;
    });
});

const EditNewsPage = lazy(() => {
  console.time("EditNewsPage-load");
  return Promise.all([
    import("./components/Admin/News/Edit"),
    preloadTipTapCore() // Ensure TipTap core is loaded beforehand
  ])
    .then(([moduleExport]) => {
      console.timeEnd("EditNewsPage-load");
      return moduleExport;
    });
});

const AdminPage = lazy(() => import("./components/Admin/AdminPage"));
const CreatePage = lazy(() => import("./components/Admin/Management/CreateUser"));

// Loading component for Suspense fallback
const LoadingComponent = () => (
  <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  </div>
);

function App() {
  // Add performance measurement for initial page load
  useEffect(() => {
    // This will help identify slow loading components
    const loadTime = performance.now();
    console.log(`Initial page load completed in ${loadTime}ms`);
    
    // Add listener for when everything is fully loaded including images
    window.addEventListener('load', () => {
      const fullLoadTime = performance.now();
      console.log(`Full page load completed in ${fullLoadTime}ms`);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      <div className="pt-14">
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Profile />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/create" element={<CreatePage />} />
            <Route path="/admin/publish" element={<EditNewsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
      <Toaster/>
    </div>
  )
}

export default App
