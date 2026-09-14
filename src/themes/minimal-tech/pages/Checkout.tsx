"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function MinimalTechCheckout() {
  const [paymentMethod, setPaymentMethod] = useState("crypto");

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-500/30 flex flex-col">
      {/* Checkout Navbar */}
      <nav className="border-b border-cyan-500/20 py-5 px-8 flex justify-center items-center bg-[#050B14] shadow-[0_4px_30px_rgba(6,182,212,0.05)]">
        <div className="flex items-center space-x-4">
           <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
           <h1 className="text-sm font-mono text-cyan-400 tracking-widest uppercase">Encrypted Tunnel // Checkout_Protocol</h1>
        </div>
      </nav>

      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1">
        
        {/* Left: Shipping & Billing Forms */}
        <main className="lg:col-span-7 px-8 md:px-16 py-12 lg:border-r border-slate-800">
           <h2 className="text-2xl font-black text-white tracking-tight mb-10">Data Delivery Matrix</h2>
           
           <div className="space-y-12 max-w-2xl bg-[#0A1121] p-8 border border-slate-800 rounded-2xl">
              
              {/* Contact Node */}
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-cyan-500 uppercase flex items-center">
                     <span className="w-1.5 h-1.5 bg-cyan-500 mr-2 rounded-full" /> User Node
                  </h3>
                  <Link href="/login" className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors">Authenticate</Link>
                </div>
                <div className="space-y-4">
                  <input type="email" placeholder="Email / Uplink Address" className="w-full bg-[#050B14] border border-slate-700 focus:border-cyan-500 rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] font-mono" />
                </div>
              </section>

              {/* Physical Logistics */}
              <section>
                <h3 className="text-sm font-bold text-cyan-500 uppercase flex items-center mb-6">
                   <span className="w-1.5 h-1.5 bg-cyan-500 mr-2 rounded-full" /> Physical Logistics Grid
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="col-span-1 bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                  <input type="text" placeholder="Last Name" className="col-span-1 bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                  <input type="text" placeholder="Coordinates / Street Address" className="col-span-2 bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                  <div className="col-span-2 grid grid-cols-3 gap-4">
                     <input type="text" placeholder="City Sector" className="col-span-1 bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                     <input type="text" placeholder="Region" className="col-span-1 bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                     <input type="text" placeholder="Zip/Code" className="col-span-1 bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                  </div>
                </div>
              </section>

              {/* Secure Payment Handshake */}
              <section>
                <h3 className="text-sm font-bold text-cyan-500 uppercase flex items-center mb-6">
                   <span className="w-1.5 h-1.5 bg-cyan-500 mr-2 rounded-full" /> Encrypted Transaction
                </h3>
                <div className="space-y-4">
                   <label className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border ${paymentMethod === 'card' ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-700 bg-[#050B14] hover:border-slate-500'}`}>
                      <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-cyan-500 w-4 h-4 mr-4" />
                      <span className="text-sm font-bold text-slate-200">Standard Fiat (Credit/Debit)</span>
                   </label>
                   
                   {paymentMethod === 'card' && (
                     <div className="grid grid-cols-2 gap-4 mt-2 bg-[#050B14] p-6 rounded-lg border border-slate-800">
                       <input type="text" placeholder="Card Sequence" className="col-span-2 bg-[#0A1121] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                       <input type="text" placeholder="EXP (MM/YY)" className="col-span-1 bg-[#0A1121] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                       <input type="text" placeholder="CVC" className="col-span-1 bg-[#0A1121] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono" />
                     </div>
                   )}

                   <label className={`flex items-center p-4 rounded-lg cursor-pointer transition-all border ${paymentMethod === 'crypto' ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'border-slate-700 bg-[#050B14] hover:border-slate-500'}`}>
                      <input type="radio" value="crypto" checked={paymentMethod === 'crypto'} onChange={() => setPaymentMethod('crypto')} className="accent-cyan-500 w-4 h-4 mr-4" />
                      <span className="text-sm font-bold text-slate-200 flex items-center">
                         Web3 Crypto Execution <span className="ml-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-[10px] px-2 py-0.5 rounded font-black">FAST</span>
                      </span>
                   </label>

                   {paymentMethod === 'crypto' && (
                     <div className="mt-2 bg-[#050B14] p-6 rounded-lg border border-slate-800 text-center">
                       <svg className="w-12 h-12 text-cyan-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                       <p className="text-sm text-slate-400 font-mono">MetaMask / WalletConnect verification will prompt on compile.</p>
                     </div>
                   )}
                </div>
              </section>

              {/* Submit Action */}
              <div className="pt-6">
                <button className="w-full bg-cyan-500 text-[#050B14] py-4 rounded-lg text-sm font-black tracking-widest uppercase hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex justify-center items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Execute Compilation Handshake
                </button>
              </div>

           </div>
        </main>

        {/* Right: Validation Summary Details */}
        <aside className="lg:col-span-5 px-8 md:px-12 py-12 bg-gradient-to-b from-[#050B14] to-[#0A1121]">
           <div className="sticky top-8 bg-[#0A1121] border border-cyan-500/20 p-6 rounded-2xl">
             <h3 className="text-xs font-mono tracking-widest text-cyan-500 uppercase border-b border-slate-800 pb-4 mb-6">Verification Block</h3>
             
             {/* Mocked Payload */}
             <div className="space-y-4 mb-8">
               <div className="flex items-center justify-between p-3 bg-[#050B14] border border-slate-800 rounded-lg">
                 <div className="flex items-center space-x-4">
                   <div className="relative w-12 h-12 bg-slate-900 border border-slate-700 rounded p-1">
                     <Image src="/theme-previews/theme_minimal_tech_1774979358706.png" alt="Pdt" fill className="object-cover opacity-80" />
                   </div>
                   <div>
                     <h4 className="text-xs font-bold text-slate-200">Quantum Mech. Keyboard</h4>
                     <p className="text-[10px] text-slate-500 font-mono mt-1 w-20 truncate">ID: QNK-800</p>
                   </div>
                 </div>
                 <span className="text-sm font-bold text-cyan-400 font-mono">$349.99</span>
               </div>
               
               <div className="flex items-center justify-between p-3 bg-[#050B14] border border-slate-800 rounded-lg">
                 <div className="flex items-center space-x-4">
                   <div className="relative w-12 h-12 bg-slate-900 border border-slate-700 rounded p-1">
                     <Image src="/theme-previews/tech_checkout_page_1774979751065.png" alt="Pdt" fill className="object-cover opacity-80" />
                   </div>
                   <div>
                     <h4 className="text-xs font-bold text-slate-200">Neural Link Headset</h4>
                     <p className="text-[10px] text-slate-500 font-mono mt-1 w-20 truncate">ID: NXP-450</p>
                   </div>
                 </div>
                 <span className="text-sm font-bold text-cyan-400 font-mono">$899.00</span>
               </div>
             </div>

             {/* Hardware Coupon Node */}
             <div className="flex space-x-2 mb-8">
               <input type="text" placeholder="Input Access Key" className="flex-1 bg-[#050B14] border border-cyan-500/30 focus:border-cyan-400 rounded-lg px-4 py-2 text-sm text-cyan-400 placeholder-slate-600 focus:outline-none font-mono" />
               <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg text-xs font-bold uppercase hover:bg-slate-700 transition-colors">Decrypt</button>
             </div>

             {/* Server Costs Breakdown */}
             <div className="space-y-3 mb-6 text-sm font-medium text-slate-400 p-4 bg-[#050B14] rounded-lg border border-slate-800 border-l-4 border-l-slate-700">
                <div className="flex justify-between">
                  <span>Hardware Sequence</span>
                  <span className="font-mono text-slate-200">$1248.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics Pipeline</span>
                  <span className="font-mono text-slate-200">$15.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Network Taxes</span>
                  <span className="font-mono text-slate-200">$62.45</span>
                </div>
              </div>

              <div className="pt-6 border-t border-cyan-500/20 flex justify-between items-end">
                <div>
                   <span className="text-xs font-mono tracking-widest uppercase text-cyan-500 block mb-1">Final Authorization</span>
                </div>
                <span className="text-3xl font-black text-white"><span className="text-sm text-cyan-600 mr-2 font-mono">USD</span>$1326.44</span>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
}
