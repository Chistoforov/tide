'use client';

import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
               <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800 mb-6">
                 <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                 <span>Built on FHIR & Surescripts-ready</span>
               </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                Launch your e-prescription module fast
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                Build a compliant, scalable eRx solution in days with Aidbox. FHIR-native, certification-ready, and built for seamless Surescripts integration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                  Book a Call
                </button>
                <button className="bg-white text-gray-900 border border-gray-300 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors">
                  Documentation
                </button>
              </div>
            </div>
          </div>
          
          {/* Abstract Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-gray-50 to-white -z-10 pointer-events-none hidden lg:block">
             <div className="absolute top-20 right-20 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50"></div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Aidbox E-Prescription — a module for managing electronic prescriptions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl">
                Modern solution for healthcare organizations compliant with strict industry standards
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6 text-red-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">FHIR-native</h3>
                <p className="text-gray-600">Direct mappings to FHIR — no manual configuration needed</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">NCPDP-compliant</h3>
                <p className="text-gray-600">Fully compliant with NCPDP standard for e-prescriptions</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                 </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Integration</h3>
                <p className="text-gray-600">Seamless integration with Aidbox platform and modules</p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Certification ready</h3>
                <p className="text-gray-600">We help you through the certification process step by step</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Why is it easier with us?</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Doing it yourself is time-consuming and expensive. With us, it’s fast and certified.
                </p>
                
                <div className="space-y-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900">We’ve already passed certification</h4>
                      <p className="mt-1 text-gray-600">We’ve helped clients complete all necessary checks and certifications — we know the processes</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900">All mappings and data structures are ready</h4>
                      <p className="mt-1 text-gray-600">No need to dive into data format details — we’ve already prepared and validated everything</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-gray-900">Your team can start as early as tomorrow</h4>
                      <p className="mt-1 text-gray-600">Simple integration and detailed documentation make it easy to get started quickly</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg">
                 <h3 className="text-lg font-semibold text-gray-900 mb-6">Growing together with our clients</h3>
                 
                 <div className="space-y-4">
                    <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">Backlog</div>
                          <div className="font-medium text-gray-900">SholtzDB Integration</div>
                       </div>
                       <span className="text-gray-400">→</span>
                    </div>

                    <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">In Progress</div>
                          <div className="font-medium text-gray-900">Renew prescription</div>
                       </div>
                       <span className="text-gray-400">→</span>
                    </div>

                    <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Released</div>
                          <div className="font-medium text-gray-900">FirstDatabank Integration</div>
                       </div>
                       <span className="text-gray-400">✓</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-12">Technologies under the hood</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-80">
              <span className="text-2xl font-bold">Aidbox</span>
              <span className="text-2xl font-bold">FHIR</span>
              <span className="text-2xl font-bold">NCPDP</span>
              <span className="text-2xl font-bold">REST API</span>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us what you’re missing</h2>
               <p className="text-lg text-gray-600">and we’ll figure out how to build that feature together</p>
            </div>
            
            <form className="space-y-6 bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="john@company.com" />
                  </div>
               </div>
               <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Tell us about your needs..."></textarea>
               </div>
               <button type="submit" className="w-full bg-black text-white px-6 py-3 rounded-md font-bold hover:bg-gray-800 transition-colors">
                  Send Message
               </button>
            </form>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-red-600 text-white text-center">
           <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
              <p className="text-xl mb-10 opacity-90">Join the thousands of developers building the future of healthcare with Aidbox.</p>
              <button className="bg-white text-red-600 px-10 py-4 rounded-md text-xl font-bold hover:bg-gray-100 transition-colors shadow-xl">
                 Get Started Now
              </button>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
