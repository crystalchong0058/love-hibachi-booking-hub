import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A custom hook that scrolls to the element specified by the hash in the URL
 * when the component mounts or when the location changes.
 */
export const useScrollToHash = () => {
  const location = useLocation();

  const scrollToElement = useCallback(() => {
    // If there's a hash in the URL
    if (location.hash) {
      // Get the element with the ID that matches the hash
      const element = document.getElementById(location.hash.substring(1));
      
      // If the element exists, scroll to it
      if (element) {
        // Use a small timeout to ensure the DOM is fully loaded
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 100, // Offset for header
            behavior: 'smooth'
          });
        }, 100);
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  useEffect(() => {
    scrollToElement();
  }, [location.pathname, location.hash, scrollToElement]);

  return null;
};