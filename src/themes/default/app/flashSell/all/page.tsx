export const dynamic = "force-dynamic";

import ProductCard from "@/components/ui/ProductCard";
import client from "@/lib/apollo-client";
import { GET_FLASH_SALE_PRODUCTS } from "@/lib/queries";

interface Image {
  name: string;
  url: string;
}

interface Review {
  rating?: number;
}

interface Variant {
  price: number;
  size: string;
  available_quantity: number;
  stock_status: string;
}

interface ProductProps {
  title: string;
  documentId: string;
  off: number;
  SKU: string;
  reviews: Review[];
  images: Image[];
  variant: Variant[];
}

const FlashSaleListing = async () => {
  let flashSaleProducts: ProductProps[] = [];
  try {
    const { data } = await client.query({
      query: GET_FLASH_SALE_PRODUCTS,
      variables: {
        pagination: { limit: 50 },
        filters: { off: { gte: 10 } },
      },
    });
    flashSaleProducts = data?.products || [];
  } catch {
    // GraphQL server may not be available at build time
    flashSaleProducts = [];
  }


  // Calculate average discount
  const avgDiscount =
    flashSaleProducts.length > 0
      ? Math.round(
          flashSaleProducts.reduce((sum: number, p: ProductProps) => {
            return sum + p.off;
          }, 0) / flashSaleProducts.length,
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 text-white mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                ⚡ Flash Sale
              </h1>
              <p className="text-lg opacity-90">
                {avgDiscount}% পর্যন্ত ছাড়! সীমিত সময়ের অফার
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white/20 rounded-lg px-4 py-2">
                <span className="text-sm font-semibold">
                  {flashSaleProducts.length} Products on Sale
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-md px-3 py-2">
              <option>Discount %</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Showing {flashSaleProducts.length} products
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {flashSaleProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Flash Sale Products Available
          </h3>
          <p className="text-gray-500">
            Please check back later for amazing deals!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {flashSaleProducts.map((product: ProductProps) => (
            <div
              key={product.SKU}
              className="flex flex-col justify-between gap-3 cursor-pointer select-none hover:scale-105 transition-transform duration-200"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      {flashSaleProducts.length > 0 && (
        <div className="mt-12 text-center">
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Don&apos;t Miss Out!
            </h3>
            <p className="text-gray-600 mb-4">
              These flash sale deals are available for a limited time only.
            </p>
            <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200">
              Shop All Deals
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashSaleListing;
