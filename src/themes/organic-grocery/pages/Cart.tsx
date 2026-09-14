"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

// Mocking cart state
const FRESH_BASKET = [
  {
    id: 1,
    name: "Farm Fresh Avocados",
    price: 6.99,
    quantity: 2,
    weight: "1 kg",
    thumbnail: "/theme-previews/grocery_category_page_1774979775980.png",
  },
  {
    id: 2,
    name: "Organic Whole Milk",
    price: 4.50,
    quantity: 1,
    weight: "1 Gallon",
    thumbnail: "/theme-previews/theme_organic_grocery_1774979385899.png",
  }
];

export default function OrganicGroceryCart() {
  const [cartItems, setCartItems] = useState(FRESH_BASKET);

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
  const taxes = subtotal * 0.05;
  const delivery = subtotal > 50 ? 0 : 5.99; // Free delivery over $50
  const total = subtotal + taxes + delivery;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/30 flex flex-col">
      {/* Fresh Navbar */}
      <nav className="bg-white border-b border-slate-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Link href="/" className="text-2xl font-black text-emerald-800 tracking-tight flex items-center space-x-2">
          <span>Squadcart<span className="text-emerald-500">Fresh</span></span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium text-slate-600">
          <Link href="/shop" className="hover:text-emerald-600 transition-colors hidden md:block">All Aisles</Link>
          <Link href="/cart" className="flex items-center text-emerald-700 transition-colors bg-emerald-50 px-4 py-2 rounded-full font-bold">
             <span>Basket</span>
             <span className="ml-2 bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{cartItems.length}</span>
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <header className="py-12 bg-emerald-900 border-b border-emerald-800 relative overflow-hidden">
        {/* Fresh Leaf Pattern SVG */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE2LCAxODUsIDEyOSwgMC4yKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] z-[0]" />
        
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 flex items-center justify-between">
           <div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">Your Basket</h1>
              <p className="text-emerald-200 font-medium">Review your fresh selections before checkout.</p>
           </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8 flex-1 w-full">
        
        {/* Basket Items */}
        <div className="flex-1">
          {cartItems.length > 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
               
               {/* Table Header */}
               <div className="hidden md:grid grid-cols-12 bg-slate-50 border-b border-slate-100 px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <div className="col-span-6">Produce</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
               </div>

               {/* Cart Items Iteration */}
               <div className="divide-y divide-slate-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 px-6 py-6 group hover:bg-slate-50/50 transition-colors">
                      {/* Product Info */}
                      <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                        <div className="relative w-24 h-24 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-2 border border-slate-100">
                          <Image src={item.thumbnail} alt={item.name} fill className="object-contain mix-blend-multiply p-2" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider mb-1">{item.weight}</div>
                          <h3 className="text-base font-bold text-slate-800 mb-2 leading-tight">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors flex items-center">
                             Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-center font-bold text-slate-600 hidden md:block">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Quantity Picker */}
                      <div className="col-span-1 md:col-span-2 flex justify-center">
                        <div className="flex items-center bg-white border border-slate-200 rounded-full overflow-hidden shadow-sm">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-black text-lg">-</button>
                          <span className="w-8 text-center font-bold text-slate-800">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors font-black text-lg">+</button>
                        </div>
                      </div>

                      {/* Line Total */}
                      <div className="col-span-1 md:col-span-2 text-right font-black text-emerald-600 text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          ) : (
             <div className="py-32 text-center bg-white border border-slate-100 rounded-3xl shadow-sm">
               <div className="text-6xl mb-6">🧺</div>
               <h3 className="text-2xl font-black text-slate-800 mb-3">Your basket is empty</h3>
               <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">Looks like you haven't added any fresh groceries to your basket yet.</p>
               <Link href="/shop" className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow-[0_8px_20px_rgba(5,150,105,0.2)] hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)] transition-all hover:-translate-y-0.5">
                 Start Shopping
               </Link>
             </div>
          )}
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-[400px] flex-shrink-0">
           <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-800 tracking-tight mb-6">Order Summary</h2>
              
              <div className="bg-emerald-50 rounded-2xl p-4 mb-8 border border-emerald-100/50">
                 <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm flex-shrink-0">🚚</div>
                    <div className="text-sm font-medium text-emerald-800">
                       {subtotal >= 50 ? (
                         <span>You've unlocked <span className="font-bold text-emerald-600">Free Local Delivery!</span></span>
                       ) : (
                         <span>Add <span className="font-bold text-emerald-600">${(50 - subtotal).toFixed(2)}</span> more to unlock free local delivery.</span>
                       )}
                    </div>
                 </div>
              </div>

              <div className="space-y-4 mb-6 text-sm font-medium text-slate-500">
                <div className="flex justify-between">
                  <span>Basket Subtotal</span>
                  <span className="font-bold text-slate-700">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-700">
                     {delivery === 0 ? <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded text-xs uppercase tracking-wider">Free</span> : `$${delivery.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span className="font-bold text-slate-700">${taxes.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between items-end mb-8">
                 <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Total</span>
                 <span className="text-3xl font-black text-emerald-600">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className={`flex items-center justify-center w-full py-4 rounded-full text-base font-bold transition-all ${cartItems.length > 0 ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_8px_20px_rgba(5,150,105,0.2)] hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)] hover:-translate-y-0.5' : 'bg-slate-100 text-slate-400 pointer-events-none'}`}>
                 Proceed to Checkout
              </Link>
           </div>
        </aside>

      </main>

    </div>
  );
}
