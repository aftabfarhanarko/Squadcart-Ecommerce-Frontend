import { getProducts, Product } from "@/lib/api-services";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";

const ForYou = async () => {
  let products: Product[] = [];

  try {
    products = await getProducts();
    // Limit to 10 products
    products = products.slice(0, 10);
  } catch (error) {
    console.error("Failed to load products:", error);
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-baiJamjuree">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4 uppercase tracking-tight">
          Recommended For You
        </h2>
        <Link
          href={"/products"}
          className="text-primary font-bold text-sm hover:underline"
        >
          See All Products
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div key={product.id || product.sku}>
            <ProductCard product={{
              id: product.id,
              name: product.name,
              title: product.name,
              documentId: product.id?.toString(),
              sku: product.sku,
              price: product.price,
              discountPrice: product.discountPrice,
              thumbnail: product.thumbnail,
              images: product.images?.map(img => ({ name: img.alt || 'Product image', url: img.url })) || [],
              reviews: [],
            }} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-12">
        <Link
           href="/products"
           className="px-12 py-4 bg-primary hover:bg-opacity-90 text-white font-bold rounded-full shadow-lg shadow-primary/20 transition-all transform hover:scale-105 active:scale-95"
        >
          EXPLORE MORE
        </Link>
      </div>
    </section>
  );
};

export default ForYou;
