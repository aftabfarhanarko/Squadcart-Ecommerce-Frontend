"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
// Using placeholder imports assuming the page is rendered with fetched data
import { Product } from "@/lib/api-services";

export default function MinimalTechProduct({ 
  product, 
  relatedProducts = [] 
}: { 
  product: Product, 
  relatedProducts: Product[] 
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.thumbnail || product?.images?.[0]?.url || "");

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center font-mono">
        <div className="border border-red-500/50 bg-red-500/10 p-8 rounded-lg">
           <h1 className="text-xl text-red-500 font-bold uppercase">ERR_404: Hardware Profile Not Found</h1>
        </div>
      </div>
    );
  }

  const images = [product.thumbnail, ...(product.images?.map(img => img.url) || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-500/30">
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
          <Link href="/shop" className="text-cyan-400 transition-colors">Hardware</Link>
          <Link href="/cart" className="hover:text-cyan-400 transition-colors">Cart</Link>
        </div>
      </nav>

      {/* Cyber Breadcrumb */}
      <div className="bg-[#0A1121] border-b border-cyan-500/20 py-3 px-8 md:px-16 text-xs font-mono text-cyan-600/70">
        <div className="max-w-[1400px] mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-cyan-400 transition-colors">ROOT</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-cyan-400 transition-colors">HARDWARE</Link>
          <span>/</span>
          <span className="text-cyan-400 truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-8 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Image Viewer */}
        <div className="lg:col-span-7 flex flex-col gap-6">
           <div className="relative aspect-video lg:aspect-square w-full bg-[#0A1121] rounded-2xl border border-slate-800 p-8 flex items-center justify-center overflow-hidden group">
             {/* Tech Grid Background overlay */}
             <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] z-[0] opacity-50" />
             
             {activeImage ? (
                <Image src={activeImage} alt={product.name} fill className="object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.15)] z-10 p-8 lg:p-16 hover:scale-105 transition-transform duration-500" />
             ) : (
                <div className="z-10 text-cyan-600 font-mono text-xl animate-pulse">NO_VISUAL_DATA</div>
             )}
             
             {/* Futuristic HUD edges */}
             <span className="absolute top-4 left-4 border-t-2 border-l-2 border-cyan-500 w-8 h-8 rounded-tl-lg z-20"></span>
             <span className="absolute bottom-4 right-4 border-b-2 border-r-2 border-cyan-500 w-8 h-8 rounded-br-lg z-20"></span>
           </div>

           {/* Thumbnails */}
           {images.length > 1 && (
             <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
               {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img as string)}
                    className={`relative w-24 h-24 rounded-lg bg-[#0A1121] border transition-all flex-shrink-0 ${activeImage === img ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-slate-800 hover:border-slate-600'}`}
                  >
                    <Image src={img as string} alt={`Thumb ${idx}`} fill className="object-contain p-2" />
                  </button>
               ))}
             </div>
           )}
        </div>

        {/* Right: Technical Specs & Add to Cart */}
        <div className="lg:col-span-5 flex flex-col pt-4">
           
           <div className="flex items-center space-x-3 text-cyan-500 font-mono text-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-[ping_2s_ease-out_infinite]" />
              <span className="tracking-wider uppercase">Status: Online // In Stock</span>
           </div>
           
           <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
             {product.name}
           </h1>
           
           <div className="flex items-end space-x-4 mb-8">
             {product.discountPrice && product.discountPrice < product.price ? (
                <>
                  <span className="text-4xl lg:text-5xl font-bold tracking-tighter text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-slate-500 line-through text-xl lg:text-2xl font-medium mb-1 border-slate-700 pb-1">${product.price.toFixed(2)}</span>
                  <span className="mb-2 bg-cyan-500/10 text-cyan-400 text-xs font-bold px-2 py-1 rounded border border-cyan-500/30">
                    SAVE {Math.round((1 - product.discountPrice / product.price) * 100)}%
                  </span>
                </>
             ) : (
                <span className="text-4xl font-bold tracking-tighter text-cyan-400">${product.price.toFixed(2)}</span>
             )}
           </div>

           {/* Description / Spec Brief */}
           <div className="bg-[#0A1121] border border-slate-800 rounded-xl p-6 mb-10 text-slate-300 leading-relaxed font-medium">
             <div className="font-mono text-cyan-600 text-[10px] mb-2">// SPEC_SHEET //</div>
             {product.description || "Ultra-low latency, precision-engineered hardware tailored for the ultimate creator and competitive user. Push your platform's limits with unparalleled response times and RGB matrix synchronization."}
           </div>

           {/* Action Dashboard */}
           <div className="space-y-6 bg-gradient-to-br from-[#0A1121] to-[#050B14] p-6 rounded-2xl border border-cyan-500/20 shadow-[inset_0_0_30px_rgba(6,182,212,0.05)]">
             <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                <span>UNITS_REQUIRED</span>
             </div>
             
             <div className="flex gap-4">
                <div className="flex items-center bg-[#050B14] border border-slate-700 rounded-lg overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-4 text-cyan-500 hover:bg-slate-800 transition-colors font-bold text-lg">-</button>
                  <span className="w-12 text-center font-bold text-lg text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-4 text-cyan-500 hover:bg-slate-800 transition-colors font-bold text-lg">+</button>
                </div>

                <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] py-4 rounded-lg font-black tracking-wider uppercase transition-all flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  <span>Mount Payload</span>
                </button>
             </div>
           </div>

           {/* Technical Breakdown */}
           <div className="mt-12 space-y-4">
              <div className="flex items-center space-x-4 border-b border-slate-800 pb-4">
                <div className="w-12 h-12 rounded-lg bg-[#0A1121] border border-slate-800 flex items-center justify-center text-cyan-500">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                   <h4 className="font-bold text-slate-200">Express Deployment</h4>
                   <p className="text-sm text-slate-500">Same-day shipping for verified sectors.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 pb-4">
                <div className="w-12 h-12 rounded-lg bg-[#0A1121] border border-slate-800 flex items-center justify-center text-cyan-500">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                   <h4 className="font-bold text-slate-200">Encrypted Warranty</h4>
                   <p className="text-sm text-slate-500">2-Year hardware defect coverage.</p>
                </div>
              </div>
           </div>

        </div>
      </main>

    </div>
  );
}
