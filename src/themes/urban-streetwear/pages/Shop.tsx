import { getProducts, getCategories, Product, Category } from "@/lib/api-services";
import Link from "next/link";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function UrbanStreetwearShop({ searchParams }: any) {
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
    <div className="min-h-screen bg-stone-100 text-black font-sans selection:bg-rose-500 selection:text-white flex flex-col">
      {/* Brutalist Navbar */}
      <nav className="border-b-4 border-black py-4 px-6 md:px-10 flex justify-between items-center bg-stone-100 sticky top-0 z-50">
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase transform -skew-x-6">
          SQUAD<span className="text-rose-600">CRTEL</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/cart" className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all font-bold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6V4C16 1.79086 14.2091 0 12 0C9.79086 0 8 1.79086 8 4V6H0V22C0 23.1046 0.89543 24 2 24H22C23.1046 24 24 23.1046 24 22V6H16ZM10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4V6H10V4ZM22 22H2V8H8V11H10V8H14V11H16V8H22V22Z"/></svg>
          </Link>
        </div>
      </nav>

      {/* Massive Page Header Warning */}
      <div className="bg-yellow-400 border-b-4 border-black py-3 px-6 text-center font-black uppercase text-sm tracking-widest flex items-center justify-center space-x-4 overflow-hidden">
        <span className="animate-pulse">⚠️</span>
        <span className="whitespace-nowrap">WARNING: ALL SALES FIINAL. NO RESTOCKS.</span>
        <span className="animate-pulse">⚠️</span>
      </div>

      <header className="py-16 md:py-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZjVmNWY0Ij48L3JlY3Q+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMiIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4xNSI+PC9jaXJjbGU+PC9zdmc+')] border-b-4 border-black">
        <div className="px-6 md:px-10 flex flex-col items-center justify-center text-center">
           <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-6 mix-blend-multiply drop-shadow-[5px_5px_0_#fff]">
              THE VAULT
           </h1>
           <p className="font-mono font-bold uppercase bg-black text-white px-4 py-2 transform rotate-1">
             {"//"} SELECT YOUR CATEGORY TO FILTER DROPS
           </p>
        </div>
      </header>

      {/* Brutalist Horizontal Filter Bar */}
      <div className="bg-stone-100 border-b-4 border-black sticky top-[76px] z-40 flex overflow-x-auto hide-scrollbar">
         <Link href="/shop" className={`flex-shrink-0 px-8 py-5 border-r-4 border-black uppercase font-black text-xs md:text-sm tracking-widest ${!activeCategoryId ? 'bg-black text-white' : 'hover:bg-stone-200'}`}>
            ALL SHIT
         </Link>
         {categories.map((cat: Category) => (
            <Link key={cat.id} href={`/shop?categoryId=${cat.id}`} className={`flex-shrink-0 px-8 py-5 border-r-4 border-black uppercase font-black text-xs md:text-sm tracking-widest ${activeCategoryId === cat.id ? 'bg-black text-white' : 'hover:bg-stone-200'}`}>
              {cat.name}
            </Link>
         ))}
      </div>

      <div className="flex-1 w-full bg-stone-100 p-6 md:p-10">
        
        <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
           <div className="font-mono font-bold text-lg uppercase bg-yellow-400 px-3 py-1 border-2 border-black inline-block transform -rotate-2">
              RESULT_COUT: {displayProducts.length}
           </div>
           
           <select className="bg-transparent font-black uppercase tracking-widest border-0 focus:ring-0 cursor-pointer">
              <option>SORT: LATEST</option>
              <option>SORT: HYPE</option>
              <option>SORT: PRICEUP</option>
           </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayProducts.length > 0 ? (
              displayProducts.map((product: Product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="group relative flex flex-col bg-white border-4 border-black p-4 hover:shadow-[12px_12px_0_0_#e11d48] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300">
              
                {product.discountPrice && product.discountPrice < product.price && (
                  <div className="absolute top-4 -right-2 z-10 bg-yellow-400 text-black font-black uppercase px-4 py-2 border-4 border-black transform rotate-6">
                     SALE
                  </div>
                )}
                
                <div className="relative aspect-[3/4] w-full bg-stone-200 border-4 border-black overflow-hidden mb-6 flex items-center justify-center p-4">
                  {product.thumbnail ? (
                    <Image src={product.thumbnail} alt={product.name} fill className="object-center object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                  ) : (
                    <div className="font-black uppercase text-4xl text-stone-300 opacity-50 transform -rotate-45">NO IMG</div>
                  )}
                  {/* Hover Overlay "BUY" */}
                  <div className="absolute inset-0 bg-rose-600/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-white font-black text-4xl uppercase tracking-tighter mb-2">COP NOW</span>
                     <span className="text-white font-mono font-bold">{"//"} CLICK TO VIEW</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-black uppercase text-black mb-1 line-clamp-2 leading-none">{product.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600">{product.category?.name || "Apparel"}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between border-t-4 border-black pt-4">
                    <div className="font-mono font-black text-3xl">
                      {product.discountPrice && product.discountPrice < product.price ? (
                        <div className="flex items-center space-x-2">
                           <span className="text-rose-600">${product.discountPrice.toFixed(0)}</span>
                           <span className="text-stone-400 line-through text-lg">${product.price.toFixed(0)}</span>
                        </div>
                      ) : (
                        <span>${product.price.toFixed(0)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              ))
          ) : (
              <div className="col-span-full py-32 text-center bg-stone-200 border-4 border-black border-dashed">
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-stone-400">SOLD OUT / WIPED</h3>
                  <button onClick={() => window.history.back()} className="mt-8 px-8 py-4 bg-black text-white font-black uppercase hover:bg-rose-600 transition-colors">GO BACK</button>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
