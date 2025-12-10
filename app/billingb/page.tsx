'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function BillingBPage() {
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
                 <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                 <span>Modular API & Integrations</span>
               </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                Add production billing APIs to any system in days
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
                Add production billing APIs (eligibility, pre-auth, unit calc, X12 conversion) to any system with admin UI and observability in days. Cut billing integration time by 80% - no custom admin layer needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-md text-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  Book a Demo
                </button>
                <button className="bg-white text-gray-900 border border-gray-300 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors">
                  Request POC (30 Days Free)
                </button>
              </div>

              {/* Testimonial/Proof */}
              <div className="border-l-4 border-blue-500 pl-6 py-2 bg-gray-50 rounded-r-lg">
                <p className="text-lg text-gray-700 italic mb-3">
                   "Live in 48 hours - free sandbox + 500+ payers connected, 99.99% uptime. Handles eligibility checks, unit calculations, claims analytics with built-in monitoring."
                </p>
              </div>
            </div>
          </div>
          
          {/* Abstract Background Decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-gray-50 to-white -z-10 pointer-events-none hidden lg:block">
             <div className="absolute top-20 right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          </div>
        </section>

        {/* Modular API Components Section (Path B) */}
        <section className="py-24 bg-gray-50">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Modular Billing APIs</h2>
                 <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Focus on quick wins for teams extending ANY billing system.
                 </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Component 1 */}
                 <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Eligibility Check Engine</h3>
                    <p className="text-sm text-gray-600 mb-3">Real-time insurance verification API. Instant coverage checks in 2 seconds.</p>
                    <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">Cuts eligibility time 90%</div>
                 </div>

                 {/* Component 2 */}
                 <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Pre-authorizations API</h3>
                    <p className="text-sm text-gray-600 mb-3">Submit/track prior auth requests. Approvals in hours vs weeks.</p>
                    <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">70% faster auth processing</div>
                 </div>

                 {/* Component 3 */}
                 <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Unit Calculation Service</h3>
                    <p className="text-sm text-gray-600 mb-3">Automated unit pricing calculations. Zero calc rejections.</p>
                    <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">15% revenue uplift</div>
                 </div>

                 {/* Component 4 */}
                 <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Coding Service</h3>
                    <p className="text-sm text-gray-600 mb-3">ICD-10/CPT code validation + suggestions. Compliant codes, first-pass acceptance.</p>
                    <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">Reduces coding denials 80%</div>
                 </div>

                 {/* Component 5 */}
                 <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Price Management API</h3>
                    <p className="text-sm text-gray-600 mb-3">Dynamic pricing lookup + contract rates. Correct pricing across all payers.</p>
                    <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">Maximizes reimbursements</div>
                 </div>

                 {/* Component 6 */}
                 <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">X12 ↔ FHIR Converter</h3>
                    <p className="text-sm text-gray-600 mb-3">Bidirectional EDI formatting + Admin UI. Deploy X12 capability instantly.</p>
                    <div className="text-xs font-semibold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">Claims formatted in 48 hours</div>
                 </div>
                 
                 {/* Component 7 */}
                 <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-3">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                       <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">Claims Analytics</h3>
                          <p className="text-sm text-gray-600">Denials/rejections dashboard + root cause. Fix denial patterns, improve A/R.</p>
                       </div>
                       <div className="mt-4 md:mt-0 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded">50% faster denial resolution</div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Why Aidbox Billing? (Comparison) Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Aidbox Billing APIs?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                 We solve the complexity of FHIR & X12 integration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">FHIR-native vs Legacy EDI</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: Legacy EDI parsing headaches.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: Modern FHIR JSON APIs.</p>
               </div>

               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Developer-First</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: Enterprise sales cycles & opaque docs.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: Public docs + instant sandbox.</p>
               </div>

               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Usage-Based Pricing</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: Fixed enterprise contracts.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: Pay as you go ($0.01/call).</p>
               </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Admin UI Included</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: API-only, build your own tools.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: Ready tenant admin + denial analytics.</p>
               </div>
               
               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Full Observability</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: Black box processing.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: Trace every API call & claim step.</p>
               </div>

               <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Fastest Integration</h4>
                  <p className="text-sm text-gray-600 mb-4">Others: Months of custom dev.</p>
                  <p className="text-sm font-semibold text-green-600">Aidbox: Live in 48 hours.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-12">Architecture</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-80">
              <span className="text-xl font-bold">REST APIs over HTTPS</span>
              <span className="text-xl font-bold">Webhooks</span>
              <span className="text-xl font-bold">Standard Endpoints</span>
              <span className="text-xl font-bold">99.99% SLA</span>
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
                 <h4 className="text-lg font-bold text-gray-900 mb-2">Will it work with our stack?</h4>
                 <p className="text-gray-600">Free sandbox + integration guide + FHIR REST endpoints allow integration with any billing/PM stack.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">Payer coverage?</h4>
                 <p className="text-gray-600">500+ payers live (Availity, Change Healthcare, Optum), new ones added weekly via rules engine.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">Cost?</h4>
                 <p className="text-gray-600">Free tier (10k calls/mo) + $0.01/call usage pricing. No hidden fees.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">No admin UI?</h4>
                 <p className="text-gray-600">Ready tenant admin + denial analytics dashboard included.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">Debugging production issues?</h4>
                 <p className="text-gray-600">Full API observability + trace every claim step.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                 <h4 className="text-lg font-bold text-gray-900 mb-2">What if we need custom logic?</h4>
                 <p className="text-gray-600">Extend with your code or FHIRPath rules.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-gray-900 mb-4">Start your billing integration</h2>
               <p className="text-lg text-gray-600">Tell us about your needs and we’ll help you launch fast</p>
               <p className="text-sm text-blue-600 font-bold mt-2">Free tier + $0.01/eligibility call</p>
            </div>
            
            <form className="space-y-6 bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="john@company.com" />
                  </div>
               </div>
               <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Tell us about your integration needs..."></textarea>
               </div>
               
               <div>
                  <label htmlFor="document" className="block text-sm font-medium text-gray-700 mb-1">Attach Document (Optional)</label>
                  <div className="mt-1 flex items-center">
                    <label htmlFor="document" className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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
        <section className="py-20 bg-blue-600 text-white text-center">
           <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-6">Ready to start?</h2>
              <p className="text-xl mb-10 opacity-90">Start with our Free Tier and scale as you grow.</p>
              <button className="bg-white text-blue-600 px-10 py-4 rounded-md text-xl font-bold hover:bg-gray-100 transition-colors shadow-xl">
                 Book a Demo
              </button>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
