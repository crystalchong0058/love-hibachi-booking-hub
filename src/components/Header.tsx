import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionLink from './ui/section-link';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import BookingModal from './BookingModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container py-4 flex justify-between items-center pl-4">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/images/moments/profilepic/logo.png" 
            alt="4 U Sake Hibachi Logo" 
            className="w-24 h-24 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold leading-tight">
              <span className="text-hibachi-red">4 U Sake Hibachi</span>
            </h1>
            <p className="text-sm font-medium text-gray-600 -mt-1">Professional Hibachi Service</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-hibachi-red font-medium">Home</Link>
          <SectionLink to="/#services" className="text-foreground hover:text-hibachi-red font-medium">Services</SectionLink>
          <SectionLink to="/#pricing" className="text-foreground hover:text-hibachi-red font-medium">Pricing</SectionLink>
          <Link to="/faq" className="text-foreground hover:text-hibachi-red font-medium">FAQ</Link>
          <Link to="/contact" className="text-foreground hover:text-hibachi-red font-medium">Contact Us</Link>
          <SectionLink to="/#testimonials" className="text-foreground hover:text-hibachi-red font-medium">Reviews</SectionLink>

          <button onClick={handleOpenModal} className="btn-primary">Book Now</button>
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
            <SectionLink to="/#services" onClick={toggleMenu} className="text-foreground hover:text-hibachi-red font-medium py-2">Services</SectionLink>
            <SectionLink to="/#pricing" onClick={toggleMenu} className="text-foreground hover:text-hibachi-red font-medium py-2">Pricing</SectionLink>
            <Link to="/faq" onClick={toggleMenu} className="text-foreground hover:text-hibachi-red font-medium py-2">FAQ</Link>
            <Link to="/contact" onClick={toggleMenu} className="text-foreground hover:text-hibachi-red font-medium py-2">Contact Us</Link>
            <SectionLink to="/#testimonials" onClick={toggleMenu} className="text-foreground hover:text-hibachi-red font-medium py-2">Reviews</SectionLink>
            <button onClick={() => { handleOpenModal(); toggleMenu(); }} className="btn-primary text-center">Book Now</button>
          </nav>
        </div>
      )}

      {/* Booking Modal */}
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl">
          <BookingModal setIsModalOpen={setIsModalOpen} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
