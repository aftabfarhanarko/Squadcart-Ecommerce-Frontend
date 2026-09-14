"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

// Mocking terminal-style cart state
const SYSTEM_CART = [
  {
    id: 1,
    name: "Quantum Mechanical Keyboard",
    price: 349.99,
    quantity: 1,
    sku: "QNK-800",
    thumbnail: "/theme-previews/theme_minimal_tech_1774979358706.png",
  },
  {
    id: 2,
    name: "Neural Link Headset Pro",
    price: 899.00,
    quantity: 1,
    sku: "NXP-450",
    thumbnail: "/theme-previews/tech_checkout_page_1774979751065.png",
  }
];

export default function MinimalTechCart() {
  const [cartItems, setCartItems] = useState(SYSTEM_CART);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const dataTax = subtotal * 0.05; // "Data tax" aesthetic
  const logistics = subtotal > 0 ? 15 : 0; // "Logistics fee" equivalent to shipping
  const total = subtotal + dataTax + logistics;

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-500/30 flex flex-col">
      {/* Hyper-Modern Navbar */}
      <nav className="border-b border-cyan-500/20 py-5 px-8 flex justify-between items-center bg-[#050B14]/80 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="text-xl font-black tracking-tight text-white flex items-center space-x-2">
          <span className="text-cyan-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.1L18.4 19H5.6L12 6.1z"/></svg>
          </span>
          <span>TECHNO<span className="text-cyan-500">VERSE</span></span>
        </Link>
        <div className="space-x-8 text-sm font-medium tracking-wide text-slate-400 hidden md:block">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Setup</Link>
          <Link href="/shop" className="hover:text-cyan-400 transition-colors">Hardware</Link>
          <Link href="/cart" className="text-cyan-400 transition-colors">Payload buffer</Link>
        </div>
      </nav>

      {/* Cyberpunk Page Header */}
      <header className="py-12 bg-[#0A1121] border-b border-cyan-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] z-[0] opacity-30" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between">
           <div>
              <div className="flex items-center space-x-2 text-cyan-500 mb-2 font-mono text-xs">
                 <span>//</span> <span>MEMORY</span> <span>/</span> <span>BUFFER</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Active Payload</h1>
           </div>
           
           <div className="hidden lg:flex items-center space-x-3 text-cyan-500 font-mono text-sm border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 rounded">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-[ping_2s_ease-out_infinite]" />
              <span className="tracking-widest uppercase">Buffer Size: {cartItems.length} Blocks</span>
           </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 md:px-16 py-12 flex flex-col lg:flex-row gap-8 flex-1 w-full">
        
        {/* Cart Ledger */}
        <div className="flex-1">
          {cartItems.length > 0 ? (
            <div className="bg-[#0A1121] border border-cyan-500/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.05)]">
               
               {/* Ledger Header */}
               <div className="grid grid-cols-12 bg-[#050B14] border-b border-cyan-500/20 px-6 py-4 text-xs font-mono text-cyan-500 uppercase tracking-widest">
                  <div className="col-span-6">Identifier // Node</div>
                  <div className="col-span-2 text-center">Protocol Cost</div>
                  <div className="col-span-2 text-center">Multiplier</div>
                  <div className="col-span-2 text-right">Compute Ttl.</div>
               </div>

               {/* Cart Items Iteration */}
               <div className="divide-y divide-slate-800">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 px-6 py-6 group hover:bg-[#050B14] transition-colors">
                      {/* Hardware Info */}
                      <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                        <div className="relative w-20 h-20 bg-slate-900 border border-slate-700 rounded-lg p-2 group-hover:border-cyan-500/50 transition-colors flex-shrink-0">
                          <Image src={item.thumbnail} alt={item.name} fill className="object-cover opacity-80" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-slate-500">ID: {item.sku}</p>
                          <h3 className="text-sm font-bold text-white mb-2">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-[10px] font-mono text-red-400 hover:text-red-300 transition-colors flex items-center">
                             <span className="mr-1">[x]</span> TERMINATE_NODE
                          </button>
                        </div>
                      </div>

                      {/* Price Code */}
                      <div className="col-span-1 md:col-span-2 text-center font-mono text-slate-400 text-sm hidden md:block">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Multiplier / Quantity */}
                      <div className="col-span-1 md:col-span-2 flex justify-center">
                        <div className="flex items-center bg-[#050B14] border border-slate-700 rounded overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-cyan-500 hover:bg-slate-800 font-bold">-</button>
                          <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-cyan-500 hover:bg-slate-800 font-bold">+</button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-span-1 md:col-span-2 text-right font-mono text-cyan-400 font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          ) : (
             <div className="py-24 text-center bg-[#0A1121] border border-slate-800 rounded-xl">
               <div className="w-16 h-16 mx-auto mb-6 text-slate-700">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
               </div>
               <h3 className="text-xl font-mono text-cyan-600 mb-2">ERR: buffer_empty</h3>
               <p className="text-slate-500 mb-8 max-w-md mx-auto text-sm">Your payload memory buffer is currently devoid of hardware sequences.</p>
               <Link href="/shop" className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#050B14] text-sm font-bold tracking-wider uppercase rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                 Initiate Catalog Ping
               </Link>
             </div>
          )}
        </div>

        {/* System Diagnostics / Total */}
        <aside className="w-full lg:w-96 flex-shrink-0">
           <div className="bg-[#0A1121] border border-cyan-500/30 rounded-xl p-6 shadow-[inset_0_0_30px_rgba(6,182,212,0.05)] sticky top-32">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center border-b border-slate-800 pb-4">
                <svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Execution Summary
              </h2>
              
              <div className="space-y-4 mb-6 text-sm font-medium text-slate-400">
                <div className="flex justify-between">
                  <span>Base Compute</span>
                  <span className="font-mono text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Logistics Protocol</span>
                  <span className="font-mono text-slate-200">${logistics.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Taxes</span>
                  <span className="font-mono text-slate-200">${dataTax.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-[#050B14] border border-slate-700 p-4 rounded-lg mb-8">
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-cyan-500 uppercase">Total.Allocated</span>
                    <span className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">${total.toFixed(2)}</span>
                 </div>
                 <div className="text-[10px] text-right font-mono text-slate-600">USD // ENCRYPTED_TRANSACTION</div>
              </div>

              <Link href="/checkout" className={`flex items-center justify-center w-full py-4 rounded-lg text-sm font-black tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] ${cartItems.length > 0 ? 'bg-cyan-500 hover:bg-cyan-400 text-[#050B14]' : 'bg-slate-800 text-slate-600 pointer-events-none'}`}>
                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                 Execute Compilation
              </Link>
           </div>
        </aside>

      </main>

    </div>
  );
}
