import { getBanners, getTrendingProducts, getCategories, Product, Banner, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function UrbanStreetwearHome({ searchParams }: any) {
  const companyId = searchParams?.companyId || "COMP-000001";

  // Fetch all concurrent data
  const [banners, trending, categories] = await Promise.all([
    getBanners(companyId),
    getTrendingProducts(30, 8, companyId),
    getCategories(companyId)
  ]);

  const activeBanner = banners[0];

  return (
    <div className="min-h-screen bg-stone-100 text-black font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Infinite Marquee Top Bar */}
      <div className="bg-rose-600 border-b-4 border-black text-rose-50 overflow-hidden py-2 uppercase font-black tracking-widest text-[10px] sm:text-xs">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] inline-block">
          <span className="mx-4">🔥 NEW DROP OUT NOW</span> •
          <span className="mx-4">FREE SHIPPING OVER $150</span> •
          <span className="mx-4">LIMITED EDITION PIECES</span> •
          <span className="mx-4">JOIN THE SYNDICATE</span> •
          <span className="mx-4">🔥 NEW DROP OUT NOW</span> •
          <span className="mx-4">FREE SHIPPING OVER $150</span> •
          <span className="mx-4">LIMITED EDITION PIECES</span> •
          <span className="mx-4">JOIN THE SYNDICATE</span>
        </div>
      </div>

      {/* Brutalist Navbar */}
      <nav className="border-b-4 border-black py-4 px-6 md:px-10 flex justify-between items-center bg-stone-100 sticky top-0 z-50">
        <Link href="/" className="text-3xl md:text-5xl font-black tracking-tighter uppercase transform -skew-x-6">
          SQUAD<span className="text-rose-600">CRTEL</span>
        </Link>
        <div className="hidden lg:flex space-x-10 text-sm font-black uppercase tracking-widest">
          <Link href="/shop" className="hover:text-rose-600 transition-colors">Drops</Link>
          <Link href="/shop" className="hover:text-rose-600 transition-colors">Lookbook</Link>
          <Link href="/cart" className="hover:text-rose-600 transition-colors">Stash</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/cart" className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-transparent hover:bg-stone-100 hover:text-black hover:border-black transition-all transform hover:rotate-3 font-bold">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6V4C16 1.79086 14.2091 0 12 0C9.79086 0 8 1.79086 8 4V6H0V22C0 23.1046 0.89543 24 2 24H22C23.1046 24 24 23.1046 24 22V6H16ZM10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4V6H10V4ZM22 22H2V8H8V11H10V8H14V11H16V8H22V22Z"/></svg>
          </Link>
          <Link href="/login" className="px-6 h-12 hidden md:flex items-center justify-center uppercase font-black bg-rose-600 text-white border-2 border-transparent hover:bg-stone-100 hover:text-rose-600 hover:border-rose-600 transition-all">
            Join
          </Link>
        </div>
      </nav>

      {/* Brutalist Hero Section - Split Screen */}
      <header className="w-full flex flex-col md:flex-row min-h-[70vh] border-b-4 border-black">
        
        {/* Left Typography Block */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-stone-100 relative overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-black">
          {/* Halftone BG Pattern */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-10 bg-[radial-gradient(circle,_#000_2px,_transparent_2px)] bg-[size:10px_10px]" />

          <div className="relative z-10">
            <h2 className="text-xl font-bold uppercase tracking-widest text-rose-600 mb-4 border-l-4 border-rose-600 pl-4">{activeBanner?.subtitle || "Season 01"}</h2>
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-8 break-words mix-blend-difference text-stone-900">
               {activeBanner?.title || "RAW URBAN ENERGY"}
            </h1>
            <p className="text-lg font-bold mb-10 max-w-sm uppercase bg-black text-white p-3 rotate-1">
              Strictly limited pieces. When it's gone, it's never coming back.
            </p>
            <Link href="/shop" className="group inline-flex items-center space-x-4">
              <span className="px-8 py-5 bg-rose-600 text-white text-xl font-black uppercase border-4 border-black transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-[-8px_8px_0_0_#000] transition-all">
                Shop Drop
              </span>
            </Link>
          </div>
        </div>
        
        {/* Right Image Block */}
        <div className="w-full md:w-1/2 relative bg-black min-h-[400px]">
          {activeBanner && activeBanner.imageUrl ? (
            <Image 
              src={activeBanner.imageUrl} 
              alt="Hero Block" 
              fill 
              className="object-cover object-center filter grayscale hover:grayscale-0 transition-all duration-700" 
            />
          ) : (
            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center text-zinc-800 text-9xl font-black">X</div>
          )}
          {/* Huge Tape Sticker */}
          <div className="absolute top-8 -left-12 bg-yellow-400 text-black font-black uppercase py-2 px-16 transform -rotate-45 border-y-4 border-black text-2xl tracking-widest shadow-lg hidden md:block z-10">
            HYPEBEAST
          </div>
        </div>
      </header>

      {/* Grid Categories */}
      <section className="bg-stone-100 border-b-4 border-black">
        <div className="grid grid-cols-2 md:grid-cols-4">
           {categories.slice(0, 4).map((cat: Category, idx: number) => (
             <Link href={`/shop?categoryId=${cat.id}`} key={cat.id} className={`group block relative aspect-square border-r-4 border-black last:border-r-0 ${idx > 1 ? 'border-t-4 md:border-t-0' : 'border-t-4 md:border-t-0'} border-black bg-stone-200 overflow-hidden`}>
                {cat.thumbnail && (
                  <Image src={cat.thumbnail} alt={cat.name} fill className="object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-500" />
                )}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                   <h3 className="text-3xl font-black uppercase text-black bg-white inline-block px-3 py-1 self-start transform -rotate-2 group-hover:rotate-0 transition-all border-2 border-black">
                     {cat.name}
                   </h3>
                </div>
             </Link>
           ))}
        </div>
      </section>

      {/* Latest Drops / Trending */}
      <section className="py-24 px-6 md:px-10 bg-yellow-400 border-b-4 border-black">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h3 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-black drop-shadow-[5px_5px_0_#fff]">
              HYPE ARCHIVE
            </h3>
            <Link href="/shop" className="px-6 py-3 bg-black text-white font-black uppercase border-2 border-black hover:bg-stone-100 hover:text-black transition-colors">
              View Entire Stash &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trending.slice(0, 8).map((product: Product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col bg-stone-100 border-4 border-black p-4 relative hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300">
                
                {product.discountPrice && product.discountPrice < product.price && (
                  <div className="absolute -top-4 -right-4 z-10 bg-rose-600 text-white font-black uppercase px-4 py-2 text-sm border-2 border-black transform rotate-12 group-hover:rotate-6 transition-transform">
                     SALE
                  </div>
                )}
                
                <div className="relative aspect-[3/4] w-full bg-stone-200 border-2 border-black overflow-hidden mb-6 flex items-center justify-center p-4">
                  {product.thumbnail ? (
                    <Image src={product.thumbnail} alt={product.name} fill className="object-center object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  ) : (
                    <div className="font-bold uppercase text-stone-400">NO MEDIA</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col max-h-[120px]">
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2 truncate block">{product.category?.name || "Apparel"}</span>
                  <h4 className="text-lg font-black uppercase text-black mb-3 line-clamp-2 leading-tight">{product.name}</h4>
                  
                  <div className="mt-auto flex items-center justify-between border-t-2 border-black pt-4">
                    <div className="font-mono font-black text-xl">
                      {product.discountPrice && product.discountPrice < product.price ? (
                        <div className="flex items-center space-x-2">
                           <span className="text-rose-600">${product.discountPrice.toFixed(2)}</span>
                           <span className="text-stone-400 line-through text-sm">${product.price.toFixed(2)}</span>
                        </div>
                      ) : (
                        <span>${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="text-black font-black uppercase text-sm hover:underline">Cop Now</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brutalist Footer */}
      <footer className="pt-24 pb-10 bg-black text-white relative overflow-hidden">
        {/* Huge Background Text */}
        <div className="absolute top-0 left-0 text-[20vw] font-black uppercase opacity-5 tracking-tighter leading-none pointer-events-none whitespace-nowrap">
           SQUADCRTEL
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div>
                 <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 drop-shadow-[4px_4px_0_#e11d48]">Join The Syndicate</h2>
                 <p className="text-stone-400 font-bold max-w-sm mb-8">Access secret drops, underground communities, and 1/1 pieces.</p>
                 <div className="flex border-4 border-stone-800 focus-within:border-rose-600 transition-colors">
                    <input type="email" placeholder="YOUR@EMAIL.COM" className="w-full bg-transparent px-6 py-4 font-mono font-bold text-white focus:outline-none uppercase" />
                    <button className="bg-stone-800 hover:bg-rose-600 px-8 font-black uppercase transition-colors">Submit</button>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 font-bold uppercase tracking-widest text-sm">
                 <div className="flex flex-col space-y-4">
                    <Link href="/shop" className="hover:text-rose-600 transition-colors">Drops</Link>
                    <Link href="/shop" className="hover:text-rose-600 transition-colors">Lookbook</Link>
                    <Link href="/shop" className="hover:text-rose-600 transition-colors">Archive</Link>
                 </div>
                 <div className="flex flex-col space-y-4 text-stone-500">
                    <Link href="/about" className="hover:text-white transition-colors">Rules</Link>
                    <Link href="/shipping" className="hover:text-white transition-colors">Logistics</Link>
                    <Link href="/privacy" className="hover:text-white transition-colors">Spyware Policy</Link>
                 </div>
              </div>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between items-center border-t-2 border-stone-800 pt-8 text-stone-500 font-bold text-xs uppercase tracking-widest">
              <span>© 2026 SQUADCRTEL SYSTEM</span>
              <span className="mt-4 md:mt-0">DESIGNED BY ANTI-ESTABLISHMENT</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
