import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageLoader() {
  const [isLoading, setIsLoading] = useState(true); // Start with true for initial load
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Initial page load - wait for full preloader (3 seconds)
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 3000); // Match PageLoader duration

      return () => clearTimeout(timer);
    }

    // Subsequent route changes - shorter loader
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname, isInitialLoad]);

  return { isLoading, setIsLoading, isInitialLoad };
}

// Hook for component loading states
export function useComponentLoader(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading,
  };
}
