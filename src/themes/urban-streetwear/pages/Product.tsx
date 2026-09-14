"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
// Using placeholder imports assuming the page is rendered with fetched data
import { Product } from "@/lib/api-services";

export default function UrbanStreetwearProduct({ 
  product, 
  relatedProducts = [] 
}: { 
  product: Product, 
  relatedProducts: Product[] 
}) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.thumbnail || product?.images?.[0]?.url || "");
  const [selectedSize, setSelectedSize] = useState("L");

  // Mock sizes for apparel
  const sizes = ["S", "M", "L", "XL", "XXL"];

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center font-black text-5xl uppercase">
        404 / ITEM BURNED
      </div>
    );
  }

  const images = [product.thumbnail, ...(product.images?.map(img => img.url) || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-stone-100 text-black font-sans selection:bg-rose-500 selection:text-white">
      {/* Brutalist Navbar */}
      <nav className="border-b-4 border-black py-4 px-6 md:px-10 flex justify-between items-center bg-stone-100 sticky top-0 z-50">
        <Link href="/" className="text-2xl font-black tracking-tighter uppercase transform -skew-x-6">
          SQUAD<span className="text-rose-600">CRTEL</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/cart" className="flex items-center space-x-2 border-2 border-black bg-black text-white px-4 py-2 hover:bg-rose-600 hover:border-rose-600 transition-all font-bold uppercase text-xs">
            <span>Stash</span>
            <span className="bg-white text-black px-2 py-0.5 rounded-sm">0</span>
          </Link>
        </div>
      </nav>

      {/* Marquee Banner */}
      <div className="overflow-hidden bg-yellow-400 border-b-4 border-black py-2 whitespace-nowrap hidden sm:block">
         {/* Simple CSS animation fallback visually */}
         <p className="font-black font-mono text-sm tracking-widest uppercase">
            [ ID: {product.sku || "XX-098"} ] -- [ STATUS: ACTIVE ] -- [ AVAILABILITY: LIMITED ] -- [ ID: {product.sku || "XX-098"} ] -- [ STATUS: ACTIVE ] -- [ AVAILABILITY: LIMITED ]
         </p>
      </div>

      <main className="w-full flex flex-col lg:flex-row border-b-4 border-black min-h-[80vh]">
        
        {/* Left: Image Viewer */}
        <div className="w-full lg:w-1/2 flex flex-col border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white">
           
           {/* Main Viewer */}
           <div className="relative flex-1 min-h-[500px] border-b-4 border-black overflow-hidden flex items-center justify-center group bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZmFmYWY5Ij48L3JlY3Q+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4xNSI+PC9jaXJjbGU+PC9zdmc+')]">
             {product.discountPrice && product.discountPrice < product.price && (
                <div className="absolute top-8 left-8 z-10 bg-rose-600 text-white font-black uppercase text-2xl px-6 py-2 border-4 border-black transform -rotate-6 shadow-[8px_8px_0_0_#000]">
                   SALE
                </div>
              )}
             {activeImage ? (
                <Image src={activeImage} alt={product.name} fill className="object-contain p-8 filter grayscale hover:grayscale-0 transition-all duration-700 max-h-screen" />
             ) : (
                <div className="flex w-full h-full items-center justify-center text-4xl font-black uppercase text-stone-300 transform -rotate-45">NO IMG</div>
             )}
             {/* Huge background text decoration */}
             <div className="absolute bottom-4 right-4 text-8xl font-black text-black opacity-5 pointer-events-none break-all w-full text-right leading-none">
                 SQUADCRTEL
             </div>
           </div>
           
           {/* Thumbnails */}
           {images.length > 1 && (
             <div className="flex w-full overflow-x-auto hide-scrollbar bg-stone-100">
               {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img as string)}
                    className={`relative w-32 h-32 border-r-4 border-black flex-shrink-0 transition-all ${activeImage === img ? 'opacity-100 bg-rose-600' : 'opacity-40 hover:opacity-100 bg-white'}`}
                  >
                    <Image src={img as string} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
               ))}
             </div>
           )}
        </div>

        {/* Right: Product Details & Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-14 lg:p-20 bg-stone-100 flex flex-col justify-center">
           
           <div className="inline-block self-start border-4 border-black px-4 py-1 font-bold uppercase tracking-widest text-xs mb-8 bg-black text-white">
             {product.category?.name || "ARCHIVE"}
           </div>
           
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 break-words text-black drop-shadow-[4px_4px_0_#e11d48]">
             {product.name}
           </h1>
           
           <div className="flex items-end mb-12">
             {product.discountPrice && product.discountPrice < product.price ? (
                <div className="flex items-center flex-wrap gap-4">
                  <span className="text-6xl font-black text-rose-600 font-mono tracking-tighter">${product.discountPrice.toFixed(0)}</span>
                  <span className="text-4xl font-black text-stone-400 line-through font-mono tracking-tighter">${product.price.toFixed(0)}</span>
                </div>
             ) : (
                <span className="text-6xl font-black text-black font-mono tracking-tighter">${product.price.toFixed(0)}</span>
             )}
           </div>

           {/* Sizing (Mock Apparel UI) */}
           <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                 <span className="font-black uppercase tracking-widest text-sm">Select Size</span>
                 <span className="font-bold underline text-xs uppercase cursor-pointer text-stone-500 hover:text-black">Dimensions_Guide</span>
              </div>
              <div className="flex flex-wrap gap-3">
                 {sizes.map((size) => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-14 min-w-[3.5rem] px-4 font-black text-xl flex items-center justify-center border-4 border-black transition-all ${selectedSize === size ? 'bg-black text-white shadow-[6px_6px_0_0_#e11d48] -translate-y-1' : 'bg-white text-black hover:bg-stone-200'}`}
                    >
                       {size}
                    </button>
                 ))}
              </div>
           </div>

           {/* Quantity and Action */}
           <div className="flex flex-col sm:flex-row gap-6 mb-16">
             {/* Quantity */}
             <div className="flex border-4 border-black h-20 w-full sm:w-auto bg-white">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 h-full hover:bg-stone-200 transition-colors font-black text-3xl border-r-4 border-black">-</button>
               <span className="w-20 flex items-center justify-center font-black font-mono text-3xl">{quantity}</span>
               <button onClick={() => setQuantity(quantity + 1)} className="px-6 h-full hover:bg-stone-200 transition-colors font-black text-3xl border-l-4 border-black">+</button>
             </div>

             <button className="flex-1 bg-rose-600 hover:bg-black text-white border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#facc15] active:shadow-[0_0_0_0_#000] active:translate-y-2 active:translate-x-2 h-20 font-black text-3xl sm:text-4xl uppercase tracking-tighter transition-all">
               COP NOW
             </button>
           </div>

           {/* Description Accordion style info */}
           <div className="border-t-4 border-black space-y-0">
             <div className="border-b-4 border-black py-6">
                <h3 className="font-black uppercase tracking-widest mb-4 flex justify-between">
                   Description <span>+</span>
                </h3>
                <p className="font-bold text-stone-600 uppercase leading-relaxed text-sm">
                  {product.description || "Heavyweight 100% cotton construction. Boxy fit. Distressed print technique. Each piece is unique and will fade over time. Do not machine dry."}
                </p>
             </div>
             <div className="border-b-4 border-black py-6">
                <h3 className="font-black uppercase tracking-widest flex justify-between cursor-pointer hover:text-rose-600">
                   Shipping & Returns <span>+</span>
                </h3>
             </div>
           </div>

        </div>
      </main>
      
      {/* Heavy Footer Bar */}
      <div className="bg-black text-white p-6 md:p-10 flex flex-col md:flex-row justify-between items-center font-black tracking-widest uppercase text-xs">
          <span>SQUADCRTEL // ARCHIVE ROOM</span>
          <span className="text-yellow-400 mt-4 md:mt-0">SECURE TRANSACTION PROTOCOL</span>
      </div>

    </div>
  );
}
