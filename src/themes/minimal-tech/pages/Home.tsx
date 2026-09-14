import { getBanners, getTrendingProducts, getCategories, Product, Banner, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function MinimalTechHome({ searchParams }: any) {
  const companyId = searchParams?.companyId || "COMP-000001";

  // Fetch all concurrent data
  const [banners, trending, categories] = await Promise.all([
    getBanners(companyId),
    getTrendingProducts(30, 8, companyId),
    getCategories(companyId)
  ]);

  const activeBanner = banners[0];

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans selection:bg-cyan-500/30">
      {/* Hyper-Modern Navbar */}
      <nav className="border-b border-cyan-500/20 py-5 px-8 flex justify-between items-center bg-[#050B14]/80 backdrop-blur-xl sticky top-0 z-50 shadow-[0_4px_30px_rgba(6,182,212,0.1)]">
        <Link href="/" className="text-2xl font-black tracking-tight text-white flex items-center space-x-2">
          <span className="text-cyan-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.1L18.4 19H5.6L12 6.1z"/></svg>
          </span>
          <span>TECHNO<span className="text-cyan-500">VERSE</span></span>
        </Link>
        <div className="space-x-8 text-sm font-medium tracking-wide text-slate-400 hidden md:block">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Setup</Link>
          <Link href="/shop" className="hover:text-cyan-400 transition-colors">Hardware</Link>
          <Link href="/cart" className="hover:text-cyan-400 transition-colors">Cart</Link>
          <Link href="/login" className="px-4 py-2 border border-cyan-500/30 text-cyan-400 rounded-md hover:bg-cyan-500/10 transition-all">Sign In</Link>
        </div>
      </nav>

      {/* Cyberpunk Hero Section */}
      <header className="relative w-full h-[600px] flex items-center overflow-hidden border-b border-cyan-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B14] via-[#050B14]/80 to-transparent z-10" />
        
        {activeBanner && activeBanner.imageUrl ? (
          <Image 
            src={activeBanner.imageUrl} 
            alt={activeBanner.title || 'Tech Setup'} 
            fill 
            className="object-cover opacity-50 z-0" 
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/40 via-[#050B14] to-[#050B14] z-0" />
        )}
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDYsIDE4MiwgMjEyLCAwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] z-[5] opacity-50" />

        <div className="relative z-20 max-w-7xl mx-auto px-8 w-full flex flex-col items-start translate-y-8">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              {activeBanner?.subtitle || "Next-Gen Hardware"}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-2xl leading-tight drop-shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            {activeBanner?.title || "Unlock Absolute Performance."}
          </h1>
          
          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            Equip your creative space with precision-engineered peripherals and ultimate computing power.
          </p>

          <div className="mt-10 flex gap-4">
            <Link href={activeBanner?.buttonLink || "/shop"} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold tracking-wider uppercase rounded-lg shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all">
              {activeBanner?.buttonText || "Shop Hardware"}
            </Link>
            <Link href="/shop" className="px-8 py-4 bg-[#0A1121] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 font-bold tracking-wider uppercase rounded-lg transition-all">
              View Specs
            </Link>
          </div>
        </div>
      </header>

      {/* Bento Grid Categories */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto relative">
        <h3 className="text-2xl font-bold text-white mb-10 flex items-center">
            <span className="text-cyan-500 mr-3">/</span> Browse Specs
        </h3>
        
        {/* Bento Grid Layout (1 large, 3 small) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {categories.slice(0, 4).map((cat: Category, idx: number) => (
            <Link 
              key={cat.id} 
              href={`/shop?categoryId=${cat.id}`} 
              className={`group relative rounded-2xl overflow-hidden bg-[#0A1121] border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              {cat.thumbnail ? (
                <Image src={cat.thumbnail} alt={cat.name} fill className="object-cover opacity-40 group-hover:opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" />
              ) : (
                <div className="w-full h-full bg-[#0A1121]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent flex flex-col justify-end p-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className={`font-bold text-white tracking-wide ${idx === 0 ? 'text-4xl mb-2' : 'text-xl'}`}>
                      {cat.name}
                    </h4>
                    {idx === 0 && <p className="text-cyan-400 font-medium tracking-wide">Pro-Grade Equipment</p>}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-[#050B14] text-cyan-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Drops / Trending */}
      <section className="py-24 px-8 md:px-16 bg-[#0A1121] border-y border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="text-cyan-500 mr-3">/</span> Latest Architectures
            </h3>
            <Link href="/shop" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 tracking-wider flex items-center transition-colors">
              VIEW CATALOG <span className="ml-2">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.slice(0, 8).map((product: Product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group relative bg-[#050B14] rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-5 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col h-full">
                
                {product.discountPrice && product.discountPrice < product.price && (
                  <div className="absolute top-4 left-4 z-10 bg-rose-500/20 text-rose-400 text-[10px] font-bold px-3 py-1 rounded-full border border-rose-500/30 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                     {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                  </div>
                )}
                
                <div className="relative aspect-square w-full rounded-xl bg-slate-900 overflow-hidden mb-6 flex items-center justify-center p-4">
                  {product.thumbnail ? (
                    <Image src={product.thumbnail} alt={product.name} fill className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-[#0m] flex items-center justify-center text-xs font-mono text-slate-600">NO_DATA</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col">
                  <h4 className="text-base font-bold text-slate-200 mb-2 truncate group-hover:text-cyan-400 transition-colors">{product.name}</h4>
                  <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between">
                    <div>
                      {product.discountPrice && product.discountPrice < product.price ? (
                        <>
                          <span className="text-white font-bold text-lg">${product.discountPrice.toFixed(2)}</span>
                          <span className="text-slate-500 line-through text-xs ml-2">${product.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-cyan-400 font-bold text-lg">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500 group-hover:text-[#050B14] transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Futuristic Footer */}
      <footer className="pt-24 pb-12 text-center bg-[#050B14]">
        <Link href="/" className="text-3xl font-black tracking-tight text-white inline-flex items-center space-x-2 mb-8">
          <span className="text-cyan-500">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.1L18.4 19H5.6L12 6.1z"/></svg>
          </span>
          <span>TECHNO<span className="text-cyan-500">VERSE</span></span>
        </Link>
        <div className="flex justify-center space-x-8 text-sm font-medium text-slate-400 mb-12">
          <Link href="/about" className="hover:text-cyan-400 transition-colors">Manifesto</Link>
          <Link href="/shop" className="hover:text-cyan-400 transition-colors">Hardware</Link>
          <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Data Privacy</Link>
        </div>
        <p className="text-slate-600 font-mono text-xs">SYS.DATE: 2026 // ALL.RIGHTS.RESERVED.</p>
      </footer>
    </div>
  );
}
