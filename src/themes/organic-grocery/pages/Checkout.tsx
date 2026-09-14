"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function OrganicGroceryCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/30 flex flex-col">
      {/* Checkout Navbar */}
      <nav className="bg-white border-b border-slate-100 py-4 px-8 flex justify-center items-center shadow-sm">
        <Link href="/" className="text-2xl font-black text-emerald-800 tracking-tight flex items-center space-x-2">
          <span>Squadcart<span className="text-emerald-500">Fresh</span></span>
          <span className="bg-emerald-50 text-emerald-600 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest ml-2 border border-emerald-100 hidden md:block">Secure Checkout</span>
        </Link>
      </nav>

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1">
        
        {/* Left: Shipping & Billing Forms */}
        <main className="lg:col-span-7 px-4 md:px-12 py-10 lg:border-r border-slate-200">
           
           {/* Express Login Banner */}
           <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-10 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-emerald-800 font-medium text-sm">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-500">👤</div>
                 <span>Have an account? Access your saved addresses.</span>
              </div>
              <Link href="/login" className="px-4 py-2 bg-white border border-emerald-200 text-emerald-600 rounded-full text-xs font-bold hover:bg-emerald-50 transition-colors">Log In</Link>
           </div>
           
           <div className="space-y-12 max-w-2xl">
              
              {/* Contact Information */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">1</span>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Contact Information</h3>
                </div>
                <div className="space-y-4 ml-11">
                  <input type="email" placeholder="Email Address" className="w-full bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" />
                  <div className="flex items-start space-x-3 text-sm font-medium text-slate-600">
                    <input type="checkbox" id="offers" className="mt-1 w-4 h-4 text-emerald-500 bg-white border-slate-300 rounded focus:ring-emerald-500 accent-emerald-500" />
                    <label htmlFor="offers">Send me updates on seasonal fresh produce and exclusive offers.</label>
                  </div>
                </div>
              </section>

              {/* Delivery Address */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">2</span>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Delivery Details</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 ml-11">
                  <input type="text" placeholder="First Name" className="col-span-1 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all" />
                  <input type="text" placeholder="Last Name" className="col-span-1 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all" />
                  <input type="text" placeholder="Street Address" className="col-span-2 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all" />
                  <input type="text" placeholder="Apartment, suite, block (optional)" className="col-span-2 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all" />
                  <input type="text" placeholder="City" className="col-span-2 md:col-span-1 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all" />
                  <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
                     <input type="text" placeholder="State" className="col-span-1 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all" />
                     <input type="text" placeholder="ZIP Code" className="col-span-1 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all" />
                  </div>
                  <input type="text" placeholder="Mobile Phone (for delivery updates)" className="col-span-2 bg-white border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all" />
                </div>
              </section>

              {/* Payment Info */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black">3</span>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Payment Method</h3>
                </div>
                <div className="space-y-4 ml-11">
                   {/* Card Radio */}
                   <label className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-emerald-500 w-4 h-4 mr-4" />
                      <span className="text-sm font-bold text-slate-700">Credit or Debit Card</span>
                   </label>
                   
                   {paymentMethod === 'card' && (
                     <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                       <input type="text" placeholder="Card Number" className="col-span-2 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 shadow-sm transition-all" />
                       <input type="text" placeholder="MM / YY" className="col-span-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 shadow-sm transition-all" />
                       <input type="text" placeholder="CVC" className="col-span-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 shadow-sm transition-all" />
                       <input type="text" placeholder="Name on Card" className="col-span-2 bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 shadow-sm transition-all" />
                     </div>
                   )}

                   {/* Cash on Delivery Radio */}
                   <label className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border ${paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                      <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-emerald-500 w-4 h-4 mr-4" />
                      <span className="text-sm font-bold text-slate-700 flex flex-col">
                         <span>Cash / Card on Delivery</span>
                         <span className="text-xs font-normal text-slate-500 mt-0.5">Pay at your doorstep when your groceries arrive.</span>
                      </span>
                   </label>
                </div>
              </section>

              {/* Submit Action */}
              <div className="pt-4 ml-11">
                <button className="w-full bg-emerald-500 text-white shadow-[0_8px_20px_rgba(5,150,105,0.2)] hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 py-4 rounded-full text-lg font-black transition-all flex justify-center items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Place Order
                </button>
                <div className="text-center mt-4 text-xs font-medium text-slate-400">
                  By placing your order, you agree to our <Link href="/terms" className="text-emerald-500 hover:underline">Terms of Service</Link>.
                </div>
              </div>

           </div>
        </main>

        {/* Right: Order Summary */}
        <aside className="lg:col-span-5 bg-white lg:bg-slate-50 px-4 md:px-12 py-10 border-t lg:border-t-0 border-slate-200">
           <div className="sticky top-24 max-w-md mx-auto lg:mx-0">
             
             {/* Mocked Basket Items */}
             <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm mb-6">
                <h3 className="text-lg font-black text-slate-800 tracking-tight mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl p-1 flex items-center justify-center">
                        <Image src="/theme-previews/grocery_category_page_1774979775980.png" alt="Pdt" fill className="object-contain mix-blend-multiply p-2" />
                        <span className="absolute -top-2 -right-2 bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 leading-tight">Farm Fresh Avocados</h4>
                        <p className="text-xs text-slate-500 mt-0.5">1 kg</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">$13.98</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl p-1 flex items-center justify-center">
                        <Image src="/theme-previews/theme_organic_grocery_1774979385899.png" alt="Pdt" fill className="object-contain mix-blend-multiply p-2" />
                        <span className="absolute -top-2 -right-2 bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 leading-tight">Organic Whole Milk</h4>
                        <p className="text-xs text-slate-500 mt-0.5">1 Gallon</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">$4.50</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex space-x-2 border-y border-slate-100 py-6 mb-6">
                  <input type="text" placeholder="Gift card or discount code" className="flex-1 bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 placeholder-slate-400" />
                  <button className="px-5 py-3 bg-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-300 transition-colors">Apply</button>
                </div>

                {/* Costs Breakdown */}
                <div className="space-y-3 mb-6 text-sm font-medium text-slate-500">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-slate-700">$18.48</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Local Delivery</span>
                      <span className="font-bold text-slate-700">$5.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Taxes</span>
                      <span className="font-bold text-slate-700">$0.92</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-between items-end">
                    <span className="text-base font-bold text-slate-800">Total</span>
                    <span className="text-3xl font-black text-emerald-600"><span className="text-sm text-slate-400 font-medium mr-1">USD</span>$25.39</span>
                  </div>
             </div>

             {/* Support Need? */}
             <div className="text-center text-sm font-medium text-slate-500">
                Need help with your order? <Link href="/contact" className="text-emerald-600 hover:underline">Contact Support</Link>
             </div>

           </div>
        </aside>

      </div>
    </div>
  );
}
