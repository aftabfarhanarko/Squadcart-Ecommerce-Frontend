import { getProducts, getCategories, Product, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function MinimalTechShop({ searchParams }: any) {
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
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-500/30 flex flex-col">
      {/* Hyper-Modern Navbar */}
      <nav className="border-b border-cyan-500/20 py-5 px-8 flex justify-between items-center bg-[#050B14]/80 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="text-lg font-black tracking-tight text-white flex items-center space-x-2">
          <span className="text-cyan-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.1L18.4 19H5.6L12 6.1z"/></svg>
          </span>
          <span>TECHNO<span className="text-cyan-500">VERSE</span></span>
        </Link>
        <div className="space-x-8 text-sm font-medium tracking-wide text-slate-400 hidden md:block">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Setup</Link>
          <Link href="/shop" className="text-cyan-400 transition-colors">Hardware</Link>
          <Link href="/cart" className="hover:text-cyan-400 transition-colors">Cart</Link>
        </div>
      </nav>

      {/* Cyberpunk Page Header */}
      <header className="py-12 bg-[#0A1121] border-b border-cyan-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] z-[0] opacity-30" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16">
           <div className="flex items-center space-x-2 text-cyan-500 mb-2 font-mono text-xs">
              <span>//</span> <span>DATABASE</span> <span>/</span> <span>HARDWARE</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">System Components</h1>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-12 flex flex-col md:flex-row gap-8 flex-1 w-full">
        
        {/* Futuristic Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32 bg-[#0A1121] border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center">
              <svg className="w-4 h-4 mr-2 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
              Classes
            </h3>
            <ul className="space-y-3 font-medium text-sm">
              <li>
                <Link href="/shop" className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${!activeCategoryId ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                  <span>All Hardware</span>
                </Link>
              </li>
              {categories.map((cat: Category) => (
                <li key={cat.id}>
                  <Link href={`/shop?categoryId=${cat.id}`} className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeCategoryId === cat.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center text-sm font-medium text-slate-400 bg-[#0A1121] border border-slate-800 rounded-xl px-6 py-4">
             <span className="font-mono text-cyan-500">[{displayProducts.length}] Results Found</span>
             <div className="flex items-center space-x-2">
                <span>View:</span>
                <span className="text-white cursor-pointer hover:text-cyan-400">Grid</span>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.length > 0 ? (
                displayProducts.map((product: Product) => (
                  <Link href={`/product/${product.id}`} key={product.id} className="group relative bg-[#0A1121] rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-5 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col h-full">
                
                  {product.discountPrice && product.discountPrice < product.price && (
                    <div className="absolute top-4 left-4 z-10 bg-rose-500/20 text-rose-400 text-[10px] font-bold px-3 py-1 rounded-full border border-rose-500/30 flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                       -{Math.round((1 - product.discountPrice / product.price) * 100)}%
                    </div>
                  )}
                  
                  <div className="relative aspect-square w-full rounded-xl bg-slate-900 border border-slate-800/50 overflow-hidden mb-6 flex items-center justify-center p-4">
                    {product.thumbnail ? (
                      <Image src={product.thumbnail} alt={product.name} fill className="object-contain drop-shadow-2xl group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-[#0A1121] flex items-center justify-center font-mono text-xs text-slate-700">NO_IMG</div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-sm font-bold text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">{product.name}</h4>
                    <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between">
                      <div>
                        {product.discountPrice && product.discountPrice < product.price ? (
                          <>
                            <span className="text-white font-bold text-lg">${product.discountPrice.toFixed(2)}</span>
                            <span className="text-cyan-700 line-through text-xs ml-2">${product.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="text-cyan-400 font-bold text-lg">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <button className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-[#050B14] shadow-[0_0_10px_rgba(6,182,212,0)] group-hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </button>
                    </div>
                  </div>
                </Link>
                ))
            ) : (
                <div className="col-span-full py-24 text-center bg-[#0A1121] border border-slate-800 rounded-2xl">
                    <h3 className="text-xl font-mono text-cyan-600">ERR_404: hardware_not_found</h3>
                </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
