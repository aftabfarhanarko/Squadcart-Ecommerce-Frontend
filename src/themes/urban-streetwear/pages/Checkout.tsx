"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function UrbanStreetwearCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-stone-100 text-black font-sans selection:bg-rose-600 selection:text-white flex flex-col">
      {/* Brutalist Navbar */}
      <nav className="border-b-4 border-black py-4 px-6 md:px-10 flex justify-between items-center bg-stone-100 sticky top-0 z-50">
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase transform -skew-x-6 hover:text-rose-600 transition-colors">
          SQUAD<span className="text-inherit">CRTEL</span>
        </Link>
        <div className="bg-yellow-400 text-black px-4 py-2 border-4 border-black font-black uppercase tracking-widest text-xs hidden sm:block">
           SECURE TRANSACTION ENDPOINT
        </div>
      </nav>

      <div className="w-full flex flex-col lg:flex-row flex-1">
        
        {/* Left: Input Logistics */}
        <main className="w-full lg:w-[60%] px-6 md:px-16 py-12 lg:py-20 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white">
           
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 drop-shadow-[4px_4px_0_#e11d48]">Logistics</h1>
           
           {/* Member Hook */}
           <div className="bg-black text-white p-6 border-4 border-black mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="font-bold uppercase tracking-widest text-sm">Syndicate Member?</span>
              <Link href="/login" className="px-6 py-2 bg-white text-black font-black uppercase border-2 border-transparent hover:border-white hover:bg-black hover:text-white transition-all text-xs">
                Authenticate For Saved Stash
              </Link>
           </div>
           
           <div className="space-y-16 max-w-3xl">
              
              {/* Comms */}
              <section>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-rose-600 border-4 border-black flex items-center justify-center text-white font-black text-xl">01</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">COMMS TIE</h3>
                </div>
                <div className="pl-0 md:pl-16">
                  <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors" />
                  <div className="flex items-center space-x-3 mt-4">
                    <input type="checkbox" id="news" className="w-6 h-6 border-4 border-black accent-rose-600 bg-stone-100 cursor-pointer rounded-none" />
                    <label htmlFor="news" className="font-bold uppercase tracking-widest text-xs cursor-pointer select-none text-stone-600">NOTIFY ME OF SURPRISE DROPS & VAULT CLEARS</label>
                  </div>
                </div>
              </section>

              {/* Geo Grid */}
              <section>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-400 border-4 border-black flex items-center justify-center text-black font-black text-xl">02</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">DROP ZONE</h3>
                </div>
                <div className="pl-0 md:pl-16 grid grid-cols-2 gap-4">
                  <select className="col-span-2 bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors appearance-none cursor-pointer">
                    <option>UNITED STATES</option>
                    <option>CANADA</option>
                    <option>EUROPEAN UNION</option>
                    <option>JAPAN</option>
                  </select>
                  <input type="text" placeholder="FIRST NAME" className="col-span-1 bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors" />
                  <input type="text" placeholder="LAST NAME" className="col-span-1 bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors" />
                  <input type="text" placeholder="STREET CRED (ADDRESS)" className="col-span-2 bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors" />
                  <input type="text" placeholder="CITY" className="col-span-2 md:col-span-1 bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors" />
                  <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
                     <input type="text" placeholder="STATE" className="bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors" />
                     <input type="text" placeholder="ZIP" className="bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors" />
                  </div>
                  <input type="text" placeholder="PHONE NUMBER (MANDATORY FOR COURIER)" className="col-span-2 bg-stone-100 border-4 border-black p-4 font-black uppercase focus:outline-none focus:border-rose-600 transition-colors" />
                </div>
              </section>

              {/* Capital Extractor */}
              <section>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center text-white font-black text-xl">03</div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">CAPITAL TRANSFER</h3>
                </div>
                <div className="pl-0 md:pl-16 space-y-4">
                   {/* Card */}
                   <label className={`block border-4 border-black p-6 cursor-pointer transition-all ${paymentMethod === 'card' ? 'bg-black text-white' : 'bg-stone-100 hover:bg-stone-200'}`}>
                      <div className="flex items-center space-x-4">
                        <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-6 h-6 border-4 border-black accent-rose-600" />
                        <span className="font-black text-xl tracking-widest uppercase">PLASTIC (CREDIT/DEBIT)</span>
                      </div>
                   </label>
                   
                   {paymentMethod === 'card' && (
                     <div className="grid grid-cols-2 gap-4 bg-stone-100 p-6 border-x-4 border-b-4 border-black -mt-6 pt-8">
                       <input type="text" placeholder="CARD SEQUENCE" className="col-span-2 bg-white border-4 border-black px-4 py-3 font-black uppercase focus:outline-none focus:border-rose-600 transition-all font-mono" />
                       <input type="text" placeholder="MM / YY" className="col-span-1 bg-white border-4 border-black px-4 py-3 font-black uppercase focus:outline-none focus:border-rose-600 transition-all font-mono" />
                       <input type="text" placeholder="CVV" className="col-span-1 bg-white border-4 border-black px-4 py-3 font-black uppercase focus:outline-none focus:border-rose-600 transition-all font-mono" />
                     </div>
                   )}

                   {/* Alternate */}
                   <label className={`block border-4 border-black p-6 cursor-pointer transition-all ${paymentMethod === 'alt' ? 'bg-yellow-400 text-black shadow-[6px_6px_0_0_#000]' : 'bg-stone-100 hover:bg-stone-200'}`}>
                      <div className="flex items-center space-x-4">
                        <input type="radio" value="alt" checked={paymentMethod === 'alt'} onChange={() => setPaymentMethod('alt')} className="w-6 h-6 border-4 border-black accent-black" />
                        <span className="font-black text-xl tracking-widest uppercase flex items-center">
                           APP WALLET <span className="ml-4 bg-black text-white text-[10px] px-2 py-1 rotate-3">FAST SECURE</span>
                        </span>
                      </div>
                   </label>
                </div>
              </section>

              {/* Submit Action */}
              <div className="pl-0 md:pl-16 pt-8">
                <button className="w-full bg-rose-600 text-white shadow-[12px_12px_0_0_#000] border-4 border-black hover:shadow-none hover:translate-y-3 hover:translate-x-3 py-6 text-3xl font-black transition-all flex justify-center items-center uppercase tracking-tighter">
                  AUTHORIZE SECURE TRANSFER
                </button>
              </div>

           </div>
        </main>

        {/* Right: Validation / Stash Summary */}
        <aside className="w-full lg:w-[40%] bg-stone-100 px-6 md:px-12 py-12 lg:py-20 relative lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto hide-scrollbar">
           
           <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 drop-shadow-[4px_4px_0_#facc15]">Stash Review</h2>
           
           <div className="space-y-6 mb-12">
             <div className="flex items-start justify-between bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#e11d48]">
               <div className="flex space-x-4">
                 <div className="relative w-24 h-24 bg-stone-200 border-4 border-black p-1 flex-shrink-0">
                   <Image src="/theme-previews/theme_urban_streetwear_1774979465750.png" alt="Obj" fill className="object-cover grayscale" />
                   <span className="absolute -top-3 -right-3 bg-yellow-400 text-black border-4 border-black w-8 h-8 flex items-center justify-center text-sm font-black transform rotate-12">1</span>
                 </div>
                 <div className="pt-1">
                   <h4 className="text-sm font-black uppercase leading-none mb-2">Heavyweight Box Logo Hoodie</h4>
                   <p className="text-[10px] font-black tracking-widest bg-black text-white inline-block px-2 py-1">SIZE: L</p>
                 </div>
               </div>
               <span className="text-xl font-black font-mono">$180</span>
             </div>
             
             <div className="flex items-start justify-between bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#e11d48]">
               <div className="flex space-x-4">
                 <div className="relative w-24 h-24 bg-stone-200 border-4 border-black p-1 flex-shrink-0">
                   <Image src="/theme-previews/streetwear_cart_page_1774979815431.png" alt="Obj" fill className="object-cover grayscale" />
                   <span className="absolute -top-3 -right-3 bg-yellow-400 text-black border-4 border-black w-8 h-8 flex items-center justify-center text-sm font-black transform rotate-12">1</span>
                 </div>
                 <div className="pt-1">
                   <h4 className="text-sm font-black uppercase leading-none mb-2">Tactical Cargo Pants</h4>
                   <p className="text-[10px] font-black tracking-widest bg-black text-white inline-block px-2 py-1">SIZE: M</p>
                 </div>
               </div>
               <span className="text-xl font-black font-mono">$220</span>
             </div>
           </div>

           {/* Discount Applier */}
           <div className="flex mb-12 border-4 border-black">
             <input type="text" placeholder="DISCOUNT / HYPE CODE" className="flex-1 bg-white px-4 py-3 font-black text-black focus:outline-none uppercase tracking-widest text-xs font-mono" />
             <button className="bg-black text-white px-6 font-black uppercase tracking-widest hover:bg-rose-600 transition-colors text-xs border-l-4 border-black border-transparent">PROCESS</button>
           </div>

           {/* Total Arithmetic */}
           <div className="space-y-4 mb-8 text-sm font-black uppercase tracking-widest text-stone-500">
              <div className="flex justify-between items-center bg-white border-2 border-black p-3">
                <span>Hard Subtotal</span>
                <span className="text-black font-mono text-lg">$400.00</span>
              </div>
              <div className="flex justify-between items-center bg-white border-2 border-black p-3 group hover:bg-yellow-400 hover:text-black transition-colors">
                <span>Global Logistics</span>
                <span className="text-black font-mono text-lg">$25.00</span>
              </div>
              <div className="flex justify-between items-center bg-white border-2 border-black p-3">
                <span>Tax Allocation</span>
                <span className="text-black font-mono text-lg">$32.00</span>
              </div>
            </div>

            <div className="bg-black text-white border-4 border-black p-6 flex justify-between items-end transform rotate-1 shadow-[8px_8px_0_0_#facc15]">
              <div className="flex flex-col">
                <span className="text-sm uppercase tracking-widest font-bold text-stone-400 mb-1">TOTAL DEDUCTION</span>
                <span className="text-[10px] font-mono text-yellow-500">USD CURRENCY</span>
              </div>
              <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                $457.00
              </span>
            </div>

        </aside>

      </div>
    </div>
  );
}
