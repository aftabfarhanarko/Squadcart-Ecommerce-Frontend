import { getBanners, getTrendingProducts, getCategories, Product, Banner, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function OrganicGroceryHome({ searchParams }: any) {
  const companyId = searchParams?.companyId || "COMP-000001";

  // Fetch all concurrent data
  const [banners, trending, categories] = await Promise.all([
    getBanners(companyId),
    getTrendingProducts(30, 8, companyId),
    getCategories(companyId)
  ]);

  const activeBanner = banners[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/30">
      
      {/* Top Utility Bar */}
      <div className="bg-emerald-900 text-emerald-50 text-xs py-2 px-8 flex justify-between items-center">
        <p className="font-medium tracking-wide">🌱 Free delivery on your first organic basket over $50!</p>
        <div className="hidden md:flex space-x-6 gap-2 opacity-80">
          <Link href="/about" className="hover:text-emerald-200 transition-colors">Farm Story</Link>
          <Link href="/contact" className="hover:text-emerald-200 transition-colors">Support</Link>
          <Link href="/login" className="hover:text-emerald-200 transition-colors font-bold">Sign In</Link>
        </div>
      </div>

      {/* Fresh Navbar */}
      <nav className="bg-white border-b border-slate-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Link href="/" className="text-3xl font-black text-emerald-800 tracking-tight flex items-center space-x-2">
          <span>Squadcart<span className="text-emerald-500">Fresh</span></span>
        </Link>
        
        {/* Search Bar - Center */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8 relative">
           <input type="text" placeholder="Search for fresh produce, dairy, bakery..." className="w-full bg-slate-100/50 border border-slate-200 rounded-full px-6 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner placeholder-slate-400" />
           <button className="absolute right-2 top-1.5 bottom-1.5 aspect-square bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </button>
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium text-slate-600">
          <Link href="/shop" className="hover:text-emerald-600 transition-colors hidden md:block">All Aisles</Link>
          <Link href="/cart" className="flex items-center hover:text-emerald-600 transition-colors bg-emerald-50 px-4 py-2 rounded-full text-emerald-800">
             <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
             <span className="font-bold">Basket</span>
          </Link>
        </div>
      </nav>

      {/* Hero Banner Area */}
      <header className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl flex flex-col justify-center overflow-hidden bg-emerald-50 shadow-sm border border-emerald-100/50">
          
          {activeBanner && activeBanner.imageUrl ? (
            <Image 
              src={activeBanner.imageUrl} 
              alt={activeBanner.title || 'Fresh Groceries'} 
              fill 
              className="object-cover object-right z-0" 
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-50/20 z-0" />
          )}
          
          {/* Fresh Leaf Pattern SVG */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE2LCAxODUsIDEyOSwgMC4yKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] z-[5]" />

          <div className="relative z-20 px-8 md:px-16 w-full max-w-2xl bg-gradient-to-r from-white/90 via-white/70 to-transparent p-12 h-full flex flex-col justify-center border-r border-white/20">
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
                {activeBanner?.subtitle || "Daily Harvest"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight mb-4 tracking-tight">
              {activeBanner?.title || "Fresh From Farm to Your Table."}
            </h1>
            
            <p className="text-slate-600 mb-8 font-medium text-lg leading-relaxed max-w-md">
              100% organic, pesticide-free vegetables, fruits, and dairy hand-picked every morning.
            </p>

            <div>
              <Link href={activeBanner?.buttonLink || "/shop"} className="inline-flex items-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-[0_8px_20px_rgba(5,150,105,0.2)] hover:shadow-[0_8px_25px_rgba(5,150,105,0.3)] transition-all hover:-translate-y-1">
                {activeBanner?.buttonText || "Shop Groceries"}
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Shop By Aisle (Categories Circular) */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <h3 className="text-2xl font-black text-slate-800 mb-10 text-center tracking-tight">Explore the Aisles</h3>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.slice(0, 6).map((cat: Category) => (
            <Link 
              key={cat.id} 
              href={`/shop?categoryId=${cat.id}`} 
              className="group flex flex-col items-center w-28 md:w-32"
            >
              <div className="aspect-square w-full rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center p-4 group-hover:shadow-md group-hover:border-emerald-200 transition-all duration-300 relative overflow-hidden mb-4">
                 {cat.thumbnail ? (
                   <Image src={cat.thumbnail} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                 ) : (
                   <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                   </div>
                 )}
              </div>
              <span className="text-sm font-bold text-slate-700 text-center group-hover:text-emerald-600 transition-colors">
                 {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Fresh Picks / Trending */}
      <section className="py-20 px-4 sm:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Today's Fresh Picks</h3>
              <p className="text-slate-500 font-medium">Top quality produce harvested within 24 hours.</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
              View All Items <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {trending.slice(0, 8).map((product: Product) => (
              <div key={product.id} className="group flex flex-col bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
                
                <Link href={`/product/${product.id}`} className="block relative aspect-square w-full rounded-xl bg-slate-50/50 overflow-hidden mb-4 flex items-center justify-center">
                  {product.discountPrice && product.discountPrice < product.price && (
                    <div className="absolute top-2 left-2 z-10 bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-2 py-1 rounded">
                       Sale
                    </div>
                  )}
                  {product.thumbnail ? (
                    <Image src={product.thumbnail} alt={product.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                  ) : (
                    <div className="w-full h-full text-xs font-medium text-slate-400 flex items-center justify-center">No Image</div>
                  )}
                </Link>
                
                <div className="flex-1 flex flex-col">
                  {/* Category Tag (Mocking based on name purely for UI) */}
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1 line-clamp-1">{product.category?.name || "Pantry"}</span>
                  <Link href={`/product/${product.id}`}>
                     <h4 className="text-base font-bold text-slate-800 mb-2 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">{product.name}</h4>
                  </Link>
                  
                  <div className="mt-auto flex items-center justify-between pt-1">
                    <div className="flex flex-col">
                      {product.discountPrice && product.discountPrice < product.price ? (
                        <>
                          <span className="text-slate-400 line-through text-xs">${product.price.toFixed(2)}</span>
                          <span className="text-emerald-600 font-black text-lg">${product.discountPrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-emerald-600 font-black text-lg">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    {/* Fast Add Button */}
                    <button className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors border border-emerald-100">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-emerald-900 border-t border-emerald-800 px-8 text-center">
         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
               <div className="w-16 h-16 bg-emerald-800/50 rounded-full flex items-center justify-center text-emerald-300 mb-4">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               </div>
               <h4 className="text-white font-bold mb-1">100% Organic</h4>
               <p className="text-emerald-200/70 text-sm">Certified Local Farms</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-16 h-16 bg-emerald-800/50 rounded-full flex items-center justify-center text-emerald-300 mb-4">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
               </div>
               <h4 className="text-white font-bold mb-1">Fast Delivery</h4>
               <p className="text-emerald-200/70 text-sm">Same-day inside DHA</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-16 h-16 bg-emerald-800/50 rounded-full flex items-center justify-center text-emerald-300 mb-4">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
               </div>
               <h4 className="text-white font-bold mb-1">Freshness Guard</h4>
               <p className="text-emerald-200/70 text-sm">Quality Checked</p>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-16 h-16 bg-emerald-800/50 rounded-full flex items-center justify-center text-emerald-300 mb-4">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               </div>
               <h4 className="text-white font-bold mb-1">Secure Payments</h4>
               <p className="text-emerald-200/70 text-sm">Card & Mobile Banking</p>
            </div>
         </div>
      </section>

      {/* Soft Footer */}
      <footer className="pt-20 pb-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-8 text-center flex flex-col items-center">
          <Link href="/" className="text-3xl font-black text-white tracking-tight flex items-center space-x-2 mb-8">
            <span>Squadcart<span className="text-emerald-500">Fresh</span></span>
          </Link>
          <div className="flex justify-center space-x-6 sm:space-x-12 text-sm font-medium text-slate-400 mb-12">
            <Link href="/about" className="hover:text-emerald-400 transition-colors">Our Farms</Link>
            <Link href="/shop" className="hover:text-emerald-400 transition-colors">All Groceries</Link>
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
          </div>
          <p className="text-slate-500 text-sm">Happy Earth 2026 © Squadcart Groceries</p>
        </div>
      </footer>
    </div>
  );
}
