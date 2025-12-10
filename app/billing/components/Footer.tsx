import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 font-sans text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Logo and Address */}
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-white font-bold text-lg">H</div>
                <span className="font-bold text-xl tracking-tight text-gray-900">Health Samurai</span>
             </div>
             <div className="text-sm space-y-2">
               <p>1891 N Gaffey St Ste O,</p>
               <p>San Pedro, CA 90731</p>
               <p>+1 (818) 731-1279</p>
               <a href="mailto:hello@health-samurai.io" className="text-red-600 hover:underline">hello@health-samurai.io</a>
             </div>
             <div className="flex space-x-4 mt-6">
                {/* Social Icons (Placeholders) */}
                <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">GitHub</span>GH</a>
                <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">LinkedIn</span>LI</a>
                <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Twitter</span>TW</a>
                <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Facebook</span>FB</a>
             </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Products</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox FHIR Server</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Fhirbase</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">HL7v2 to FHIR Converter</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">C-CDA to FHIR Converter</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox Forms</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox Terminology</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox MPI</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox Analytics</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Auth Server</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox for Startups</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox for Data Platforms</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Telemed development toolkit</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">EHR development toolkit</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">ONC-certified API tools</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">FHIR API for Payers</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox for IoMT vendors</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Services</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-600 transition-colors">Training</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Consulting</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Docs & Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Downloads</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Events and Webinars</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Release Notes</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox Bug Tracker</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox Docs</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Fhirbase Docs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">News</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Advisory Board</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">Aidbox Partner Network</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors font-bold mt-4">Pricing</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 Health Samurai. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
             <a href="#" className="hover:text-red-600">Privacy Policy</a>
             <a href="#" className="hover:text-red-600">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
