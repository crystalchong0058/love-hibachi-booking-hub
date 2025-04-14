import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToElement } from '@/utils/scrollUtils';

/**
 * ScrollToTop component that handles:
 * 1. Scrolling to the top of the page on route changes
 * 2. Scrolling to the correct section when navigating to a URL with a hash
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, scroll to that section
    if (hash) {
      // Remove the # character
      const id = hash.substring(1);
      
      // Add a small delay to ensure the DOM is fully loaded
      setTimeout(() => {
        scrollToElement(id);
      }, 100);
    } else {
      // Otherwise, scroll to the top of the page
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]); // Re-run when location changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;