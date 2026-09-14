"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
// Using placeholder imports assuming the page is rendered with fetched data
import { Product } from "@/lib/api-services";

export default function OrganicGroceryProduct({ 
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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl text-slate-600 font-bold">Item Not Found</h1>
      </div>
    );
  }

  const images = [product.thumbnail, ...(product.images?.map(img => img.url) || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/30">
      {/* Fresh Navbar */}
      <nav className="bg-white border-b border-slate-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Link href="/" className="text-2xl font-black text-emerald-800 tracking-tight flex items-center space-x-2">
          <span>Squadcart<span className="text-emerald-500">Fresh</span></span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium text-slate-600">
          <Link href="/shop" className="hover:text-emerald-600 transition-colors hidden md:block">All Aisles</Link>
          <Link href="/cart" className="flex items-center hover:text-emerald-600 transition-colors bg-emerald-50 px-4 py-2 rounded-full text-emerald-800">
             <span className="font-bold">Basket</span>
          </Link>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-3 px-4 md:px-8 text-xs font-bold uppercase tracking-wider text-slate-400">
        <div className="max-w-[1400px] mx-auto flex items-center space-x-2">
          <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-emerald-500 transition-colors">Aisles</Link>
          <span>/</span>
          <span className="text-emerald-600 truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 bg-white rounded-3xl mt-6 lg:mt-8 shadow-sm border border-slate-100">
        
        {/* Left: Image Viewer */}
        <div className="lg:col-span-6 flex flex-col gap-4">
           
           <div className="flex gap-4">
               {/* Vertical Thumbnails (Desktop) */}
               {images.length > 1 && (
                 <div className="hidden md:flex flex-col gap-3 overflow-y-auto w-24">
                   {images.map((img, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImage(img as string)}
                        className={`relative aspect-square w-full rounded-xl bg-slate-50 border-2 transition-all p-2 flex-shrink-0 ${activeImage === img ? 'border-emerald-500' : 'border-slate-100 hover:border-emerald-200'}`}
                      >
                        <Image src={img as string} alt={`Thumb ${idx}`} fill className="object-contain p-1 mix-blend-multiply" />
                      </button>
                   ))}
                 </div>
               )}

               {/* Main Viewer */}
               <div className="relative aspect-square w-full bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden flex-1">
                 {product.discountPrice && product.discountPrice < product.price && (
                    <div className="absolute top-4 left-4 z-10 bg-rose-100 text-rose-700 text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
                       Sale
                    </div>
                  )}
                 {activeImage ? (
                    <Image src={activeImage} alt={product.name} fill className="object-contain p-8 mix-blend-multiply origin-center hover:scale-125 transition-transform duration-500 cursor-zoom-in" />
                 ) : (
                    <div className="flex w-full h-full items-center justify-center text-slate-400 font-medium">No Image</div>
                 )}
               </div>
           </div>
           
           {/* Horizontal Thumbnails (Mobile) */}
           {images.length > 1 && (
             <div className="md:hidden flex gap-3 overflow-x-auto pb-2 mt-2">
               {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img as string)}
                    className={`relative w-20 h-20 rounded-xl bg-slate-50 border-2 transition-all flex-shrink-0 ${activeImage === img ? 'border-emerald-500' : 'border-slate-100'}`}
                  >
                    <Image src={img as string} alt={`Thumb ${idx}`} fill className="object-contain p-1 mix-blend-multiply" />
                  </button>
               ))}
             </div>
           )}
        </div>

        {/* Right: Product Details & Add to Cart */}
        <div className="lg:col-span-6 flex flex-col pt-2 lg:pt-8 pr-4">
           
           <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 leading-tight">
             {product.name}
           </h1>
           
           <div className="text-emerald-600 font-bold uppercase tracking-wider text-xs mb-6 flex items-center">
             <span>{product.category?.name || "Organics"}</span>
             <span className="mx-3 text-slate-300">•</span>
             <span className="text-slate-500">SKU: {product.sku || "N/A"}</span>
           </div>
           
           <div className="flex items-center space-x-4 mb-8">
             {product.discountPrice && product.discountPrice < product.price ? (
                <>
                  <span className="text-4xl font-black text-emerald-600">${product.discountPrice.toFixed(2)}</span>
                  <span className="text-slate-400 line-through text-xl font-medium">${product.price.toFixed(2)}</span>
                </>
             ) : (
                <span className="text-4xl font-black text-emerald-600">${product.price.toFixed(2)}</span>
             )}
             <span className="text-sm font-medium text-slate-400 ml-4 bg-slate-100 px-2 py-1 rounded">per unit/kg</span>
           </div>

           {/* Description */}
           <div className="prose prose-slate mb-8 max-w-none">
             <p className="text-slate-600 leading-relaxed font-medium">
               {product.description || "Farm-fresh, naturally grown and carefully selected to ensure the highest quality and nutritional value. Sourced directly from local sustainable farms without the use of synthetic pesticides or fertilizers."}
             </p>
           </div>

           {/* Fresh Features */}
           <div className="flex space-x-6 mb-10 border-y border-slate-100 py-4">
              <div className="flex items-center text-sm font-bold text-slate-600">
                <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mr-2">🌿</span>
                100% Organic
              </div>
              <div className="flex items-center text-sm font-bold text-slate-600">
                <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mr-2">⏱️</span>
                Fresh Daily
              </div>
           </div>

           {/* Add to Cart Area */}
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col sm:flex-row gap-4">
             <div className="flex items-center bg-white border border-slate-200 rounded-full overflow-hidden h-14">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 h-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-black text-xl">-</button>
               <span className="w-12 text-center font-bold text-slate-800 text-lg">{quantity}</span>
               <button onClick={() => setQuantity(quantity + 1)} className="px-5 h-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-black text-xl">+</button>
             </div>

             <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 h-14 rounded-full font-black text-lg transition-all flex items-center justify-center space-x-2 hover:-translate-y-0.5">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               <span>Add to Basket</span>
             </button>
           </div>
           <p className="text-center text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">In Stock. Ships Out In 2 Hrs.</p>
        </div>
      </main>

      {/* Related Groceries */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-4 sm:px-8 max-w-[1400px] mx-auto mt-8">
          <h3 className="text-2xl font-black text-slate-800 mb-8 tracking-tight">You Might Also Need</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.slice(0, 5).map((item: Product) => (
              <div key={item.id} className="group flex flex-col bg-white rounded-2xl border border-slate-100 p-3 hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-100 transition-all duration-300">
                <Link href={`/product/${item.id}`} className="block relative aspect-square w-full rounded-xl bg-slate-50 overflow-hidden mb-3">
                  {item.thumbnail && <Image src={item.thumbnail} alt={item.name} fill className="object-contain p-3 mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />}
                </Link>
                <Link href={`/product/${item.id}`} className="flex-1">
                   <h4 className="text-sm font-bold text-slate-800 mb-1 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">{item.name}</h4>
                </Link>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
                   <span className="text-emerald-600 font-black">${(item.discountPrice || item.price).toFixed(2)}</span>
                   <button className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="pb-12 bg-slate-50" />
    </div>
  );
}
