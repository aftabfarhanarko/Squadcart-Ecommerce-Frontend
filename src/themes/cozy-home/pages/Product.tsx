"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
// Using placeholder imports assuming the page is rendered with fetched data
import { Product } from "@/lib/api-services";

export default function CozyHomeProduct({ 
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
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-serif text-3xl text-[#4A4238]">
        Object Not Found.
      </div>
    );
  }

  const images = [product.thumbnail, ...(product.images?.map(img => img.url) || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-sans selection:bg-[#B5835A] selection:text-white">
      {/* Elegant Navbar */}
      <nav className="border-b border-[#E5E0D8] py-6 px-8 md:px-16 flex justify-between items-center bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-2xl font-serif text-[#4A4238] tracking-tight hover:opacity-80 transition-opacity">
          NORDIC<span className="italic text-[#B5835A]">HAVEN</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="flex items-center space-x-2 text-[#4A4238] hover:text-[#B5835A] transition-colors font-medium text-sm">
            <span>Basket (0)</span>
          </Link>
        </div>
      </nav>

      {/* Breadcrumb Layer */}
      <div className="px-8 md:px-16 py-6 text-[10px] uppercase font-bold tracking-widest text-[#A39E98] max-w-[1600px] mx-auto">
        <Link href="/" className="hover:text-[#B5835A] transition-colors">Home</Link>
        <span className="mx-3">/</span>
        <Link href="/shop" className="hover:text-[#B5835A] transition-colors">Collection</Link>
        <span className="mx-3">/</span>
        <span className="text-[#4A4238]">{product.name}</span>
      </div>

      <main className="max-w-[1600px] mx-auto px-8 md:px-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left: Vast Image Viewer */}
        <div className="flex flex-col gap-6">
           
           {/* Huge Main Image */}
           <div className="relative aspect-[4/5] md:aspect-[3/4] w-full bg-[#F4F1EB] rounded-[2rem] overflow-hidden">
             {activeImage ? (
                <Image src={activeImage} alt={product.name} fill className="object-cover mix-blend-multiply" />
             ) : (
                <div className="flex w-full h-full items-center justify-center text-[#E5E0D8] font-serif">No Image Available</div>
             )}
           </div>
           
           {/* Soft Thumbnails */}
           {images.length > 1 && (
             <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
               {images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img as string)}
                    className={`relative w-24 h-24 rounded-2xl bg-[#F4F1EB] overflow-hidden transition-all flex-shrink-0 ${activeImage === img ? 'ring-2 ring-[#B5835A] ring-offset-2 ring-offset-[#FDFBF7]' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <Image src={img as string} alt={`Thumb ${idx}`} fill className="object-cover mix-blend-multiply" />
                  </button>
               ))}
             </div>
           )}
        </div>

        {/* Right: Soft Typography & Details */}
        <div className="flex flex-col pt-0 lg:pt-16 max-w-lg">
           
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4A4238] leading-[1.1] mb-6">
             {product.name}
           </h1>
           
           <div className="flex items-center mb-8 pb-8 border-b border-[#E5E0D8]">
             {product.discountPrice && product.discountPrice < product.price ? (
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-serif text-[#B5835A]">${product.discountPrice.toFixed(0)}</span>
                  <span className="text-lg text-[#A39E98] line-through">${product.price.toFixed(0)}</span>
                </div>
             ) : (
                <span className="text-2xl font-serif text-[#4A4238]">${product.price.toFixed(0)}</span>
             )}
           </div>

           {/* Material/Color Mock */}
           <div className="mb-10">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#706B65] mb-4">Material Finish</span>
              <div className="flex space-x-4">
                 <button className="w-10 h-10 rounded-full bg-[#D4B895] ring-1 ring-offset-4 ring-[#4A4238]" title="White Oak"></button>
                 <button className="w-10 h-10 rounded-full bg-[#3C3024] opacity-80 hover:opacity-100 transition-opacity" title="Walnut"></button>
                 <button className="w-10 h-10 rounded-full bg-[#1A1815] opacity-80 hover:opacity-100 transition-opacity" title="Matte Black"></button>
              </div>
           </div>

           {/* Story / Description */}
           <div className="mb-12 text-[#706B65] leading-relaxed">
             <p>
               {product.description || "With a focus on clean lines and natural materials, this piece brings a sense of calm to your living space. Handcrafted using traditional joinery techniques, exposing the beautiful grain of sustainable wood."}
             </p>
           </div>

           {/* Purchase Flow */}
           <div className="flex flex-col sm:flex-row gap-4 mb-12">
             <div className="flex items-center bg-white border border-[#E5E0D8] rounded-full h-14 overflow-hidden w-full sm:w-32 flex-shrink-0">
               <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full text-[#A39E98] hover:text-[#4A4238] transition-colors">-</button>
               <span className="flex-1 text-center font-bold text-[#4A4238]">{quantity}</span>
               <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full text-[#A39E98] hover:text-[#4A4238] transition-colors">+</button>
             </div>

             <button className="flex-1 bg-[#4A4238] hover:bg-[#322c25] text-white shadow-xl shadow-[#4A4238]/10 h-14 rounded-full text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 w-full">
               Add to Basket
             </button>
           </div>

           {/* Fine print details */}
           <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-[#706B65]">
                 <svg className="w-5 h-5 text-[#B5835A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                 <span>In stock. Ships within 3-5 business days.</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-[#706B65]">
                 <svg className="w-5 h-5 text-[#B5835A] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                 <span>Hassle-free 30-day returns.</span>
              </div>
           </div>

        </div>
      </main>

    </div>
  );
}
