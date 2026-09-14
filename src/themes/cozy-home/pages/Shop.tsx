import { getProducts, getCategories, Product, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CozyHomeShop({ searchParams }: any) {
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#333333] font-sans selection:bg-[#B5835A] selection:text-white flex flex-col">
      {/* Elegant Navbar */}
      <nav className="border-b border-[#E5E0D8] py-6 px-8 md:px-16 flex justify-between items-center bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex space-x-8 text-sm font-medium text-[#706B65] tracking-wide">
          <Link href="/shop" className="text-[#4A4238] transition-colors">Collection</Link>
        </div>
        
        <Link href="/" className="text-2xl font-serif text-[#4A4238] tracking-tight">
          NORDIC<span className="italic text-[#B5835A]">HAVEN</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link href="/cart" className="flex items-center space-x-2 text-[#4A4238] hover:text-[#B5835A] transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Basket</span>
            <span className="text-xs font-bold leading-none bg-[#F4F1EB] px-2 py-1 rounded-full">0</span>
          </Link>
        </div>
      </nav>

      <header className="py-16 md:py-24 max-w-[1600px] mx-auto w-full px-8 md:px-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4A4238] leading-tight mb-6">
           {activeCategoryId ? categories.find((c: Category) => c.id === activeCategoryId)?.name : "The Complete Collection"}
        </h1>
        <p className="text-[#706B65] max-w-xl mx-auto leading-relaxed">
          Explore our range of timeless furniture, crafted carefully to bring warmth, functionality, and organic beauty to your everyday living spaces.
        </p>
      </header>

      {/* Filter / Sort Row */}
      <div className="border-y border-[#E5E0D8] bg-[#FDFBF7] sticky top-[80px] z-40 transition-all">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
           
           <div className="flex overflow-x-auto hide-scrollbar space-x-8 text-sm font-medium">
             <Link href="/shop" className={`whitespace-nowrap pb-1 transition-colors ${!activeCategoryId ? 'text-[#4A4238] border-b border-[#4A4238]' : 'text-[#A39E98] hover:text-[#706B65]'}`}>
               All Pieces
             </Link>
             {categories.map((cat: Category) => (
                <Link key={cat.id} href={`/shop?categoryId=${cat.id}`} className={`whitespace-nowrap pb-1 transition-colors ${activeCategoryId === cat.id ? 'text-[#4A4238] border-b border-[#4A4238]' : 'text-[#A39E98] hover:text-[#706B65]'}`}>
                  {cat.name}
                </Link>
             ))}
           </div>
           
           <div className="flex items-center space-x-2 text-sm text-[#706B65]">
              <span className="uppercase tracking-widest text-[10px] font-bold">Sort:</span>
              <select className="bg-transparent border-0 focus:ring-0 cursor-pointer font-medium text-[#4A4238]">
                 <option>Featured</option>
                 <option>Newest Arrivals</option>
                 <option>Price: Low to High</option>
              </select>
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-8 md:px-16 py-16 flex-1">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {displayProducts.length > 0 ? (
              displayProducts.map((product: Product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col">
              
                <div className="relative aspect-[4/5] w-full bg-[#F4F1EB] rounded-[1.5rem] overflow-hidden mb-6">
                  {product.discountPrice && product.discountPrice < product.price && (
                    <div className="absolute top-4 right-4 z-10 text-[#B5835A] text-xs font-serif italic">
                       Sale
                    </div>
                  )}
                  {product.thumbnail ? (
                    <Image src={product.thumbnail} alt={product.name} fill className="object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#E5E0D8]">No Image</div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col text-center">
                  <span className="text-[#A39E98] text-[10px] uppercase tracking-widest mb-1.5 font-medium">{product.category?.name || "Interior"}</span>
                  <h4 className="text-lg font-serif text-[#4A4238] mb-2 leading-snug group-hover:text-[#B5835A] transition-colors">{product.name}</h4>
                  
                  <div className="mt-1 flex items-center justify-center">
                    {product.discountPrice && product.discountPrice < product.price ? (
                      <div className="flex items-center space-x-3">
                         <span className="text-[#B5835A] font-medium tracking-wide">${product.discountPrice.toFixed(0)}</span>
                         <span className="text-[#A39E98] line-through text-xs">${product.price.toFixed(0)}</span>
                      </div>
                    ) : (
                      <span className="text-[#706B65] tracking-wide">${product.price.toFixed(0)}</span>
                    )}
                  </div>
                </div>
              </Link>
              ))
          ) : (
              <div className="col-span-full py-32 text-center text-[#706B65]">
                  <h3 className="text-2xl font-serif text-[#4A4238] mb-4">No pieces match this selection.</h3>
                  <button onClick={() => window.history.back()} className="mt-4 px-8 py-3 bg-[#4A4238] text-white rounded-full text-sm font-bold shadow-lg hover:-translate-y-0.5 transition-all">Go Back</button>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
