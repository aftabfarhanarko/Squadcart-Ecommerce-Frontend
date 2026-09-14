import { Suspense } from "react";
import SideBar from "./_components/Products/products_layout/SideBar";
import TopBar from "./_components/Products/products_layout/TopBar";
import ProductsBody from "./_components/Products/ProductsBody";

const Products = () => {
  return (
    <Suspense fallback={<div>Loading pagination...</div>}>
      <div className="bg-gradient-to-b from-white via-pink-50/40 to-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="pt-8 pb-6 border-b border-pink-100">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 border border-pink-100">
                  <span className="h-2 w-2 rounded-full bg-pink-500" />
                  <span className="text-[11px] font-medium text-pink-700">
                    চিত্রকর্মো · Online Collection
                  </span>
                </div>
                <h1 className="mt-3 text-2xl md:text-3xl lg:text-[32px] font-semibold text-gray-900 leading-tight">
                  Explore all products in one place
                </h1>
                <p className="mt-2 text-sm md:text-[15px] text-gray-600">
                  Discover artworks, prints and creative supplies curated for your চিত্রকর্মো
                  experience. Use filters on the left to quickly find the right item on any device.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-gray-500">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 border border-gray-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Trusted store experience
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 border border-gray-200">
                    Easy filtering by price & category
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 border border-gray-200">
                    Optimized for mobile & desktop
                  </span>
                </div>
              </div>
              <div className="w-full md:w-auto md:min-w-[220px]">
                <div className="flex justify-start md:justify-end">
                  <TopBar />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col min-[950px]:flex-row py-6 gap-6">
            <div className=" min-[950px]:block hidden w-full flex-[0_0_25%]">
              <SideBar />
            </div>
            <div className=" w-full min-[950px]:flex-[0_0_75%]">
              <ProductsBody />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Products;
