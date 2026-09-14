"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function OrganicGroceryAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-emerald-50 text-slate-800 font-sans selection:bg-emerald-500/30 flex flex-col border-t-[8px] border-emerald-500 relative overflow-hidden">
      
      {/* Decorative Background Leaves */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-40 -right-20 w-72 h-72 bg-emerald-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-green-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      {/* Fresh Navbar */}
      <nav className="py-6 px-8 flex justify-center items-center z-10 relative">
        <Link href="/" className="text-3xl font-black text-emerald-800 tracking-tight flex items-center space-x-2">
          <span>Squadcart<span className="text-emerald-500">Fresh</span></span>
        </Link>
      </nav>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 z-10 relative pb-20">
        
        <div className="w-full max-w-[450px] bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(5,150,105,0.15)] border border-white p-8 md:p-10 relative overflow-hidden">
           
           {/* Card Background Pattern */}
           <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE2LCAxODUsIDEyOSwgMC4yKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] pointer-events-none" />

           {/* Switcher Toggle */}
           <div className="flex bg-slate-100 p-1 rounded-full mb-10 relative z-10">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all ${isLogin ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                 Log In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all ${!isLogin ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                 Register
              </button>
           </div>

           {/* Form Area */}
           <div className="relative z-10">
             <div className="text-center mb-8">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isLogin 
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    }
                  </svg>
               </div>
               <h2 className="text-2xl font-black text-slate-800 tracking-tight">{isLogin ? "Welcome Back" : "Join Our Farm"}</h2>
               <p className="text-sm text-slate-500 font-medium mt-1">
                 {isLogin ? "Access your saved baskets and delivery history." : "Create an account for fresh daily groceries."}
               </p>
             </div>

             {/* Single Unified Form logic using state */}
             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                   <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Full Name</label>
                      <input type="text" placeholder="John Doe" required className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none transition-all" />
                   </div>
                )}
                
                <div>
                   <label className="block text-xs font-bold text-slate-600 mb-1 ml-1">Email Address</label>
                   <input type="email" placeholder="john@example.com" required className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none transition-all" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1 ml-1 mr-1">
                     <label className="block text-xs font-bold text-slate-600">Password</label>
                     {isLogin && <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Forgot?</a>}
                  </div>
                  <input type="password" placeholder="••••••••" required className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 rounded-xl px-4 py-3.5 text-sm text-slate-800 focus:outline-none transition-all" />
                </div>

                {!isLogin && (
                  <div className="flex items-start space-x-3 text-xs font-medium text-slate-500 mt-2 px-1">
                     <input type="checkbox" id="terms" required className="mt-0.5 w-4 h-4 bg-slate-50 border-slate-300 rounded focus:ring-emerald-500 accent-emerald-500" />
                     <label htmlFor="terms">I agree to the <Link href="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link> & <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link></label>
                  </div>
                )}

                <button type="submit" className="w-full bg-emerald-500 text-white shadow-[0_8px_20px_rgba(5,150,105,0.2)] hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)] hover:-translate-y-0.5 mt-6 py-4 rounded-full text-base font-black transition-all">
                   {isLogin ? "Sign In" : "Create Account"}
                </button>
             </form>

             <div className="mt-8 relative flex items-center justify-center">
                <span className="w-full border-t border-slate-200"></span>
                <span className="absolute bg-white px-4 text-xs font-bold text-slate-400 tracking-wide">OR CONTINUE WITH</span>
             </div>

             <div className="mt-8 grid grid-cols-2 gap-3">
                <button className="flex justify-center items-center py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 font-bold text-sm transition-colors shadow-sm">
                   <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                   Google
                </button>
                <button className="flex justify-center items-center py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 font-bold text-sm transition-colors shadow-sm">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  SSO
                </button>
             </div>
           </div>

        </div>
      </main>

    </div>
  );
}
