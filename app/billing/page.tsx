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
                 <span>Production-ready medical billing backend</span>
               </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                Ship compliant billing modules in weeks, not years
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
                Aidbox Billing gives health IT teams a production-ready FHIR core to build scalable, compliant billing systems 10x faster. Configure workflow for production claims processing in 3 weeks instead of 6-12 months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                  Book a Demo
                </button>
                <button className="bg-white text-gray-900 border border-gray-300 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors">
                  Request POC (30 Days Free)
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
                Aidbox Billing — production-ready backend platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl">
                Native FHIR + X12 rules engine for teams rewriting or building custom healthcare billing systems
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6 text-red-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">FHIR Rules Engine</h3>
                <p className="text-gray-600">Configurable FHIRPath rules for claims validation, pricing, eligibility decisions. Deploy new rules in hours.</p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">X12/FHIR Bridge</h3>
                <p className="text-gray-600">Native bidirectional ClaimBundle EDI conversion (837/835 ↔ FHIR). Zero format-based rejections.</p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 text-green-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                 </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Multi-tenant Workflows</h3>
                <p className="text-gray-600">Kubernetes-native shared billing core with org isolation. Single deployment serves 1000s of providers.</p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                 </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Audit & Compliance</h3>
                <p className="text-gray-600">Built-in HIPAA BAA + SOC2 Type II controls. Production-ready for enterprise compliance reviews.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Aidbox Billing?</h2>
                <p className="text-xl text-gray-600 mb-8">
                  We solve the complexity of FHIR & X12 so you can focus on your product.
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
                      <h4 className="text-lg font-bold text-gray-900">3-Week Go-Live vs 6-12 Months</h4>
                      <p className="mt-1 text-gray-600">Deploy → configure → production claims. 20x faster, 90% less dev time compared to custom builds.</p>
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
                      <h4 className="text-lg font-bold text-gray-900">Own Your IP vs Vendor Lock-in</h4>
                      <p className="mt-1 text-gray-600">$60k infra + your billing module = yours forever. Avoid $500k/year fees and rigid module constraints.</p>
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
                      <h4 className="text-lg font-bold text-gray-900">Multi-Tenant Scale</h4>
                      <p className="mt-1 text-gray-600">One billing backend serves 1000s of providers from Day 1. Don\'t get stuck with per-customer deployments.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg">
                 <h3 className="text-lg font-semibold text-gray-900 mb-6">Implementation Journey</h3>
                 
                 <div className="space-y-4">
                    <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-1">Week 1</div>
                          <div className="font-medium text-gray-900">Deploy + Test Payers Live</div>
                       </div>
                       <span className="text-gray-400">→</span>
                    </div>

                    <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Week 2</div>
                          <div className="font-medium text-gray-900">Configure Core Rules</div>
                       </div>
                       <span className="text-gray-400">→</span>
                    </div>

                    <div className="bg-white p-4 rounded border border-gray-200 shadow-sm flex items-center justify-between">
                       <div>
                          <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Week 3</div>
                          <div className="font-medium text-gray-900">Production Switch</div>
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
              <span className="text-2xl font-bold">X12</span>
              <span className="text-2xl font-bold">Kubernetes</span>
              <span className="text-2xl font-bold">Kafka</span>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 mb-4">Start your billing project</h2>
               <p className="text-lg text-gray-600">Tell us about your needs and we’ll help you launch fast</p>
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
                  <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" placeholder="Tell us about your billing requirements..."></textarea>
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
              <h2 className="text-4xl font-bold mb-6">Ready to launch your billing module?</h2>
              <p className="text-xl mb-10 opacity-90">Join the health IT teams building scalable, compliant billing systems with Aidbox.</p>
              <button className="bg-white text-red-600 px-10 py-4 rounded-md text-xl font-bold hover:bg-gray-100 transition-colors shadow-xl">
                 Book a Demo
              </button>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
