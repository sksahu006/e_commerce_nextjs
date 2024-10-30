"use client"; 
import { useEffect, useState } from "react";

const LoadingSpinner = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Listen to route change events
    const handleRouteChange = (url: string) => {
      handleStart();
      // Simulate loading delay (if necessary)
      setTimeout(handleComplete, 1000); // Adjust the delay as needed
    };

    // Attach the event listeners
    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("popstate", handleComplete); // For back/forward navigation

    return () => {
      // Cleanup event listeners
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("popstate", handleComplete);
    };
  }, []);

  if (!loading) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="loader border-8 border-t-8 border-l-8 border-r-8  border-l-blue-500  border-r-blue-500 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
