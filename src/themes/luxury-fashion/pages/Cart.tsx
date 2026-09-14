"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

// Mocking initial cart state for UI demonstration
const INITIAL_CART = [
  {
    id: 1,
    name: "Midnight Silk Dress",
    price: 350.00,
    quantity: 1,
    thumbnail: "/theme-previews/luxury_product_page_1774979723370.png",
  },
  {
    id: 2,
    name: "Gold Minimalist Watch",
    price: 1850.00,
    quantity: 1,
    thumbnail: "/theme-previews/theme_luxury_fashion_1774979335026.png",
  }
];

export default function LuxuryFashionCart() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

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
  const total = subtotal + taxes + 25; // standard shipping $25

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-serif selection:bg-amber-500/30">
      {/* Dynamic Navbar */}
      <nav className="border-b border-zinc-800/80 py-6 px-8 flex justify-between items-center bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-2xl tracking-widest text-amber-500 uppercase font-light">Squadcart Luxury</Link>
        <div className="space-x-8 text-sm tracking-widest text-zinc-400 hidden md:block">
          <Link href="/" className="hover:text-amber-400 transition-colors">HOME</Link>
          <Link href="/shop" className="hover:text-amber-400 transition-colors">SHOP</Link>
          <Link href="/cart" className="text-amber-400 transition-colors">CART</Link>
        </div>
      </nav>

      {/* Page Header */}
      <header className="py-24 text-center border-b border-zinc-800 mt-0 bg-zinc-900/20">
        <h1 className="text-4xl md:text-5xl tracking-[0.2em] font-light text-white uppercase mb-4">Your Selection</h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase">Curated and ready for you</p>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2">
          <div className="border-b border-zinc-800 pb-4 mb-8 hidden md:grid grid-cols-12 text-xs tracking-widest text-zinc-500 uppercase">
             <div className="col-span-6">Item</div>
             <div className="col-span-2 text-center">Price</div>
             <div className="col-span-2 text-center">Quantity</div>
             <div className="col-span-2 text-right">Total</div>
          </div>

          {cartItems.length > 0 ? (
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 border-b border-zinc-800/50 pb-8">
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6 flex gap-6 items-center">
                    <div className="relative w-24 h-32 bg-zinc-900 flex-shrink-0">
                      <Image src={item.thumbnail} alt={item.name} fill className="object-cover opacity-80" />
                    </div>
                    <div>
                      <h3 className="text-sm tracking-widest uppercase text-zinc-200 mb-2">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-[10px] tracking-widest text-zinc-600 hover:text-amber-500 uppercase transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 text-center font-sans tracking-wide text-zinc-400 hidden md:block">
                    ${item.price.toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="flex items-center border border-zinc-800">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-zinc-500 hover:text-amber-500">-</button>
                      <span className="w-8 text-center text-sm font-sans">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-zinc-500 hover:text-amber-500">+</button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-1 md:col-span-2 text-right font-sans text-amber-500 tracking-wide">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-zinc-900 border border-zinc-800">
              <h3 className="text-2xl text-zinc-100 font-light mb-6 uppercase tracking-widest">Your Cart Is Empty</h3>
              <p className="text-zinc-500 mb-8 max-w-md mx-auto leading-relaxed">It seems you haven't added any pieces to your selection yet.</p>
              <Link href="/shop" className="inline-block px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors">
                Return to Shop
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
           <div className="bg-zinc-900/50 border border-zinc-800 p-8 sticky top-32">
              <h2 className="text-lg tracking-[0.2em] uppercase text-white mb-8 border-b border-zinc-800 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8 text-sm tracking-widest text-zinc-400 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-zinc-200">$25.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span className="text-zinc-200">${taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6 mb-8 flex justify-between items-end">
                <span className="text-sm tracking-widest uppercase text-white">Total</span>
                <span className="text-2xl font-sans text-amber-500">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className={`block w-full text-center py-4 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${cartItems.length > 0 ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-zinc-800 text-zinc-600 pointer-events-none'}`}>
                 Proceed to Checkout
              </Link>
           </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="pt-24 pb-12 text-center border-t border-zinc-800 mt-16 bg-black">
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
