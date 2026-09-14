"use client";

import React, { useState } from 'react';
import Link from "next/link";

export default function LuxuryFashionAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-serif selection:bg-amber-500/30 flex flex-col">
      {/* Auth Navbar */}
      <nav className="border-b border-zinc-800/80 py-6 px-8 flex justify-center items-center bg-black/90">
        <Link href="/" className="text-2xl tracking-widest text-amber-500 uppercase font-light">Squadcart Luxury</Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden h-full md:h-auto min-h-[600px]">
          
          {/* Animated Transition Overlay */}
          <div className={`hidden md:flex absolute top-0 bottom-0 w-1/2 bg-black z-10 transition-transform duration-700 ease-in-out border-x border-amber-500/20 items-center justify-center text-center p-12 ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}>
            <div className="space-y-8">
              <h2 className="text-3xl font-light tracking-[0.2em] text-white uppercase">{isLogin ? "Join The Club" : "Welcome Back"}</h2>
              <p className="text-sm tracking-widest text-zinc-400 font-sans leading-relaxed">
                {isLogin 
                  ? "Create an account to gain access to exclusive pieces, early access drops, and personalized tailoring services." 
                  : "Sign in to access your curated collections, track orders, and experience personalized styling."}
              </p>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="px-12 py-4 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300"
              >
                {isLogin ? "Register Now" : "Sign In"}
              </button>
            </div>
          </div>

          {/* Left: Login Form */}
          <div className="p-12 md:p-16 flex flex-col justify-center h-full">
             <div className="mb-12 text-center md:text-left">
               <h3 className="text-2xl tracking-[0.2em] font-light text-white uppercase mb-4">Log In</h3>
               <p className="text-xs text-zinc-500 tracking-widest uppercase">Access your private collection</p>
             </div>

             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                  <input type="email" required className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors font-sans" />
               </div>
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <label className="block text-[10px] uppercase tracking-widest text-zinc-500">Password</label>
                     <a href="#" className="text-[10px] tracking-widest text-amber-500 hover:text-amber-400 uppercase transition-colors">Forgot?</a>
                  </div>
                  <input type="password" required className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors font-sans" />
               </div>

               <button type="submit" className="w-full bg-amber-500 text-black py-4 mt-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-400 transition-colors">
                  Log In
               </button>
             </form>

             <div className="mt-8 relative flex items-center justify-center">
                <span className="w-full border-t border-zinc-800"></span>
                <span className="absolute bg-zinc-900 px-4 text-[10px] text-zinc-500 tracking-widest leading-none uppercase">Or Continue With</span>
             </div>

             <div className="mt-8 flex gap-4">
                <button className="flex-1 py-3 border border-zinc-800 hover:border-amber-500 text-zinc-400 hover:text-amber-500 transition-colors flex justify-center items-center">
                   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                </button>
                <button className="flex-1 py-3 border border-zinc-800 hover:border-amber-500 text-zinc-400 hover:text-amber-500 transition-colors flex justify-center items-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.626 4.288c.633-.768 1.059-1.84.945-2.912-1.002.04-2.193.633-2.859 1.433-.6.713-1.088 1.803-.949 2.852 1.056.082 2.193-.564 2.863-1.373zM14.075 22.06c-1.341.011-2.103-.836-3.33-.836-1.259 0-2.352.887-3.351.887-1.314 0-2.52-1.43-3.344-2.853-1.687-2.909-3.058-8.23-1.34-11.233 1.053-1.84 2.87-2.955 4.887-2.955 1.54 0 2.812.986 3.903.986 1.134 0 2.502-1.026 4.145-1.026 1.708 0 3.253.818 4.256 2.174-3.568 2.053-2.95 6.945.545 8.356-1.006 2.653-2.607 5.176-4.28 5.176-1.037.001-1.625-.675-2.09-.675h-.001z"/></svg>
                </button>
             </div>

             {/* Mobile Only Toggle */}
             <div className="md:hidden mt-8 text-center text-xs text-zinc-500 tracking-widest uppercase">
                Don't have an account? <span onClick={() => setIsLogin(false)} className="text-amber-500 cursor-pointer underline">Register</span>
             </div>
          </div>

          {/* Right: Register Form */}
          <div className="p-12 md:p-16 flex flex-col justify-center bg-black/50 h-full border-l border-zinc-800">
             <div className="mb-12 text-center md:text-left">
               <h3 className="text-2xl tracking-[0.2em] font-light text-white uppercase mb-4">Create Account</h3>
               <p className="text-xs text-zinc-500 tracking-widest uppercase">Join the highest tier</p>
             </div>

             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Full Name</label>
                  <input type="text" required className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors font-sans" />
               </div>
               <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Email Address</label>
                  <input type="email" required className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors font-sans" />
               </div>
               <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Password</label>
                  <input type="password" required className="w-full bg-black border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors font-sans" />
               </div>

               <div className="flex items-start space-x-3 text-xs tracking-wider text-zinc-400 mt-6">
                 <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 bg-zinc-900 border-zinc-800 accent-amber-500" />
                 <label htmlFor="terms" className="leading-relaxed">I agree to the <Link href="/terms" className="text-amber-500 hover:text-amber-400 transition-colors">Terms of Service</Link> & <Link href="/privacy" className="text-amber-500 hover:text-amber-400 transition-colors">Privacy Policy</Link></label>
               </div>

               <button type="submit" className="w-full border border-amber-500 text-amber-500 py-4 mt-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-500 hover:text-black transition-colors">
                  Create Account
               </button>
             </form>

             {/* Mobile Only Toggle */}
             <div className="md:hidden mt-8 text-center text-xs text-zinc-500 tracking-widest uppercase">
                Already have an account? <span onClick={() => setIsLogin(true)} className="text-amber-500 cursor-pointer underline">Log In</span>
             </div>
          </div>
        </div>
      </main>

    </div>
  );
}
