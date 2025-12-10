import React, { useState } from 'react';
import Link from 'next/link';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
             <span className="font-bold text-xl tracking-tight text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-white font-bold text-lg">H</div>
                Health Samurai
             </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {/* Products Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-600 hover:text-gray-900 font-medium inline-flex items-center"
                onMouseEnter={() => setActiveDropdown('products')}
                onClick={() => toggleDropdown('products')}
              >
                Products
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              
              <div 
                className={`absolute left-0 mt-2 w-screen max-w-md bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${activeDropdown === 'products' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="p-8 grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">FHIR SERVER</h3>
                    <ul className="space-y-4">
                      <li>
                        <a href="#" className="block group">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-red-600">FHIR Server</p>
                          <p className="text-xs text-gray-500">Powerful backend for digital health developers</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block group">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-red-600">Fhirbase</p>
                          <p className="text-xs text-gray-500">Open source FHIR-native database</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block group">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-red-600">Auditbox</p>
                          <p className="text-xs text-gray-500">FHIR-native Audit Record Repository</p>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">MODULES</h3>
                    <ul className="space-y-4">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Aidbox Forms</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Aidbox Terminology</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Aidbox MPI</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Auth Server</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Aidbox E-Prescription</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-600 hover:text-gray-900 font-medium inline-flex items-center"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onClick={() => toggleDropdown('solutions')}
              >
                Solutions
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
               <div 
                className={`absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${activeDropdown === 'solutions' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="p-6">
                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">DEVELOPMENT</h3>
                   <ul className="space-y-3">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Aidbox for Startups</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Aidbox for Data Platforms</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Telemed development toolkit</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">EHR development toolkit</a></li>
                   </ul>
                   <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 mt-6">COMPLIANCE</h3>
                   <ul className="space-y-3">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">ONC-certified API tools</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">FHIR API for Payers - CMS</a></li>
                   </ul>
                </div>
              </div>
            </div>

            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Services</a>

            {/* Docs & Resources Dropdown */}
             <div className="relative group">
              <button 
                className="text-gray-600 hover:text-gray-900 font-medium inline-flex items-center"
                onMouseEnter={() => setActiveDropdown('docs')}
                onClick={() => toggleDropdown('docs')}
              >
                Docs & Resources
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
               <div 
                className={`absolute left-0 mt-2 w-56 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${activeDropdown === 'docs' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="p-6">
                   <ul className="space-y-3">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Blog</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Downloads</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Case Studies</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Events and Webinars</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Release Notes</a></li>
                      <li className="border-t pt-3"><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Aidbox Docs</a></li>
                   </ul>
                </div>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="relative group">
              <button 
                className="text-gray-600 hover:text-gray-900 font-medium inline-flex items-center"
                onMouseEnter={() => setActiveDropdown('company')}
                onClick={() => toggleDropdown('company')}
              >
                Company
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div 
                className={`absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${activeDropdown === 'company' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="p-6">
                   <ul className="space-y-3">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">About us</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Careers</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">News</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Advisory Board</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-red-600 block">Contact us</a></li>
                   </ul>
                </div>
              </div>
            </div>

            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
          </nav>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
             <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">Log in</a>
             <a href="#" className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded text-sm font-medium transition-colors">
               Sign up for free
             </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Products</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Solutions</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Services</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Docs & Resources</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Company</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Pricing</a>
             <div className="mt-4 border-t pt-4">
               <a href="#" className="block w-full text-center px-4 py-3 bg-black text-white rounded font-medium">Sign up for free</a>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};
