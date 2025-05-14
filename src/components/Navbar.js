"use client";

import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-gray-800 text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/#home" className="flex items-center space-x-2">
          <img src='piano-keyboard-svgrepo-com.svg' className="w-full h-auto max-w-[50px]"></img>
          <span className="text-xl font-bold ">Music Academy</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/#home" className="hover:text-indigo-200">Home</Link>
          <Link href="/#about" className="hover:text-indigo-200">About</Link>
          <Link href="/#services" className="hover:text-indigo-200">Services</Link>
          <Link href="/#testimonials" className="hover:text-indigo-200">Testimonials</Link>
          <Link href="/#pricing" className="hover:text-indigo-200">Pricing</Link>
          <Link href="/#contact" className="hover:text-indigo-200">Contact</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 mt-2 py-2 px-4">
          <div className="flex flex-col space-y-2">
            <Link href="/#home" className="hover:text-indigo-200 py-1" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/#about" className="hover:text-indigo-200 py-1" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/#services" className="hover:text-indigo-200 py-1" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link href="/#testimonials" className="hover:text-indigo-200 py-1" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
            <Link href="/#pricing" className="hover:text-indigo-200 py-1" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link href="/#contact" className="hover:text-indigo-200 py-1" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;