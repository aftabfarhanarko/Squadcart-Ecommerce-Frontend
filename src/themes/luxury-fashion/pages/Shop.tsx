import { getProducts, getCategories, Product, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function LuxuryFashionShop({ searchParams }: any) {
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
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-serif selection:bg-amber-500/30">
      {/* Dynamic Navbar */}
      <nav className="border-b border-zinc-800/80 py-6 px-8 flex justify-between items-center bg-black/90 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-2xl tracking-widest text-amber-500 uppercase font-light">Squadcart Luxury</Link>
        <div className="space-x-8 text-sm tracking-widest text-zinc-400 hidden md:block">
          <Link href="/" className="hover:text-amber-400 transition-colors">HOME</Link>
          <Link href="/shop" className="text-amber-400 transition-colors">SHOP</Link>
          <Link href="/cart" className="hover:text-amber-400 transition-colors">CART</Link>
        </div>
      </nav>

      {/* Page Header */}
      <header className="py-24 text-center border-b border-zinc-800 mt-0 bg-zinc-900/20">
        <h1 className="text-4xl md:text-5xl tracking-[0.2em] font-light text-white uppercase mb-4">The Collection</h1>
        <p className="text-zinc-500 text-sm tracking-widest uppercase">Explore our finest curations</p>
      </header>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-16 flex flex-col md:flex-row gap-16">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="text-lg tracking-widest text-amber-500 uppercase mb-8 pb-4 border-b border-zinc-800/50">Categories</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/shop" className={`text-sm tracking-widest uppercase transition-colors ${!activeCategoryId ? 'text-white' : 'text-zinc-500 hover:text-amber-400'}`}>
                  All Pieces
                </Link>
              </li>
              {categories.map((cat: Category) => (
                <li key={cat.id}>
                  <Link href={`/shop?categoryId=${cat.id}`} className={`text-sm tracking-widest uppercase transition-colors ${activeCategoryId === cat.id ? 'text-white' : 'text-zinc-500 hover:text-amber-400'}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg tracking-widest text-amber-500 uppercase mt-12 mb-8 pb-4 border-b border-zinc-800/50">Filters</h3>
            <ul className="space-y-4">
               <li><button className="text-sm tracking-widest text-zinc-500 hover:text-amber-400 uppercase transition-colors">Price: Low to High</button></li>
               <li><button className="text-sm tracking-widest text-zinc-500 hover:text-amber-400 uppercase transition-colors">Price: High to Low</button></li>
               <li><button className="text-sm tracking-widest text-zinc-500 hover:text-amber-400 uppercase transition-colors">Newest Arrivals</button></li>
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-8 flex justify-between items-center text-xs tracking-widest text-zinc-500 uppercase border-b border-zinc-800/50 pb-4">
             <span>Showing {displayProducts.length} pieces</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {displayProducts.length > 0 ? (
                displayProducts.map((product: Product) => (
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
                ))
            ) : (
                <div className="col-span-full py-24 text-center">
                    <h3 className="text-2xl text-zinc-600 font-light">No pieces found in this collection.</h3>
                </div>
            )}
          </div>
        </div>
      </div>

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
