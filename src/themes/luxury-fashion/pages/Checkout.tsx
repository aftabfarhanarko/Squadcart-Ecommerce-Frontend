"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function LuxuryFashionCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-serif selection:bg-amber-500/30">
      {/* Checkout Navbar */}
      <nav className="border-b border-zinc-800/80 py-6 px-8 flex justify-center items-center bg-black/90">
        <Link href="/" className="text-2xl tracking-widest text-amber-500 uppercase font-light">Squadcart Luxury</Link>
      </nav>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[calc(100vh-80px)]">
        
        {/* Left: Billing & Shipping Information */}
        <main className="lg:col-span-7 px-8 md:px-16 py-16 border-r border-zinc-800/50">
           <h2 className="text-2xl tracking-[0.2em] font-light text-white uppercase mb-12">Checkout</h2>
           
           <div className="space-y-12 max-w-2xl">
              {/* Contact Information */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm tracking-widest text-amber-500 uppercase">Contact Information</h3>
                  <Link href="/login" className="text-xs text-zinc-400 hover:text-white transition-colors underline">Already have an account? Log in</Link>
                </div>
                <div className="space-y-4">
                  <input type="email" placeholder="Email or Mobile Phone Number" className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors font-sans" />
                  <div className="flex items-center space-x-3 text-sm tracking-wider text-zinc-400">
                    <input type="checkbox" id="offers" className="w-4 h-4 bg-zinc-900 border-zinc-800 accent-amber-500" />
                    <label htmlFor="offers">Email me with news and exclusive offers</label>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h3 className="text-sm tracking-widest text-amber-500 uppercase mb-6">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="col-span-1 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                  <input type="text" placeholder="Last Name" className="col-span-1 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                  <input type="text" placeholder="Address" className="col-span-2 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="col-span-2 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                  <input type="text" placeholder="City" className="col-span-2 md:col-span-1 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                  <div className="col-span-1 md:col-span-1 grid grid-cols-2 gap-4">
                    <input type="text" placeholder="State/Province" className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                    <input type="text" placeholder="ZIP/Postal Code" className="bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section>
                <h3 className="text-sm tracking-widest text-amber-500 uppercase mb-6">Payment Method</h3>
                <div className="space-y-4">
                   <label className={`flex items-center p-4 border cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-amber-500 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900/50'}`}>
                      <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-amber-500 w-4 h-4 mr-4" />
                      <span className="text-sm tracking-widest text-zinc-200">Credit or Debit Card</span>
                   </label>
                   
                   {paymentMethod === 'card' && (
                     <div className="grid grid-cols-2 gap-4 mt-4 bg-zinc-900/30 p-6 border border-zinc-800">
                       <input type="text" placeholder="Card Number" className="col-span-2 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                       <input type="text" placeholder="Expiration Date (MM/YY)" className="col-span-1 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                       <input type="text" placeholder="Security Code (CVV)" className="col-span-1 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                       <input type="text" placeholder="Name on Card" className="col-span-2 bg-zinc-900 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
                     </div>
                   )}

                   <label className={`flex items-center p-4 border cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-amber-500 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900/50'}`}>
                      <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="accent-amber-500 w-4 h-4 mr-4" />
                      <span className="text-sm tracking-widest text-zinc-200">PayPal Express Checkout</span>
                   </label>
                </div>
              </section>

              {/* Submit */}
              <div className="pt-8">
                <button className="w-full bg-amber-500 text-black py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20">
                  Complete Purchase securely
                </button>
                <div className="text-center mt-6 flex justify-center items-center text-zinc-500 text-[10px] tracking-widest uppercase">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                  Transactions are secured via 256-bit SSL encryption
                </div>
              </div>

           </div>
        </main>

        {/* Right: Order Summary Details */}
        <aside className="lg:col-span-5 px-8 md:px-16 py-16 bg-zinc-900/30">
           <div className="sticky top-16 max-w-md">
             <h3 className="text-sm tracking-widest text-white uppercase border-b border-zinc-800 pb-6 mb-8">Order Items</h3>
             
             {/* Mocked Items */}
             <div className="space-y-6 mb-12">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                   <div className="relative w-16 h-20 bg-zinc-800 border border-zinc-700">
                     <Image src="/theme-previews/luxury_product_page_1774979723370.png" alt="Pdt" fill className="object-cover opacity-80" />
                     <span className="absolute -top-2 -right-2 bg-amber-500 text-black w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-sans font-bold">1</span>
                   </div>
                   <div>
                     <h4 className="text-xs tracking-wider text-zinc-300 uppercase">Midnight Silk Dress</h4>
                     <p className="text-[10px] text-zinc-500 mt-1 uppercase">Size: M</p>
                   </div>
                 </div>
                 <span className="text-sm font-sans text-amber-500">$350.00</span>
               </div>
               
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-4">
                   <div className="relative w-16 h-20 bg-zinc-800 border border-zinc-700">
                     <Image src="/theme-previews/theme_luxury_fashion_1774979335026.png" alt="Pdt" fill className="object-cover opacity-80" />
                     <span className="absolute -top-2 -right-2 bg-amber-500 text-black w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-sans font-bold">1</span>
                   </div>
                   <div>
                     <h4 className="text-xs tracking-wider text-zinc-300 uppercase">Gold Minimalist Watch</h4>
                     <p className="text-[10px] text-zinc-500 mt-1 uppercase">Color: Rose Gold</p>
                   </div>
                 </div>
                 <span className="text-sm font-sans text-amber-500">$1850.00</span>
               </div>
             </div>

             {/* Discount Code */}
             <div className="flex space-x-4 mb-12 border-b border-zinc-800 pb-12">
               <input type="text" placeholder="Promo code or Gift card" className="flex-1 bg-black border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-sans" />
               <button className="px-6 py-3 bg-zinc-800 text-white text-xs tracking-widest uppercase hover:bg-zinc-700 transition-colors">Apply</button>
             </div>

             {/* Costs Breakdown */}
             <div className="space-y-4 mb-8 text-sm tracking-widest text-zinc-400 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">$2200.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="text-zinc-200">$25.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span className="text-zinc-200">$176.00</span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6 flex justify-between items-end">
                <span className="text-sm tracking-widest uppercase text-white">Total</span>
                <span className="text-3xl font-sans text-amber-500 font-light"><span className="text-sm text-zinc-500 mr-2">USD</span>$2401.00</span>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
}
