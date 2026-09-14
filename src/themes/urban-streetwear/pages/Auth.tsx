"use client";

import React, { useState } from 'react';
import Link from "next/link";

export default function UrbanStreetwearAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-stone-100 text-black font-sans selection:bg-rose-600 selection:text-white flex flex-col md:flex-row border-[16px] border-black">
      
      {/* Branding Plate (Mobile Overlay / Desktop Left) */}
      <div className={`w-full md:w-[40%] bg-rose-600 border-b-8 md:border-b-0 md:border-r-8 border-black flex flex-col justify-between p-8 md:p-12 relative overflow-hidden order-2 md:order-1 ${isLogin ? 'bg-rose-600' : 'bg-yellow-400'} transition-colors duration-500`}>
         
         <div className="absolute inset-x-0 bottom-0 h-full opacity-20 bg-[radial-gradient(circle,_#000_3px,_transparent_3px)] bg-[size:15px_15px] pointer-events-none" />

         <Link href="/" className="text-4xl md:text-6xl font-black tracking-tighter uppercase transform -skew-x-6 z-10 text-black drop-shadow-[4px_4px_0_#fff]">
           SQUAD<br/>CRTEL
         </Link>

         <div className="z-10 mt-12 md:mt-0 max-w-sm border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000] rotate-2">
           <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4 text-black">
             {isLogin ? "RETURN TO BASE" : "JOIN THE SYNDICATE"}
           </h2>
           <p className="font-bold text-sm tracking-widest uppercase text-stone-600">
             {isLogin ? "Verify identity to secure your stored assets and history logs." : "Gain primary access privileges to exclusive season drops."}
           </p>
         </div>
         
         <div className="z-10 flex border-t-4 border-black pt-6 font-black uppercase tracking-widest text-xs justify-between">
           <span className="text-black">SYS.AUTH.2026</span>
           <span className="text-white bg-black px-2 py-1">SECURE</span>
         </div>
      </div>

      {/* Action Block (Desktop Right) */}
      <div className="w-full md:w-[60%] bg-stone-100 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative order-1 md:order-2">
         
         {/* Huge Tab Switcher */}
         <div className="flex mb-16 border-4 border-black bg-white font-black uppercase tracking-widest text-lg lg:text-3xl self-start overflow-hidden shadow-[8px_8px_0_0_#000]">
           <button 
             onClick={() => setIsLogin(true)} 
             className={`px-8 py-5 border-r-4 border-black transition-all ${isLogin ? 'bg-black text-white' : 'hover:bg-stone-200 text-stone-400'}`}
           >
             LOG_IN
           </button>
           <button 
             onClick={() => setIsLogin(false)} 
             className={`px-8 py-5 transition-all ${!isLogin ? 'bg-black text-white' : 'hover:bg-stone-200 text-stone-400'}`}
           >
             REGISTER
           </button>
         </div>

         {/* Form Area */}
         <div className="w-full max-w-xl">
           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              
              {!isLogin && (
                <div>
                  <label className="block text-sm font-black uppercase text-black mb-2 tracking-widest">Alias // Name</label>
                  <input type="text" placeholder="HYPEBEAST_01" required className="w-full bg-white border-4 border-black p-5 text-xl font-bold uppercase focus:outline-none focus:border-rose-600 transition-colors shadow-[0_4px_0_0_#000] focus:translate-y-1 focus:shadow-none" />
                </div>
              )}

              <div>
                <label className="block text-sm font-black uppercase text-black mb-2 tracking-widest">Comms // Email</label>
                <input type="email" placeholder="ACCESS@DOMAIN.COM" required className="w-full bg-white border-4 border-black p-5 text-xl font-bold uppercase focus:outline-none focus:border-rose-600 transition-colors shadow-[0_4px_0_0_#000] focus:translate-y-1 focus:shadow-none" />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                   <label className="block text-sm font-black uppercase text-black tracking-widest">Secret // Password</label>
                   {isLogin && <a href="#" className="text-xs font-bold uppercase text-rose-600 hover:text-black hover:bg-rose-600 hover:px-2 transition-all">Recover Key?</a>}
                </div>
                <input type="password" placeholder="••••••••" required className="w-full bg-white border-4 border-black p-5 text-xl font-black tracking-[0.5em] focus:outline-none focus:border-rose-600 transition-colors shadow-[0_4px_0_0_#000] focus:translate-y-1 focus:shadow-none" />
              </div>

              {!isLogin && (
                <div className="flex items-start space-x-3 py-4">
                   <input type="checkbox" id="terms" required className="mt-1 w-6 h-6 border-4 border-black bg-white accent-black cursor-pointer rounded-none" />
                   <label htmlFor="terms" className="text-xs font-bold uppercase tracking-widest text-stone-600 leading-relaxed cursor-pointer select-none">
                     I ACCEPT THE RULES OF ENGAGEMENT AND LOGISTICS T&C LAID OUT BY THE SYNDICATE.
                   </label>
                </div>
              )}

              <button type="submit" className="w-full bg-black text-white hover:bg-rose-600 border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 active:translate-y-2 active:shadow-none py-6 text-3xl font-black tracking-tighter uppercase transition-all mt-8">
                 {isLogin ? "EXECUTE LOGIN" : "CREATE IDENTITY"}
              </button>
           </form>

           <div className="mt-16 flex items-center justify-between opacity-50">
              <span className="flex-1 w-full border-b-4 border-black"></span>
              <span className="px-6 text-sm font-black uppercase tracking-widest text-black">OR THIRD PARTY LINK</span>
              <span className="flex-1 w-full border-b-4 border-black"></span>
           </div>

           <div className="mt-10 grid grid-cols-2 gap-6">
              <button className="flex justify-center items-center py-5 bg-white border-4 border-black hover:bg-black hover:text-white text-black font-black uppercase text-sm tracking-widest transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                 Google Connect
              </button>
              <button className="flex justify-center items-center py-5 bg-white border-4 border-black hover:bg-black hover:text-white text-black font-black uppercase text-sm tracking-widest transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:shadow-none">
                Apple Connect
              </button>
           </div>
         </div>

      </div>
    </div>
  );
}
