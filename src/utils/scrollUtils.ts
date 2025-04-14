/**
 * Scrolls to a specific element on the page by ID with smooth behavior
 * @param elementId The ID of the element to scroll to (without the # symbol)
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * Handles navigation to a section on the home page
 * If already on the home page, scrolls to the section
 * If on another page, navigates to the home page with the hash
 * @param sectionId The ID of the section to navigate to (without the # symbol)
 * @param navigate The navigate function from useNavigate
 * @param isHomePage Boolean indicating if currently on the home page
 */
export const navigateToSection = (
  sectionId: string, 
  navigate: (path: string) => void, 
  isHomePage: boolean
): void => {
  if (isHomePage) {
    // If already on home page, just scroll to the section
    scrollToElement(sectionId);
  } else {
    // If on another page, navigate to home page with the hash
    navigate(`/#${sectionId}`);
  }
};