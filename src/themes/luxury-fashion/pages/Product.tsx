"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
// Using placeholder imports assuming the page is rendered with fetched data
import { Product } from "@/lib/api-services";

export default function LuxuryFashionProduct({ 
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
      <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-serif flex items-center justify-center">
        <h1 className="text-3xl text-zinc-500 font-light tracking-widest uppercase">Piece Not Found</h1>
      </div>
    );
  }

  const images = [product.thumbnail, ...(product.images?.map(img => img.url) || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-serif selection:bg-amber-500/30">
      {/* Dynamic Navbar */}
      <nav className="border-b border-zinc-800/80 py-6 px-8 flex justify-between items-center bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-2xl tracking-widest text-amber-500 uppercase font-light">Squadcart Luxury</Link>
        <div className="space-x-8 text-sm tracking-widest text-zinc-400 hidden md:block">
          <Link href="/" className="hover:text-amber-400 transition-colors">HOME</Link>
          <Link href="/shop" className="hover:text-amber-400 transition-colors">SHOP</Link>
          <Link href="/cart" className="hover:text-amber-400 transition-colors">CART</Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-8 py-8 mb-4">
        <div className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 flex space-x-3 items-center">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-amber-500 transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
        {/* Left: Image Gallery */}
        <div className="flex gap-6 h-[80vh]">
           {/* Thumbnails */}
           <div className="w-24 hidden md:flex flex-col gap-4 overflow-y-auto hide-scrollbar">
             {images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(img as string)}
                  className={`relative aspect-[3/4] w-full bg-zinc-900 border ${activeImage === img ? 'border-amber-500' : 'border-zinc-800'} transition-colors overflow-hidden`}
                >
                  <Image src={img as string} alt={`Thumb ${idx}`} fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </button>
             ))}
           </div>
           
           {/* Main Viewer */}
           <div className="flex-1 relative bg-zinc-900 border border-zinc-800">
             {activeImage ? (
                <Image src={activeImage} alt={product.name} fill className="object-cover" />
             ) : (
                <div className="w-full h-full flex items-center justify-center tracking-widest text-zinc-600 uppercase">No Visual</div>
             )}
             {product.discountPrice && product.discountPrice < product.price && (
                <div className="absolute top-6 right-6 bg-amber-500 text-black text-xs font-bold px-4 py-2 tracking-widest uppercase">
                  Sale - {Math.round((1 - product.discountPrice / product.price) * 100)}%
                </div>
              )}
           </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center py-8 lg:py-0">
           <h2 className="text-[9px] tracking-[0.3em] text-zinc-500 mb-4 uppercase">{product.category?.name || "The Collection"}</h2>
           <h1 className="text-4xl md:text-5xl font-light tracking-wide text-zinc-100 mb-6 leading-tight uppercase">
             {product.name}
           </h1>
           
           <div className="flex items-center space-x-6 text-xl font-sans mb-12 border-b border-zinc-800/50 pb-8">
             {product.discountPrice && product.discountPrice < product.price ? (
                <>
                  <span className="text-amber-500 font-light">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-zinc-600 line-through text-base">${product.price.toFixed(2)}</span>
                </>
             ) : (
                <span className="text-amber-500 font-light">${product.price.toFixed(2)}</span>
             )}
           </div>

           {/* Description */}
           <div className="prose prose-invert mb-12">
             <p className="text-zinc-400 leading-relaxed font-sans text-sm font-light">
               {product.description || "A masterclass in modern design, crafted with the finest materials to ensure an elegant silhouette and uncompromised quality."}
             </p>
           </div>

           {/* Add to Cart Area */}
           <div className="space-y-8">
             <div className="flex items-center space-x-6">
                <span className="text-xs tracking-widest text-zinc-500 uppercase">Quantity</span>
                <div className="flex items-center border border-zinc-800">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-zinc-500 hover:text-amber-500 transition-colors">-</button>
                  <span className="w-12 text-center font-sans">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-zinc-500 hover:text-amber-500 transition-colors">+</button>
                </div>
             </div>

             <div className="flex gap-4">
                <button className="flex-1 bg-amber-500 text-black py-4 text-xs tracking-[0.2em] uppercase hover:bg-amber-400 transition-colors font-bold">
                  Add to Cart
                </button>
                <button className="px-8 border border-zinc-800 text-zinc-400 hover:border-amber-500 hover:text-amber-500 transition-colors p-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
             </div>
           </div>

           {/* Accordion Info */}
           <div className="mt-16 border-t border-zinc-800 pt-8 space-y-6 text-sm">
             <div className="flex justify-between tracking-widest text-zinc-400 uppercase cursor-pointer hover:text-amber-500 group">
                <span>Shipping & Returns</span>
                <span className="group-hover:text-amber-500">+</span>
             </div>
             <div className="flex justify-between tracking-widest text-zinc-400 uppercase cursor-pointer hover:text-amber-500 group">
                <span>Materials & Care</span>
                <span className="group-hover:text-amber-500">+</span>
             </div>
           </div>
        </div>
      </main>

      {/* Suggested Pieces */}
      {relatedProducts.length > 0 && (
         <section className="py-24 px-8 md:px-16 border-t border-zinc-800/50 bg-black">
         <div className="max-w-7xl mx-auto">
           <h3 className="text-2xl tracking-wider font-light mb-16 text-center text-zinc-100 uppercase">You May Also Like</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {relatedProducts.slice(0, 4).map((item: Product) => (
               <Link href={`/product/${item.id}`} key={item.id} className="group cursor-pointer flex flex-col">
                 <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-6 border border-zinc-800/50">
                   {item.thumbnail ? (
                     <Image src={item.thumbnail} alt={item.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                   ) : (
                     <div className="w-full h-full bg-zinc-800" />
                   )}
                 </div>
                 <h4 className="text-xs tracking-widest text-zinc-400 mb-2 truncate group-hover:text-amber-400 transition-colors uppercase text-center">{item.name}</h4>
                 <div className="text-center text-sm font-sans text-amber-500/80">
                   ${(item.discountPrice || item.price).toFixed(2)}
                 </div>
               </Link>
             ))}
           </div>
         </div>
       </section>
      )}

      {/* Footer */}
      <footer className="pt-24 pb-12 text-center border-t border-zinc-800 mt-0 bg-black">
        <h4 className="text-2xl tracking-[0.3em] font-light text-amber-500 mb-8 uppercase">Squadcart Luxury</h4>
        <div className="flex justify-center space-x-8 text-xs tracking-widest text-zinc-500 uppercase mb-16">
          <Link href="/about" className="hover:text-amber-500 transition-colors">Our Story</Link>
          <Link href="/contact" className="hover:text-amber-500 transition-colors">Client Services</Link>
          <Link href="/privacy" className="hover:text-amber-500 transition-colors">Privacy</Link>
        </div>
        <p className="text-zinc-700 text-xs tracking-widest uppercase">© 2026 The Collection. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
