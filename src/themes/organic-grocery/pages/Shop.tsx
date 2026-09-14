import { getProducts, getCategories, Product, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function OrganicGroceryShop({ searchParams }: any) {
  const companyId = searchParams?.companyId || "COMP-000001";
  const activeCategoryId = searchParams?.categoryId ? Number(searchParams.categoryId) : null;

  // Fetch data
  const [allProducts, categories] = await Promise.all([
    getProducts(companyId),
    getCategories(companyId)
  ]);

  // Filter products by category if selected
  const displayProducts = activeCategoryId 
    ? allProducts.filter((p: Product) => p.category?.id === activeCategoryId)
    : allProducts;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500/30 flex flex-col">
      {/* Fresh Navbar */}
      <nav className="bg-white border-b border-slate-100 py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Link href="/" className="text-2xl font-black text-emerald-800 tracking-tight flex items-center space-x-2">
          <span>Squadcart<span className="text-emerald-500">Fresh</span></span>
        </Link>
        <div className="flex flex-1 max-w-xl mx-8 relative hidden md:block">
           <input type="text" placeholder="Search for fresh produce..." className="w-full bg-slate-100/50 border border-slate-200 rounded-full px-6 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder-slate-400" />
           <button className="absolute right-2 top-1 bottom-1 aspect-square bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </button>
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium text-slate-600">
          <Link href="/shop" className="text-emerald-600 transition-colors font-bold hidden md:block">All Aisles</Link>
          <Link href="/cart" className="flex items-center hover:text-emerald-600 transition-colors bg-emerald-50 px-4 py-2 rounded-full text-emerald-800">
             <span className="font-bold">Basket</span>
          </Link>
        </div>
      </nav>

      {/* Shop Header */}
      <header className="bg-white border-b border-slate-100 py-8 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 flex items-center justify-between">
           <div>
              <div className="flex items-center space-x-2 text-slate-400 mb-1 text-xs font-bold uppercase tracking-wider">
                 <Link href="/" className="hover:text-emerald-500 transition-colors">Home</Link>
                 <span>/</span>
                 <span className="text-emerald-600">Aisles</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Marketplace</h1>
           </div>
           
           <div className="hidden md:flex bg-emerald-50 text-emerald-800 rounded-full px-4 py-2 border border-emerald-100 items-center space-x-2 text-sm font-medium">
             <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <span>Delivery within 2 hours</span>
           </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8 flex-1 w-full">
        
        {/* Soft Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 tracking-tight mb-4">Aisles</h3>
            
            <div className="space-y-1 mb-8">
               <Link href="/shop" className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${!activeCategoryId ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'}`}>
                  <span>All Groceries</span>
               </Link>
              {categories.map((cat: Category) => (
                <Link key={cat.id} href={`/shop?categoryId=${cat.id}`} className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm ${activeCategoryId === cat.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'}`}>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                     {cat.thumbnail && <Image src={cat.thumbnail} alt={cat.name} fill className="object-cover" />}
                  </div>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>

            <h3 className="text-lg font-black text-slate-800 tracking-tight mb-4 border-t border-slate-100 pt-6">Sort By</h3>
            <div className="space-y-3 font-medium text-sm text-slate-600">
               <label className="flex items-center space-x-3 cursor-pointer hover:text-emerald-600">
                  <input type="radio" name="sort" className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 accent-emerald-500 border-slate-300" />
                  <span>Popular</span>
               </label>
               <label className="flex items-center space-x-3 cursor-pointer hover:text-emerald-600">
                  <input type="radio" name="sort" className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 accent-emerald-500 border-slate-300" />
                  <span>Price: Low to High</span>
               </label>
               <label className="flex items-center space-x-3 cursor-pointer hover:text-emerald-600">
                  <input type="radio" name="sort" className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 accent-emerald-500 border-slate-300" />
                  <span>Price: High to Low</span>
               </label>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center px-2">
             <span className="font-bold text-slate-500 text-sm">{displayProducts.length} items found</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts.length > 0 ? (
                displayProducts.map((product: Product) => (
                  <div key={product.id} className="group flex flex-col bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl hover:shadow-slate-200/50 hover border-emerald-100 transition-all duration-300">
                
                  <Link href={`/product/${product.id}`} className="block relative aspect-square w-full rounded-xl bg-slate-50 overflow-hidden mb-4 flex items-center justify-center p-4">
                    {product.discountPrice && product.discountPrice < product.price && (
                      <div className="absolute top-2 left-2 z-10 bg-rose-100 text-rose-700 text-[10px] uppercase font-black px-2 py-1 rounded">
                         Sale
                      </div>
                    )}
                    {/* Add to Cart overlay on image hover (Desktop) */}
                    <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-[2px] hidden md:flex">
                       <button className="bg-emerald-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                          Quick Add
                       </button>
                    </div>

                    {product.thumbnail ? (
                      <Image src={product.thumbnail} alt={product.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                    ) : (
                      <div className="w-full h-full text-xs font-medium text-slate-400 flex items-center justify-center">No Image</div>
                    )}
                  </Link>
                  
                  <div className="flex-1 flex flex-col pointer-events-none md:pointer-events-auto">
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mb-1 line-clamp-1">{product.category?.name || "Grocery"}</span>
                    <Link href={`/product/${product.id}`}>
                       <h4 className="text-base font-bold text-slate-800 mb-2 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">{product.name}</h4>
                    </Link>
                    
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex flex-col">
                        {product.discountPrice && product.discountPrice < product.price ? (
                          <>
                            <span className="text-slate-400 line-through text-xs font-medium">${product.price.toFixed(2)}</span>
                            <span className="text-emerald-600 font-black text-lg">${product.discountPrice.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-emerald-600 font-black text-lg">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <button className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-sm md:hidden pointer-events-auto">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
                ))
            ) : (
                <div className="col-span-full py-24 text-center bg-white border border-slate-100 rounded-3xl">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No grocerices found in this aisle</h3>
                    <button onClick={() => window.history.back()} className="mt-4 px-6 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-full">Go Back</button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
