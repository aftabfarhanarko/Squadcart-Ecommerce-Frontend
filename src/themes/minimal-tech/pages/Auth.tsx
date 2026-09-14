"use client";

import React, { useState } from 'react';
import Link from "next/link";

export default function MinimalTechAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-500/30 flex flex-col items-center justify-center p-4 lg:p-12 relative overflow-hidden">
      
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] z-[0] opacity-40 pointer-events-none" />

      {/* Main Terminal UI */}
      <div className="w-full max-w-4xl bg-[#0A1121]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.1)] z-10 overflow-hidden flex flex-col md:flex-row relative">
         
         {/* Moving Terminal Overlay */}
         <div className={`hidden md:flex flex-col items-center justify-center absolute top-0 bottom-0 w-1/2 bg-gradient-to-b from-cyan-600 to-blue-600 z-20 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) p-10 shadow-2xl ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}>
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight shadow-cyan-900 drop-shadow-lg text-center">
              {isLogin ? "NEW_PROTOCOL" : "SYSTEM_RESTORE"}
            </h2>
            <p className="text-cyan-100 font-mono text-xs text-center mb-10 leading-relaxed bg-black/20 p-4 rounded-lg border border-white/20">
               {isLogin 
                 ? "// INITIATE ROOT ACCESS. Create your identity node. Gain level-1 clearance to exclusive hardware frameworks and priority execution limits."
                 : "// RE-ESTABLISH CONNECTION. Authenticate your node to retrieve stored matrices, track physical logistics, and execute 1-click payload mounts."}
            </p>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="px-8 py-3 bg-white/10 hover:bg-white text-white hover:text-cyan-800 border border-white font-bold tracking-widest text-xs uppercase rounded-lg transition-all"
            >
              {isLogin ? "Initialize Node" : "Authenticate Proxy"}
            </button>
         </div>

         {/* Left Side: Login Protocol */}
         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center min-h-[550px]">
            <div className="mb-10 text-center md:text-left">
               <h3 className="text-2xl font-black text-white tracking-tight flex items-center md:items-start md:justify-start justify-center">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mr-3 animate-pulse" /> Authentication
               </h3>
               <p className="text-xs text-cyan-600 font-mono mt-2">// ENTER CREDENTIALS TO SYNC</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
               <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-2">Node Handle / Email</label>
                  <input type="email" required className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-sm text-cyan-400 focus:outline-none focus:border-cyan-500 font-mono transition-colors" />
               </div>
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <label className="block text-[10px] font-mono uppercase text-slate-500">Security Key</label>
                     <a href="#" className="text-[10px] font-mono text-cyan-500 hover:text-cyan-400 transition-colors underline">Bypass?</a>
                  </div>
                  <input type="password" required className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-3 text-sm text-cyan-400 focus:outline-none focus:border-cyan-500 font-mono transition-colors" />
               </div>

               <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#050B14] py-3 rounded-lg text-sm font-black tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] mt-4">
                  Deploy Root SYNC
               </button>
            </form>

            <div className="mt-8 flex items-center justify-between">
               <span className="w-1/3 border-b border-slate-800"></span>
               <span className="text-[10px] font-mono text-slate-600">OR OAUTH_ID</span>
               <span className="w-1/3 border-b border-slate-800"></span>
            </div>

            <div className="mt-6 flex gap-3">
               <button className="flex-1 bg-[#050B14] border border-slate-700 hover:border-cyan-500 text-slate-400 py-2.5 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
               </button>
               <button className="flex-1 bg-[#050B14] border border-slate-700 hover:border-cyan-500 text-slate-400 py-2.5 rounded-lg flex items-center justify-center transition-colors">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
               </button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden mt-8 text-center text-[10px] font-mono text-slate-500">
               NO NODE ESTABLISHED? <span onClick={() => setIsLogin(false)} className="text-cyan-500 cursor-pointer border-b border-cyan-500 ml-1 pb-0.5">INITIALIZE_NEW</span>
            </div>
         </div>

         {/* Right Side: Registration Protocol */}
         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center min-h-[550px] bg-[#050B14]/30 border-l border-slate-800">
            <div className="mb-10 text-center md:text-left">
               <h3 className="text-2xl font-black text-white tracking-tight flex items-center md:items-start md:justify-start justify-center">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mr-3 animate-[ping_1.5s_infinite]" /> Registration
               </h3>
               <p className="text-xs text-cyan-600 font-mono mt-2">// CREATE IDENTITY INSTANCE</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
               <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">User Handle / Alias</label>
                  <input type="text" required className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-cyan-400 focus:outline-none focus:border-cyan-500 font-mono transition-colors" />
               </div>
               <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Origin Node / Email</label>
                  <input type="email" required className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-cyan-400 focus:outline-none focus:border-cyan-500 font-mono transition-colors" />
               </div>
               <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5">Compile Passkey</label>
                  <input type="password" required className="w-full bg-[#050B14] border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-cyan-400 focus:outline-none focus:border-cyan-500 font-mono transition-colors" />
               </div>

               <div className="flex items-start bg-cyan-900/10 p-3 rounded border border-cyan-500/20 mt-4">
                 <input type="checkbox" id="terms" required className="mt-1 w-3.5 h-3.5 bg-[#050B14] border-slate-700 accent-cyan-500 rounded" />
                 <label htmlFor="terms" className="ml-3 text-[10px] font-mono text-cyan-600/80 leading-snug">
                   ACKNOWLEDGE EULA PROTOCOL: BY INITIATING THIS SEQUENCE YOU AGREE TO TERMINAL <Link href="/terms" className="text-cyan-400 underline">TERMS_OF_SYS</Link> & <Link href="/privacy" className="text-cyan-400 underline">DATA_PRIVACY</Link>.
                 </label>
               </div>

               <button type="submit" className="w-full border-2 border-cyan-500 text-cyan-500 py-3 rounded-lg text-sm font-black tracking-widest uppercase hover:bg-cyan-500 hover:text-[#050B14] transition-all mt-4">
                  Construct Identity
               </button>
            </form>

            {/* Mobile Toggle */}
            <div className="md:hidden mt-8 text-center text-[10px] font-mono text-slate-500">
               NODE PRE-EXISTING? <span onClick={() => setIsLogin(true)} className="text-cyan-500 cursor-pointer border-b border-cyan-500 ml-1 pb-0.5">AUTH_NOW</span>
            </div>
         </div>

      </div>

      {/* Return Home HUD link */}
      <Link href="/" className="fixed bottom-6 left-8 text-xs font-mono text-slate-600 hover:text-cyan-500 flex items-center transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        ABORT_SEQUENCE
      </Link>
    </div>
  );
}
