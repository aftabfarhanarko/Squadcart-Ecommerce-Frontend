"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function CozyHomeAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-sans selection:bg-[#B5835A] selection:text-white flex flex-col md:flex-row">
      
      {/* Decorative Image Panel (Left on Desktop) */}
      <div className="hidden md:block md:w-[45%] lg:w-[50%] relative overflow-hidden order-2 md:order-1">
         <Image 
           src={isLogin ? "/theme-previews/cozy_product_page_1774979839134.png" : "/theme-previews/theme_cozy_home_1774979483839.png"} 
           alt="Interior" 
           fill 
           className="object-cover transition-opacity duration-1000 ease-in-out" 
         />
         <div className="absolute inset-0 bg-[#4A4238]/10"></div>
         
         <div className="absolute top-10 left-10">
           <Link href="/" className="text-2xl font-serif text-white tracking-tight drop-shadow-md hover:opacity-80 transition-opacity">
            NORDIC<span className="italic">HAVEN</span>
           </Link>
         </div>
      </div>

      {/* Form Area (Right on Desktop) */}
      <div className="w-full md:w-[55%] lg:w-[50%] bg-[#FDFBF7] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16 order-1 md:order-2">
         
         {/* Mobile Header fallback */}
         <Link href="/" className="md:hidden text-2xl font-serif text-[#4A4238] tracking-tight mb-16 text-center block">
           NORDIC<span className="italic text-[#B5835A]">HAVEN</span>
         </Link>

         <div className="max-w-md mx-auto md:mx-0 w-full">
           
           <h1 className="text-3xl md:text-5xl font-serif text-[#4A4238] mb-4">
             {isLogin ? "Welcome back." : "Create an account."}
           </h1>
           <p className="text-[#706B65] text-sm leading-relaxed mb-10">
             {isLogin ? "Sign in to view your orders, track deliveries, and save your favorite pieces." : "Join our community to access exclusive collections and curated design inspirations."}
           </p>

           <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#A39E98] mb-2 px-1">Full Name</label>
                  <input type="text" required className="w-full bg-[#F4F1EB] rounded-full px-6 py-4 text-sm text-[#4A4238] focus:outline-none focus:ring-2 focus:ring-[#B5835A]/50 transition-all border border-transparent focus:bg-white" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-[#A39E98] mb-2 px-1">Email Address</label>
                <input type="email" required className="w-full bg-[#F4F1EB] rounded-full px-6 py-4 text-sm text-[#4A4238] focus:outline-none focus:ring-2 focus:ring-[#B5835A]/50 transition-all border border-transparent focus:bg-white" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 px-1">
                   <label className="block text-xs font-bold uppercase tracking-widest text-[#A39E98]">Password</label>
                   {isLogin && <a href="#" className="text-xs text-[#706B65] hover:text-[#B5835A] transition-colors border-b border-transparent hover:border-[#B5835A]">Forgot password?</a>}
                </div>
                <input type="password" required className="w-full bg-[#F4F1EB] rounded-full px-6 py-4 text-sm text-[#4A4238] focus:outline-none focus:ring-2 focus:ring-[#B5835A]/50 transition-all border border-transparent focus:bg-white" />
              </div>

              <button type="submit" className="w-full bg-[#4A4238] hover:bg-[#322c25] text-white rounded-full py-4 text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-8">
                 {isLogin ? "Sign In" : "Create Account"}
              </button>
           </form>

           <div className="mt-8 text-center text-sm text-[#706B65]">
              {isLogin ? (
                <span>Don't have an account? <button onClick={() => setIsLogin(false)} className="font-bold text-[#4A4238] hover:text-[#B5835A] transition-colors pb-0.5 border-b border-[#4A4238] hover:border-[#B5835A]">Register here</button></span>
              ) : (
                <span>Already have an account? <button onClick={() => setIsLogin(true)} className="font-bold text-[#4A4238] hover:text-[#B5835A] transition-colors pb-0.5 border-b border-[#4A4238] hover:border-[#B5835A]">Sign in</button></span>
              )}
           </div>

           <div className="mt-12 relative flex items-center justify-center">
              <span className="w-full border-t border-[#E5E0D8]"></span>
              <span className="absolute bg-[#FDFBF7] px-4 text-[10px] font-bold uppercase tracking-widest text-[#A39E98]">Or continue with</span>
           </div>

           <div className="mt-10 grid grid-cols-2 gap-4">
              <button className="flex justify-center items-center py-3.5 bg-white border border-[#E5E0D8] rounded-full hover:bg-[#F4F1EB] text-[#4A4238] font-medium text-sm transition-colors">
                 Google
              </button>
              <button className="flex justify-center items-center py-3.5 bg-white border border-[#E5E0D8] rounded-full hover:bg-[#F4F1EB] text-[#4A4238] font-medium text-sm transition-colors">
                Apple
              </button>
           </div>
         </div>

      </div>
    </div>
  );
}
