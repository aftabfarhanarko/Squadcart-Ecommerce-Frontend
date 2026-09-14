import { getBanners, getTrendingProducts, getCategories, Product, Banner, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function LuxuryFashionHome({ searchParams }: any) {
  const companyId = searchParams?.companyId || "COMP-000001";

  // Fetch all concurrent data
  const [banners, trending, categories] = await Promise.all([
    getBanners(companyId),
    getTrendingProducts(30, 8, companyId),
    getCategories(companyId)
  ]);

  const activeBanner = banners[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-serif selection:bg-amber-500/30">
      {/* Dynamic Navbar */}
      <nav className="border-b border-zinc-800/80 py-6 px-8 flex justify-between items-center bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-2xl tracking-widest text-amber-500 uppercase font-light">Squadcart Luxury</Link>
        <div className="space-x-8 text-sm tracking-widest text-zinc-400 hidden md:block">
          <Link href="/" className="hover:text-amber-400 transition-colors">HOME</Link>
          <Link href="/shop" className="hover:text-amber-400 transition-colors">SHOP</Link>
          <Link href="/cart" className="hover:text-amber-400 transition-colors">CART</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden">
        {activeBanner ? (
          <>
            {activeBanner.imageUrl ? (
              <Image 
                src={activeBanner.imageUrl} 
                alt={activeBanner.title || 'Luxury Fashion'} 
                fill 
                className="object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-[2s]" 
              />
            ) : (
               <div className="absolute inset-0 bg-neutral-900 w-full h-full" />
            )}
            
            <div className="relative z-10 text-center space-y-6 max-w-3xl px-6">
              <h2 className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-500">
                {activeBanner.subtitle || "A/W 2026 Collection"}
              </h2>
              <h1 className="text-5xl md:text-6xl font-light tracking-wide text-white drop-shadow-2xl">
                {activeBanner.title || "Elevate Your Style"}
              </h1>
              <div className="pt-8">
                <Link href={activeBanner.buttonLink || "/shop"} className="px-8 py-3 border border-amber-500/50 hover:bg-amber-500 hover:text-black transition-all duration-300 tracking-widest text-xs md:text-sm uppercase">
                  {activeBanner.buttonText || "Discover Now"}
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-zinc-900 w-full h-full flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-5xl font-light text-amber-500 tracking-wide">The Modern Classics</h1>
            <p className="mt-4 text-zinc-400 tracking-widest uppercase text-sm">Experience True Elegance</p>
          </div>
        )}
      </header>

      {/* Featured Categories */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-20 space-y-6">
          <span className="w-px h-16 bg-amber-500/50"></span>
          <h3 className="text-3xl tracking-wider font-light text-zinc-100">Curated Edits</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.slice(0, 4).map((cat: Category) => (
            <Link key={cat.id} href={`/shop?categoryId=${cat.id}`} className="group relative aspect-[3/4] overflow-hidden bg-zinc-900 block">
              {cat.thumbnail ? (
                <Image src={cat.thumbnail} alt={cat.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-sm tracking-widest uppercase">No Visual</div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500">
                <h4 className="text-lg md:text-xl tracking-widest uppercase border border-white/20 px-8 py-3 backdrop-blur-sm group-hover:border-amber-500 group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-all duration-300">
                  {cat.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 px-8 md:px-16 bg-zinc-900/40 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
               <h3 className="text-3xl tracking-wider font-light mb-3 text-zinc-100">New Arrivals</h3>
               <p className="text-amber-500/80 tracking-[0.2em] text-xs uppercase">Uncompromising Quality</p>
            </div>
            <Link href="/shop" className="text-amber-500 hover:text-amber-400 text-xs md:text-sm tracking-widest border-b border-amber-500/30 pb-1 hover:border-amber-400 transition-colors uppercase">
              View All Pieces
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {trending.slice(0, 8).map((product: Product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-6 border border-zinc-800/50">
                  {product.thumbnail ? (
                    <Image src={product.thumbnail} alt={product.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center tracking-widest text-xs text-zinc-600">No Image</div>
                  )}
                  {product.discountPrice && product.discountPrice < product.price && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 tracking-widest uppercase">
                      Sale
                    </div>
                  )}
                </div>
                <h4 className="text-sm tracking-widest text-zinc-300 mb-3 truncate group-hover:text-amber-400 transition-colors uppercase">{product.name}</h4>
                <div className="flex items-center space-x-4 text-sm font-sans">
                  {product.discountPrice && product.discountPrice < product.price ? (
                    <>
                      <span className="text-amber-500 font-light">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-zinc-600 line-through text-xs">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-amber-500 font-light">${product.price.toFixed(2)}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 text-center border-t border-zinc-800 mt-0 bg-black">
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
