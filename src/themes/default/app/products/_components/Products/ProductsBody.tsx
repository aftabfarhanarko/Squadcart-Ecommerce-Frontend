"use client";

import ProductCard from "@/components/ui/ProductCard";
import PaginationProducts from "./PaginationProducts";
import { getProducts, Product } from "@/lib/api-services";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ImageProps {
  name: string;
  url: string;
}
interface ReviewProps {
  rating: number;
}
interface VariantProps {
  price: number;
  size: string;
  available_quantity: number;
  stock_status: string;
}
interface ProductProps {
  SKU: string;
  documentId: string;
  off: number;
  title: string;
  images: ImageProps[];
  reviews: ReviewProps[];
  variant: VariantProps[];
  categoryName?: string;
}

// Helper function to map REST API product to component format
function mapProductToCardFormat(apiProduct: Product): ProductProps {
  const off = apiProduct.discountPrice && apiProduct.price
    ? Math.round(((apiProduct.price - apiProduct.discountPrice) / apiProduct.price) * 100)
    : 0;

  const images: ImageProps[] = apiProduct.images?.map((img, index) => ({
    name: img.alt || `Image ${index + 1}`,
    url: img.url,
  })) || [];

  const variant: VariantProps[] = [{
    price: Number(apiProduct.price),
    size: "Default",
    available_quantity: 100, // Default value - would need to come from inventory if available
    stock_status: apiProduct.isActive ? "in_stock" : "out_of_stock",
  }];

  return {
    SKU: apiProduct.sku,
    documentId: apiProduct.id.toString(),
    off,
    title: apiProduct.name,
    images,
    reviews: [],
    variant,
    categoryName: apiProduct.category?.name,
  };
}

const ProductsBody = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categories");
  const searchTerm = searchParams.get("search");
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // সব প্রোডাক্ট backend থেকে আনব
        const apiProducts: Product[] = await getProducts();
        const mappedProducts = apiProducts.map(mapProductToCardFormat);

        const normalizedSearch = searchTerm
          ? searchTerm.toLowerCase()
          : "";

        const finalProducts = mappedProducts.filter((p) => {
          const matchesCategory = categoryName
            ? p.categoryName && p.categoryName === categoryName
            : true;

          const matchesSearch = normalizedSearch
            ? p.title.toLowerCase().includes(normalizedSearch) ||
              p.SKU.toLowerCase().includes(normalizedSearch)
            : true;

          return matchesCategory && matchesSearch;
        });

        setProducts(finalProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName, searchTerm]);

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center py-16">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 border border-pink-100">
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-[11px] font-medium text-pink-700">
              Loading curated products for you
            </span>
          </div>
          <div className="space-y-2 animate-pulse">
            <div className="mx-auto h-3 w-40 rounded-full bg-gray-200" />
            <div className="mx-auto h-3 w-64 rounded-full bg-gray-100" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex justify-center items-center py-16">
        <div className="max-w-md w-full text-center space-y-3 rounded-2xl border border-red-100 bg-red-50/60 px-6 py-6">
          <p className="text-sm font-semibold text-red-700">Something went wrong</p>
          <p className="text-sm text-red-600 break-words">
            {error}
          </p>
          <p className="text-xs text-red-500">
            Please refresh the page. If the problem continues, try again later.
          </p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full flex justify-center items-center py-20">
        <div className="max-w-lg w-full text-center space-y-4 rounded-2xl border border-dashed border-gray-200 bg-white/70 px-6 py-8">
          <p className="text-sm font-semibold text-gray-900">
            No products match your filters
          </p>
          <p className="text-sm text-gray-500">
            Try removing some filters or adjusting price and category options to see more items
            from the চিত্রকর্মো collection.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 sm:gap-5 lg:gap-6">
        {products.map((product) => (
          <div key={product.SKU || product.documentId} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <PaginationProducts total={products.length} />
      </div>
    </section>
  );
};

export default ProductsBody;
