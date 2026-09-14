"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

// Mocking cart state
const HYPE_STASH = [
  {
    id: 1,
    name: "Heavyweight Box Logo Hoodie",
    price: 180.00,
    quantity: 1,
    size: "L",
    thumbnail: "/theme-previews/theme_urban_streetwear_1774979465750.png",
  },
  {
    id: 2,
    name: "Tactical Cargo Pants",
    price: 220.50,
    quantity: 1,
    size: "M",
    thumbnail: "/theme-previews/streetwear_cart_page_1774979815431.png",
  }
];

export default function UrbanStreetwearCart() {
  const [cartItems, setCartItems] = useState(HYPE_STASH);

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
  const taxes = subtotal * 0.08;
  const shipping = subtotal > 0 ? 25 : 0; // Flat premium shipping
  const total = subtotal + taxes + shipping;

  return (
    <div className="min-h-screen bg-stone-100 text-black font-sans selection:bg-rose-600 selection:text-white flex flex-col">
      {/* Brutalist Navbar */}
      <nav className="border-b-4 border-black py-4 px-6 md:px-10 flex justify-between items-center bg-stone-100 sticky top-0 z-50">
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase transform -skew-x-6 hover:text-rose-600 transition-colors">
          SQUAD<span className="text-inherit">CRTEL</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/shop" className="hidden md:flex items-center justify-center border-4 border-black font-black uppercase tracking-widest px-6 h-12 hover:bg-black hover:text-white transition-all text-xs">
            Keep Browsing
          </Link>
          <div className="flex items-center justify-center border-4 border-black font-black uppercase tracking-widest px-6 h-12 bg-black text-white text-xs">
            Stash ({cartItems.length})
          </div>
        </div>
      </nav>

      {/* Warning Banner */}
      <div className="bg-rose-600 text-white font-black uppercase text-center py-2 border-b-4 border-black text-xs tracking-widest overflow-hidden">
        <span className="animate-pulse">⚠️ ITEMS IN YOUR STASH ARE NOT RESERVED. CHECKOUT TO SECURE YOUR DROP. ⚠️</span>
      </div>

      <header className="py-16 md:py-20 border-b-4 border-black bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjVmNWY0Ij48L3JlY3Q+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4xNSI+PC9jaXJjbGU+PC9zdmc+')]">
        <div className="px-6 md:px-10 flex flex-col items-center justify-center text-center">
           <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6 mix-blend-multiply drop-shadow-[6px_6px_0_#e11d48]">
              YOUR STASH
           </h1>
        </div>
      </header>

      <main className="w-full mx-auto px-6 md:px-10 py-12 flex flex-col xl:flex-row gap-12 bg-stone-100 flex-1">
        
        {/* Cart Items List */}
        <div className="flex-1 w-full order-2 xl:order-1">
          {cartItems.length > 0 ? (
            <div className="border-4 border-black bg-white shadow-[12px_12px_0_0_#000]">
               
               {/* Table Header */}
               <div className="hidden md:grid grid-cols-12 border-b-4 border-black bg-yellow-400 px-6 py-4 text-xs font-black uppercase tracking-widest">
                  <div className="col-span-6">Item Identity</div>
                  <div className="col-span-2 text-center">Cost</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Sum</div>
               </div>

               {/* Cart Iteration */}
               <div className="divide-y-4 divide-black">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 px-4 md:px-6 py-8 hover:bg-stone-100 transition-colors">
                      {/* Product Base */}
                      <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 bg-stone-200 border-4 border-black flex-shrink-0 group overflow-hidden">
                          <Image src={item.thumbnail} alt={item.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-1 border-2 border-rose-600 px-2 py-0.5 inline-block self-start">SIZE: {item.size}</span>
                          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight mb-2 hover:underline cursor-pointer">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-xs font-black uppercase tracking-widest text-stone-500 hover:text-black self-start mt-2 border-b-2 border-transparent hover:border-black transition-all">
                             [X] DROP ITEM
                          </button>
                        </div>
                      </div>

                      {/* Price Code */}
                      <div className="col-span-1 md:col-span-2 text-center font-mono font-black text-xl hidden md:block">
                        ${item.price.toFixed(0)}
                      </div>

                      {/* Quantity Modifier */}
                      <div className="col-span-1 md:col-span-2 flex justify-center mt-4 md:mt-0">
                        <div className="flex border-4 border-black bg-white h-12 w-[120px]">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-full hover:bg-yellow-400 transition-colors font-black text-xl border-r-4 border-black">-</button>
                          <span className="flex-1 flex items-center justify-center font-black font-mono text-xl">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-full hover:bg-yellow-400 transition-colors font-black text-xl border-l-4 border-black">+</button>
                        </div>
                      </div>

                      {/* Line Sum */}
                      <div className="col-span-1 md:col-span-2 text-right font-mono font-black text-2xl md:text-3xl mt-4 md:mt-0">
                        ${(item.price * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          ) : (
             <div className="p-16 text-center bg-white border-4 border-black border-dashed h-full flex flex-col items-center justify-center min-h-[400px]">
               <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-300 mb-6 transform -rotate-2">STASH EMPTY</h3>
               <p className="text-black font-bold uppercase tracking-widest text-sm mb-10 max-w-sm">Secure your pieces before the vault entirely sells out.</p>
               <Link href="/shop" className="px-10 py-5 bg-black text-white text-xl font-black uppercase border-4 border-black shadow-[8px_8px_0_0_#facc15] hover:shadow-[12px_12px_0_0_#e11d48] transition-all hover:-translate-y-1">
                 RETURN TO VAULT
               </Link>
             </div>
          )}
        </div>

        {/* Breakdown Summary */}
        <aside className="w-full xl:w-[450px] flex-shrink-0 order-1 xl:order-2">
           <div className="bg-white border-4 border-black px-8 py-10 shadow-[12px_12px_0_0_#000] sticky top-32">
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">Receipt</h2>
              
              <div className="space-y-6 mb-8 text-sm font-black uppercase tracking-widest">
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="font-mono text-xl text-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Premium Shipping</span>
                  <span className="font-mono text-xl text-black">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Taxes // Duties</span>
                  <span className="font-mono text-xl text-black">${taxes.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Node */}
              <div className="flex mb-10 border-4 border-black focus-within:border-rose-600 transition-colors bg-stone-100">
                  <input type="text" placeholder="DISCOUNT CODE" className="flex-1 bg-transparent px-4 py-3 font-black text-black focus:outline-none uppercase tracking-widest text-xs" />
                  <button className="bg-black text-white px-6 font-black uppercase tracking-widest hover:bg-rose-600 transition-colors text-xs border-l-4 border-black border-transparent">APPLY</button>
              </div>

              <div className="pt-8 border-t-4 border-black flex justify-between items-end mb-10">
                 <span className="text-xl font-black uppercase tracking-tighter">SECURE OUT</span>
                 <span className="text-5xl md:text-6xl font-black text-rose-600 tracking-tighter">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className={`flex items-center justify-center w-full py-6 text-2xl font-black tracking-tighter uppercase transition-all border-4 border-black ${cartItems.length > 0 ? 'bg-rose-600 hover:bg-black text-white shadow-[8px_8px_0_0_#000] hover:shadow-[8px_8px_0_0_#facc15] active:translate-y-2 active:translate-x-2 active:shadow-none' : 'bg-stone-200 text-stone-400 pointer-events-none'}`}>
                 CHECKOUT NOW
              </Link>
           </div>
        </aside>

      </main>

    </div>
  );
}
