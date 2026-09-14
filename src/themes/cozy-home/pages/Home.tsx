import { getBanners, getTrendingProducts, getCategories, Product, Banner, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CozyHomeHome({ searchParams }: any) {
  const companyId = searchParams?.companyId || "COMP-000001";

  // Fetch all concurrent data
  const [banners, trending, categories] = await Promise.all([
    getBanners(companyId),
    getTrendingProducts(30, 8, companyId),
    getCategories(companyId)
  ]);

  const activeBanner = banners[0];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-sans selection:bg-[#B5835A] selection:text-white">
      
      {/* Top Utility Bar */}
      <div className="bg-[#4A4238] text-[#FDFBF7] text-xs py-2.5 px-8 flex justify-center items-center font-medium tracking-wide">
        <span>Complimentary delivery & assembly on orders over $5,000</span>
      </div>

      {/* Elegant Navbar */}
      <nav className="border-b border-[#E5E0D8] py-6 px-8 md:px-16 flex justify-between items-center bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="hidden lg:flex space-x-10 text-sm font-medium text-[#706B65] tracking-wide">
          <Link href="/shop" className="hover:text-[#4A4238] transition-colors">Living</Link>
          <Link href="/shop" className="hover:text-[#4A4238] transition-colors">Dining</Link>
          <Link href="/shop" className="hover:text-[#4A4238] transition-colors">Bedroom</Link>
        </div>
        
        <Link href="/" className="text-2xl md:text-3xl font-serif text-[#4A4238] tracking-tight">
          NORDIC<span className="italic text-[#B5835A]">HAVEN</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/login" className="hidden md:block text-sm font-medium text-[#706B65] hover:text-[#4A4238] tracking-wide transition-colors">
            Account
          </Link>
          <Link href="/cart" className="flex items-center space-x-2 text-[#4A4238] hover:text-[#B5835A] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span className="text-xs font-bold leading-none bg-[#F4F1EB] px-2 py-1 rounded-full">0</span>
          </Link>
        </div>
      </nav>

      {/* Immersive Warm Hero Section */}
      <header className="px-4 sm:px-8 mt-4 md:mt-8 max-w-[1600px] mx-auto">
        <div className="relative w-full h-[60vh] md:h-[75vh] rounded-2xl md:rounded-[2.5rem] overflow-hidden flex flex-col justify-end bg-[#F4F1EB]">
          
          {activeBanner && activeBanner.imageUrl ? (
            <Image 
              src={activeBanner.imageUrl} 
              alt={activeBanner.title || 'Cozy Interior'} 
              fill 
              className="object-cover object-center z-0" 
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E5E0D8] to-[#FDFBF7] z-0" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1815]/60 via-transparent to-transparent z-[5]" />

          <div className="relative z-20 px-8 md:px-16 pb-12 md:pb-20 max-w-3xl flex flex-col items-start translate-y-4 md:translate-y-8">
            <span className="uppercase tracking-[0.25em] text-xs font-bold text-[#E5E0D8] mb-4">
              {activeBanner?.subtitle || "The Autumn Collection"}
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6">
              {activeBanner?.title || "Design that feels like home."}
            </h1>
            
            <Link href={activeBanner?.buttonLink || "/shop"} className="group inline-flex items-center bg-white text-[#4A4238] px-8 py-4 rounded-full text-sm font-bold tracking-wide hover:bg-[#B5835A] hover:text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <span>{activeBanner?.buttonText || "Shop Collection"}</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Curated Categories */}
      <section className="py-24 px-8 md:px-16 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h3 className="text-3xl md:text-4xl font-serif text-[#4A4238]">Shop by Space</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {categories.slice(0, 3).map((cat: Category, idx: number) => (
            <Link 
              key={cat.id} 
              href={`/shop?categoryId=${cat.id}`} 
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full rounded-2xl md:rounded-[2rem] bg-[#F4F1EB] overflow-hidden mb-6">
                 {cat.thumbnail && (
                   <Image src={cat.thumbnail} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                 )}
              </div>
              <h4 className="text-xl font-serif text-[#4A4238] mb-2">{cat.name}</h4>
              <span className="text-sm text-[#706B65] group-hover:text-[#B5835A] transition-colors flex items-center">
                 Explore Pieces <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals / Trending Collection */}
      <section className="py-24 bg-[#F4F1EB]">
        <div className="px-8 md:px-16 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif text-[#4A4238] mb-4">Latest Additions</h3>
              <p className="text-[#706B65] max-w-lg">Thoughtfully crafted objects using sustainable wood, solid brass, and organic textiles intended to age beautifully.</p>
            </div>
            <Link href="/shop" className="px-6 py-3 border border-[#4A4238] text-[#4A4238] rounded-full text-sm font-bold tracking-wide hover:bg-[#4A4238] hover:text-white transition-all">
              View Entire Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {trending.slice(0, 8).map((product: Product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col">
                <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden mb-6">
                  {product.discountPrice && product.discountPrice < product.price && (
                    <div className="absolute top-4 left-4 z-10 bg-[#B5835A] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full">
                       Special
                    </div>
                  )}
                  {product.thumbnail ? (
                    <Image src={product.thumbnail} alt={product.name} fill className="object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#E5E0D8]">No Image</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col">
                  {/* Mock Material Info */}
                  <span className="text-[#A39E98] text-[10px] uppercase tracking-wider mb-2 font-medium">{product.category?.name || "Solid Oak"}</span>
                  <h4 className="text-lg font-serif text-[#4A4238] mb-2 leading-snug group-hover:text-[#B5835A] transition-colors">{product.name}</h4>
                  
                  <div className="mt-2 flex items-center">
                    {product.discountPrice && product.discountPrice < product.price ? (
                      <div className="flex items-center space-x-3">
                         <span className="text-[#B5835A] font-medium tracking-wide">${product.discountPrice.toFixed(0)}</span>
                         <span className="text-[#A39E98] line-through text-xs">${product.price.toFixed(0)}</span>
                      </div>
                    ) : (
                      <span className="text-[#4A4238] font-medium tracking-wide">${product.price.toFixed(0)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Statement */}
      <section className="py-32 px-8 text-center bg-[#FDFBF7]">
         <div className="max-w-2xl mx-auto flex flex-col items-center">
           <svg className="w-12 h-12 text-[#B5835A] mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
           <h3 className="text-3xl font-serif text-[#4A4238] leading-tight mb-6">Designed for longevity. Built by master craftsmen.</h3>
           <p className="text-[#706B65] leading-relaxed">We source sustainable materials globally and work with generational artisans to create furniture that doesn't just fill a space, but defines a home's character for decades.</p>
         </div>
      </section>

      {/* Elegant Footer */}
      <footer className="pt-20 pb-12 bg-[#4A4238] text-[#E5E0D8]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
           <div>
             <Link href="/" className="text-3xl font-serif text-white tracking-tight mb-6 block">
               NORDIC<span className="italic text-[#B5835A]">HAVEN</span>
             </Link>
             <p className="text-[#A39E98] text-sm max-w-xs leading-relaxed">
               Crafting timeless spaces through thoughtful, minimalist design and superior organic materials.
             </p>
           </div>
           
           <div className="grid grid-cols-2 gap-8 md:col-span-2">
             <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Categories</h4>
                <ul className="space-y-4 text-sm text-[#A39E98]">
                  <li><Link href="/shop" className="hover:text-white transition-colors">Living Room</Link></li>
                  <li><Link href="/shop" className="hover:text-white transition-colors">Dining & Kitchen</Link></li>
                  <li><Link href="/shop" className="hover:text-white transition-colors">Bedroom & Office</Link></li>
                  <li><Link href="/shop" className="hover:text-white transition-colors">Lighting</Link></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Assistance</h4>
                <ul className="space-y-4 text-sm text-[#A39E98]">
                  <li><Link href="/faq" className="hover:text-white transition-colors">Care Guide</Link></li>
                  <li><Link href="/shipping" className="hover:text-white transition-colors">Delivery Options</Link></li>
                  <li><Link href="/warranty" className="hover:text-white transition-colors">10-Year Warranty</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact Design Team</Link></li>
                </ul>
             </div>
           </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 pt-8 border-t border-[#706B65] flex flex-col md:flex-row justify-between items-center text-xs text-[#A39E98]">
           <span>© 2026 Nordic Haven Interiors.</span>
           <div className="flex space-x-6 mt-4 md:mt-0">
             <Link href="/privacy" className="hover:text-white transition-colors">Privacy Information</Link>
             <Link href="/terms" className="hover:text-white transition-colors">Terms of Purchase</Link>
           </div>
        </div>
      </footer>

    </div>
  );
}
