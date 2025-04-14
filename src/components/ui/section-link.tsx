import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToElement } from '@/utils/scrollUtils';

interface SectionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A custom link component that handles both regular navigation and hash navigation
 * If the link is a hash link and we're on the home page, it scrolls to the section
 * If the link is a hash link and we're not on the home page, it navigates to the home page with the hash
 */
const SectionLink: React.FC<SectionLinkProps> = ({ to, children, className, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Check if this is a hash link to a section on the home page
  const isHashLink = to.startsWith('/#');
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    
    if (isHashLink) {
      e.preventDefault();
      
      // Extract the section ID from the hash link
      const sectionId = to.substring(2); // Remove the '/#' prefix
      
      if (isHomePage) {
        // If already on home page, just scroll to the section
        scrollToElement(sectionId);
      } else {
        // If on another page, navigate to home page with the hash
        navigate(`/#${sectionId}`);
      }
    }
  };

  return (
    <Link 
      to={to} 
      className={className} 
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default SectionLink;