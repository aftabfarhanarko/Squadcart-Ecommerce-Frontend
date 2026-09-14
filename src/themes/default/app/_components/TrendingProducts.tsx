import { getTrendingProducts, Product } from "@/lib/api-services";
import EmblaCarousel from "@/components/shared/EmblaCarousel";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

const TrendingProducts = async () => {
  let products: Product[] = [];

  try {
    products = await getTrendingProducts(30, 10, 'COMP-000001');
  } catch (error) {
    console.error("Failed to load trending products:", error);
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-baiJamjuree">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
          Trending Products
        </h2>
        <Link href="/products?sort=trending" className="text-primary font-bold text-sm hover:underline">
          Shop All
        </Link>
      </div>

      <div className="relative group">
        <EmblaCarousel dragFree arrowButtons>
          {products.map((product) => (
            <div
              key={product.id || product.sku}
              className="[flex:0_0_70%] sm:[flex:0_0_45%] md:[flex:0_0_30%] lg:[flex:0_0_22%] px-2 py-4"
            >
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
        </EmblaCarousel>
      </div>
    </section>
  );
};

export default TrendingProducts;
