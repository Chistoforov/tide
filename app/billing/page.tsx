'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function BillingPage() {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

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
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-red-600 text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200">
                  Book a Demo
                </button>
                <button className="bg-white text-gray-900 border border-gray-300 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors">
                  Request POC (30 Days Free)
                </button>
              </div>

              {/* Testimonial */}
              <div className="border-l-4 border-red-500 pl-6 py-2 bg-gray-50 rounded-r-lg">
                <p className="text-lg text-gray-700 italic mb-3">
                  "We were building a billing backend to bundle with our SaaS EHR—knew FHIR but had zero EDI/X12 experience. Aidbox team mapped our payer rules, built the 837/835 bridge, and handled compliance logging we hadn't considered. Launched production claims in 4 months with their support filling our gaps."
                </p>
                <div className="font-bold text-gray-900">— EHR Platform CTO</div>
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

        {/* Implementation Journey Section */}
        <section className="py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">3-Week Implementation Journey</h2>
                <p className="text-xl text-gray-600 mb-8">
                  From deployment to production claims in weeks, not months.
                </p>
                
                <div className="space-y-6">
                   <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-600 font-bold">1</div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">Deploy + Test Payers Live</h4>
                        <p className="mt-1 text-gray-600">Deploy Kubernetes/Aidbox Cloud. Connect test payers (Availity sandbox). Verify 837P submission endpoint.</p>
                      </div>
                   </div>

                   <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold">2</div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">Configure Core Rules</h4>
                        <p className="mt-1 text-gray-600">Map eligibility/pricing rules (FHIRPath). Set up validation. Configure 835 payment posting.</p>
                      </div>
                   </div>

                   <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 font-bold">3</div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-bold text-gray-900">Production Switch</h4>
                        <p className="mt-1 text-gray-600">Parallel run. Load test (10k claims/day). Compliance audit verified. Cutover to live payers.</p>
                      </div>
                   </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg">
                 <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline Comparison</h3>
                 <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900">Custom Billing Build</span>
                        <span className="text-red-600 font-medium">6-12 months</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Code → Test → Compliance → Live</p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900">Aidbox Billing</span>
                        <span className="text-green-600 font-bold">3 weeks</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Deploy → Configure → Production</p>
                    </div>
                 </div>
                 
                 <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-center font-medium text-gray-900">
                      20x faster, 90% less dev time
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Aidbox Billing? (Comparison) Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Aidbox Billing?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We solve the complexity of FHIR & X12 so you can focus on your product.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Production-Ready vs Experimental</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: "FHIR works in sandbox" → 12 months to production.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: FHIR ClaimBundle + X12 live in 3 weeks.</p>
               </div>

               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Dev-to-Dev Focus</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: Sell to billers (slow sales cycles).</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: Sell to CTOs building modules (technical decisions).</p>
               </div>

               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Extensible Backbone</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: Locked into their payer rules/UI.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: Your rules + your UI on our FHIR rails.</p>
               </div>

               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Own Your IP</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: $500k/year + price hikes.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: $60k infra + your billing module = yours forever.</p>
               </div>

               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Multi-Tenant Scale</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: Per-customer deployments don't scale.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: One backend serves 1000s providers Day 1.</p>
               </div>

               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Complete Stack</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: EDI only → still need to build rules/workflow.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: FHIR rules + X12 + workflow + compliance.</p>
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

        {/* FAQ / Objections Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">Too complex to migrate?</h4>
                 <p className="text-gray-600">We offer a Free migration assessment + 30-day POC to prove it works before you commit.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">Will it scale?</h4>
                 <p className="text-gray-600">We can show you a live demo with 10k claims/sec + customer case studies handling enterprise volumes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">Lock-in risk?</h4>
                 <p className="text-gray-600">Aidbox is built on standard FHIR APIs. You can bring your own infra. You own your IP.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">What if we need custom payer rules?</h4>
                 <p className="text-gray-600">Use our FHIRPath rules engine + no-code config UI to handle any payer-specific requirements.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">Integration with our EHR?</h4>
                 <p className="text-gray-600">Open FHIR REST APIs + Epic/Cerner tested connectors make integration straightforward.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">$2.5k/mo too expensive?</h4>
                 <p className="text-gray-600">Our ROI calculator shows payback in less than 1 month vs in-house dev costs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 mb-4">Start your billing project</h2>
               <p className="text-lg text-gray-600">Tell us about your needs and we’ll help you launch fast</p>
               <p className="text-sm text-green-600 font-bold mt-2">Plans start at $2.5k/mo</p>
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
               
               <div>
                  <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">Attach Document (Optional)</label>
                  <div className="mt-1 flex items-center">
                    <label htmlFor="document" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Choose File
                    </label>
                    <input 
                      type="file" 
                      id="document" 
                      name="document" 
                      className="sr-only" 
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                    />
                    <span className="ml-3 text-sm text-gray-500">
                      {fileName ? fileName : 'No file chosen'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Accepted formats: .doc, .docx (Microsoft Word)</p>
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
