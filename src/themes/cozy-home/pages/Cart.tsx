"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

// Mocking cart state
const NORDIC_BASKET = [
  {
    id: 1,
    name: "Oskar Lounge Chair",
    price: 1250.00,
    quantity: 1,
    finish: "Walnut & Cream",
    thumbnail: "/theme-previews/cozy_product_page_1774979839134.png",
  },
  {
    id: 2,
    name: "Handwoven Jute Rug",
    price: 340.00,
    quantity: 1,
    finish: "Natural Sand",
    thumbnail: "/theme-previews/theme_cozy_home_1774979483839.png",
  }
];

export default function CozyHomeCart() {
  const [cartItems, setCartItems] = useState(NORDIC_BASKET);

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
  const shipping = subtotal > 1500 ? 0 : 150; // White-glove delivery
  const total = subtotal + taxes + shipping;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-sans selection:bg-[#B5835A] selection:text-white flex flex-col">
      {/* Elegant Navbar */}
      <nav className="border-b border-[#E5E0D8] py-6 px-8 md:px-16 flex justify-between items-center bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-2xl font-serif text-[#4A4238] tracking-tight hover:opacity-80 transition-opacity">
          NORDIC<span className="italic text-[#B5835A]">HAVEN</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/shop" className="text-sm font-medium text-[#706B65] hover:text-[#4A4238] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </nav>

      <main className="max-w-[1400px] w-full mx-auto px-8 md:px-16 py-16 flex flex-col xl:flex-row gap-16 flex-1">
        
        {/* Cart Listing */}
        <div className="flex-1 w-full flex flex-col">
          <h1 className="text-4xl lg:text-5xl font-serif text-[#4A4238] mb-12">Your Basket</h1>
          
          {cartItems.length > 0 ? (
            <div className="flex-1">
               {/* Cart Iteration */}
               <div className="divide-y divide-[#E5E0D8] border-t border-[#E5E0D8]">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center py-10 group transition-all">
                      
                      {/* Visual & Details */}
                      <div className="flex flex-1 gap-8 items-start">
                        <div className="relative w-32 h-40 md:w-40 md:h-48 rounded-2xl bg-[#F4F1EB] flex-shrink-0 overflow-hidden">
                          <Image src={item.thumbnail} alt={item.name} fill className="object-cover mix-blend-multiply transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105" />
                        </div>
                        <div className="flex flex-col pt-2 max-w-sm">
                          <h3 className="text-xl md:text-2xl font-serif text-[#4A4238] leading-tight mb-2 group-hover:text-[#B5835A] transition-colors">{item.name}</h3>
                          <span className="text-sm text-[#A39E98] mb-6 block">Finish: {item.finish}</span>
                          
                          <button onClick={() => removeItem(item.id)} className="text-xs font-bold uppercase tracking-widest text-[#706B65] hover:text-[#B5835A] transition-colors self-start pb-1 border-b border-transparent hover:border-[#B5835A]">
                             Remove Item
                          </button>
                        </div>
                      </div>

                      {/* Controls Row (Mobile friendly) */}
                      <div className="flex w-full md:w-auto mt-8 md:mt-0 items-center justify-between md:gap-12 pl-[160px] md:pl-0">
                         {/* Price (Unit) */}
                         <div className="text-lg font-medium text-[#706B65] hidden md:block">
                           ${item.price.toFixed(2)}
                         </div>

                         {/* Quantity */}
                         <div className="flex items-center w-28 bg-[#F4F1EB] rounded-full h-12">
                           <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-full text-[#A39E98] hover:text-[#4A4238] transition-colors flex items-center justify-center">-</button>
                           <span className="flex-1 flex items-center justify-center text-sm font-bold text-[#4A4238]">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-full text-[#A39E98] hover:text-[#4A4238] transition-colors flex items-center justify-center">+</button>
                         </div>

                         {/* Line Total */}
                         <div className="text-xl font-medium text-[#4A4238] w-24 text-right">
                           ${(item.price * item.quantity).toFixed(2)}
                         </div>
                      </div>

                    </div>
                  ))}
               </div>
            </div>
          ) : (
             <div className="py-24 flex flex-col h-full border-t border-[#E5E0D8]">
               <h3 className="text-2xl font-serif text-[#706B65] mb-6">Your basket is currently empty.</h3>
               <p className="text-[#A39E98] mb-12 max-w-md leading-relaxed">Discover timeless, well-crafted pieces designed to bring warmth and elevated simplicity to your home.</p>
               <Link href="/shop" className="inline-flex items-center self-start bg-[#4A4238] text-white px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-[#322c25] transition-all shadow-md hover:-translate-y-0.5">
                 Explore Collection
               </Link>
             </div>
          )}
        </div>

        {/* Breakdown Summary */}
        <aside className="w-full xl:w-[420px] flex-shrink-0">
           <div className="bg-[#F4F1EB] p-10 rounded-[2.5rem] sticky top-32">
              <h2 className="text-2xl font-serif text-[#4A4238] mb-8">Order Summary</h2>
              
              {subtotal > 0 && subtotal < 1500 && (
                <div className="bg-white rounded-2xl px-6 py-4 mb-8 text-sm text-[#706B65] border border-[#E5E0D8]/50">
                  <div className="w-full bg-[#E5E0D8] h-1.5 rounded-full mb-3 overflow-hidden">
                    <div className="bg-[#B5835A] h-full" style={{width: `${(subtotal/1500)*100}%`}}></div>
                  </div>
                  <p>You're <span className="font-bold text-[#B5835A]">${(1500 - subtotal).toFixed(0)}</span> away from complimentary white-glove delivery.</p>
                </div>
              )}

              <div className="space-y-4 mb-8 text-sm font-medium text-[#706B65]">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-[#4A4238]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[#A39E98]">
                  <span>White-Glove Delivery</span>
                  <span className="text-[#4A4238]">{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-center text-[#A39E98]">
                  <span>Estimated Taxes</span>
                  <span className="text-[#4A4238]">${taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5E0D8] flex justify-between items-center mb-10">
                 <span className="text-base font-bold text-[#4A4238]">Total</span>
                 <span className="text-3xl font-serif text-[#4A4238]">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className={`flex items-center justify-center w-full py-4 rounded-full text-sm font-bold tracking-wide transition-all shadow-md ${cartItems.length > 0 ? 'bg-[#4A4238] hover:bg-[#322c25] text-white hover:shadow-lg hover:-translate-y-0.5' : 'bg-[#E5E0D8] text-[#A39E98] pointer-events-none shadow-none'}`}>
                 Proceed to Checkout
              </Link>

              <p className="text-center text-[10px] uppercase tracking-widest text-[#A39E98] mt-6">
                SECURE 256-BIT SSL ENCRYPTION
              </p>
           </div>
        </aside>

      </main>

    </div>
  );
}
