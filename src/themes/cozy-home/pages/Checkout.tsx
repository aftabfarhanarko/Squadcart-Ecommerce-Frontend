"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function CozyHomeCheckout() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-sans selection:bg-[#B5835A] selection:text-white flex flex-col">
      {/* Checkout Minimal Nav */}
      <nav className="border-b border-[#E5E0D8] py-8 px-8 md:px-16 flex justify-center items-center bg-[#FDFBF7]">
        <Link href="/" className="text-2xl lg:text-3xl font-serif text-[#4A4238] tracking-tight text-center">
          NORDIC<span className="italic text-[#B5835A]">HAVEN</span>
          <span className="block mt-2 text-[10px] uppercase tracking-[0.2em] text-[#A39E98] font-sans">Secure Checkout</span>
        </Link>
      </nav>

      <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row flex-1 px-4 sm:px-8">
        
        {/* Left: Phased Checkout Forms */}
        <main className="w-full lg:w-[55%] xl:w-[60%] py-12 md:py-20 lg:pr-16 xl:pr-24">
           
           {/* Progress Stepper */}
           <div className="flex items-center justify-between mb-16 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-[#E5E0D8] -z-10 transform -translate-y-1/2"></div>
              {['Contact', 'Delivery', 'Payment'].map((step, index) => {
                 const stepNum = index + 1;
                 const isActive = activeTab === stepNum;
                 const isCompleted = activeTab > stepNum;
                 return (
                   <div key={step} className="flex flex-col items-center bg-[#FDFBF7] px-4 cursor-pointer" onClick={() => setActiveTab(stepNum)}>
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isActive ? 'bg-[#4A4238] text-white' : isCompleted ? 'bg-[#B5835A] text-white' : 'bg-[#F4F1EB] text-[#A39E98]'}`}>
                        {isCompleted ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> : stepNum}
                     </div>
                     <span className={`text-xs mt-3 uppercase tracking-widest font-bold ${isActive || isCompleted ? 'text-[#4A4238]' : 'text-[#A39E98]'}`}>{step}</span>
                   </div>
                 );
              })}
           </div>

           <div className="max-w-xl mx-auto lg:mx-0">
              {/* Step 1: Contact */}
              {activeTab === 1 && (
                <div className="animate-[fade-in_0.3s_ease-out]">
                  <h2 className="text-3xl font-serif text-[#4A4238] mb-8">Contact Information</h2>
                  
                  <div className="mb-8 p-6 bg-[#F4F1EB] rounded-3xl text-sm flex items-center justify-between">
                     <div className="text-[#706B65]">Already have an account?</div>
                     <Link href="/login" className="font-bold text-[#4A4238] hover:text-[#B5835A] transition-colors pb-0.5 border-b border-[#4A4238] hover:border-[#B5835A]">Sign in</Link>
                  </div>

                  <div className="space-y-6">
                    <input type="email" placeholder="Email Address" className="w-full bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                    
                    <div className="flex items-start space-x-4">
                      <input type="checkbox" id="news" className="mt-1 w-5 h-5 rounded border-[#E5E0D8] accent-[#4A4238] cursor-pointer" />
                      <label htmlFor="news" className="text-sm text-[#706B65] leading-relaxed cursor-pointer">
                        Subscribe to our newsletter for exclusive early access to new collections and home styling inspiration.
                      </label>
                    </div>

                    <button onClick={() => setActiveTab(2)} className="w-full bg-[#4A4238] text-white rounded-full py-4 text-sm font-bold tracking-wide mt-8 hover:bg-[#322c25] hover:-translate-y-0.5 transition-all shadow-md">
                       Continue to Delivery
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery */}
              {activeTab === 2 && (
                <div className="animate-[fade-in_0.3s_ease-out]">
                  <h2 className="text-3xl font-serif text-[#4A4238] mb-8">Delivery Details</h2>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <input type="text" placeholder="First Name" className="col-span-1 bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                    <input type="text" placeholder="Last Name" className="col-span-1 bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                    <input type="text" placeholder="Address Line 1" className="col-span-2 bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                    <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                    <input type="text" placeholder="City" className="col-span-2 md:col-span-1 bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                    <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-5">
                       <input type="text" placeholder="State/Prov" className="bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                       <input type="text" placeholder="Postal Code" className="bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                    </div>
                    <div className="col-span-2 space-y-2">
                       <input type="text" placeholder="Phone Number" className="w-full bg-white border border-[#E5E0D8] rounded-2xl p-4 text-[#4A4238] focus:outline-none focus:border-[#4A4238] focus:ring-1 focus:ring-[#4A4238] transition-all placeholder:text-[#A39E98]" />
                       <p className="text-xs text-[#A39E98] px-2">Required by our white-glove delivery partners to schedule your drop-off time.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-10">
                     <button onClick={() => setActiveTab(1)} className="px-8 py-4 rounded-full text-sm font-bold text-[#706B65] border border-[#E5E0D8] hover:bg-[#F4F1EB] transition-colors">Back</button>
                     <button onClick={() => setActiveTab(3)} className="flex-1 bg-[#4A4238] text-white rounded-full py-4 text-sm font-bold tracking-wide hover:bg-[#322c25] hover:-translate-y-0.5 transition-all shadow-md">Continue to Payment</button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {activeTab === 3 && (
                <div className="animate-[fade-in_0.3s_ease-out]">
                  <h2 className="text-3xl font-serif text-[#4A4238] mb-8">Payment</h2>
                  
                  <div className="space-y-6">
                     <div className="border border-[#4A4238] rounded-3xl p-6 bg-[#FDFBF7] shadow-[0_0_0_1px_rgba(74,66,56,0.1)]">
                        <div className="flex items-center justify-between mb-6">
                           <span className="font-bold text-[#4A4238]">Credit Card</span>
                           <div className="flex space-x-2">
                             {/* Card icons mock */}
                             <div className="w-8 h-5 bg-[#E5E0D8] rounded"></div>
                             <div className="w-8 h-5 bg-[#E5E0D8] rounded"></div>
                           </div>
                        </div>
                        <div className="space-y-5">
                          <input type="text" placeholder="Card Number" className="w-full bg-white border border-[#E5E0D8] rounded-xl p-3 text-sm text-[#4A4238] focus:outline-none focus:border-[#4A4238] transition-colors" />
                          <div className="grid grid-cols-2 gap-5">
                             <input type="text" placeholder="Expiration (MM/YY)" className="w-full bg-white border border-[#E5E0D8] rounded-xl p-3 text-sm text-[#4A4238] focus:outline-none focus:border-[#4A4238] transition-colors" />
                             <input type="text" placeholder="Security Code" className="w-full bg-white border border-[#E5E0D8] rounded-xl p-3 text-sm text-[#4A4238] focus:outline-none focus:border-[#4A4238] transition-colors" />
                          </div>
                          <input type="text" placeholder="Name on Card" className="w-full bg-white border border-[#E5E0D8] rounded-xl p-3 text-sm text-[#4A4238] focus:outline-none focus:border-[#4A4238] transition-colors" />
                        </div>
                     </div>

                     <div className="border border-[#E5E0D8] rounded-3xl p-6 hover:bg-[#F4F1EB] transition-colors cursor-pointer flex items-center">
                        <div className="w-5 h-5 rounded-full border border-[#A39E98] mr-4"></div>
                        <span className="font-medium text-[#706B65]">Alternative Payment (Klarna, Affirm)</span>
                     </div>
                  </div>

                  <div className="flex gap-4 mt-12">
                     <button onClick={() => setActiveTab(2)} className="px-8 py-4 rounded-full text-sm font-bold text-[#706B65] border border-[#E5E0D8] hover:bg-[#F4F1EB] transition-colors">Back</button>
                     <button className="flex-1 bg-[#4A4238] text-white rounded-full py-4 text-sm font-bold tracking-wide hover:bg-[#322c25] hover:-translate-y-0.5 transition-all shadow-md flex justify-center items-center">
                       <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                       Place Order Securely
                     </button>
                  </div>
                </div>
              )}
           </div>
        </main>

        {/* Right: Order Summary Sidebar */}
        <aside className="w-full lg:w-[45%] xl:w-[40%] bg-[#F4F1EB] px-6 md:px-12 py-12 lg:py-20 relative rounded-t-[2.5rem] lg:rounded-none lg:border-l border-[#E5E0D8]">
           
           <div className="sticky top-20">
             <h3 className="text-xl font-serif text-[#4A4238] mb-8">Summary of Pieces</h3>
             
             <div className="space-y-6 mb-10 pb-10 border-b border-[#E5E0D8]">
               
               {/* Item 1 */}
               <div className="flex items-start">
                 <div className="relative w-20 h-24 bg-[#FDFBF7] rounded-xl overflow-hidden flex-shrink-0 mr-6">
                    <Image src="/theme-previews/cozy_product_page_1774979839134.png" alt="Obj" fill className="object-cover mix-blend-multiply" />
                    <span className="absolute top-0 right-0 bg-[#A39E98]/80 text-white backdrop-blur-sm w-6 h-6 flex items-center justify-center text-[10px] m-1 rounded-full">1</span>
                 </div>
                 <div className="pt-1 flex-1">
                    <h4 className="text-[#4A4238] font-medium leading-tight mb-1 pr-6">Oskar Lounge Chair</h4>
                    <p className="text-[#706B65] text-xs mb-3">Walnut & Cream</p>
                    <span className="text-[#4A4238] font-medium">$1250.00</span>
                 </div>
               </div>
               
               {/* Item 2 */}
               <div className="flex items-start">
                 <div className="relative w-20 h-24 bg-[#FDFBF7] rounded-xl overflow-hidden flex-shrink-0 mr-6">
                    <Image src="/theme-previews/theme_cozy_home_1774979483839.png" alt="Obj" fill className="object-cover mix-blend-multiply" />
                    <span className="absolute top-0 right-0 bg-[#A39E98]/80 text-white backdrop-blur-sm w-6 h-6 flex items-center justify-center text-[10px] m-1 rounded-full">1</span>
                 </div>
                 <div className="pt-1 flex-1">
                    <h4 className="text-[#4A4238] font-medium leading-tight mb-1 pr-6">Handwoven Jute Rug</h4>
                    <p className="text-[#706B65] text-xs mb-3">Natural Sand</p>
                    <span className="text-[#4A4238] font-medium">$340.00</span>
                 </div>
               </div>

             </div>

             <div className="flex mb-10">
               <input type="text" placeholder="Gift card or discount code" className="flex-1 bg-white border border-[#E5E0D8] rounded-l-2xl p-4 text-sm focus:outline-none focus:border-[#4A4238] text-[#4A4238]" />
               <button className="bg-[#4A4238] text-white px-6 rounded-r-2xl font-bold text-xs hover:bg-[#322c25] transition-colors">Apply</button>
             </div>

             <div className="space-y-4 text-sm text-[#706B65] mb-8">
               <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-[#4A4238] font-medium">$1590.00</span>
               </div>
               <div className="flex justify-between items-center">
                  <span>White-Glove Delivery</span>
                  <span className="text-[#4A4238] font-medium">Complimentary</span>
               </div>
               <div className="flex justify-between items-center">
                  <span>Estimated Taxes</span>
                  <span className="text-[#4A4238] font-medium">$127.20</span>
               </div>
             </div>

             <div className="flex justify-between items-end border-t border-[#E5E0D8] pt-8">
                <span className="text-[#4A4238] font-medium">Total</span>
                <span className="text-3xl font-serif text-[#4A4238]">${(1590.00 + 127.20).toFixed(2)}</span>
             </div>

           </div>
        </aside>

      </div>
    </div>
  );
}
