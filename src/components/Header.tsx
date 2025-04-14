import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/images/moments/profilepic/logo.png" 
            alt="4 U Sake" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl font-bold leading-tight">
              <span className="text-hibachi-red">4 U Sake</span>
            </h1>
            <p className="text-xs font-medium text-gray-600 -mt-1">Hibachi Catering</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-hibachi-red font-medium">Home</Link>
          <a href="#services" className="text-foreground hover:text-hibachi-red font-medium">Services</a>
          <a href="#pricing" className="text-foreground hover:text-hibachi-red font-medium">Pricing</a>

          <a href="#pricing" className="btn-primary">Book Now</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground hover:text-hibachi-red"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md animate-fade-in">
          <nav className="container py-4 flex flex-col space-y-4">
            <Link to="/" onClick={toggleMenu} className="text-foreground hover:text-hibachi-red font-medium py-2">Home</Link>
            <a href="#services" onClick={toggleMenu} className="text-foreground hover:text-hibachi-red font-medium py-2">Services</a>
            <a href="#pricing" onClick={toggleMenu} className="text-foreground hover:text-hibachi-red font-medium py-2">Pricing</a>
            <a href="#pricing" onClick={toggleMenu} className="btn-primary text-center">Book Now</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
