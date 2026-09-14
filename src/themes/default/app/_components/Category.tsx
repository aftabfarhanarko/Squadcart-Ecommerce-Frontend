import { getCategories } from "@/lib/api-services";
import type { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import EmblaCarousel from "@/components/shared/EmblaCarousel";

const Category = async () => {
  let categories: Category[] = [];
  try {
    categories = await getCategories('COMP-000001');
  } catch (error) {
    console.error("Failed to load categories:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-baiJamjuree">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 border-l-4 border-primary pl-4">
          Shop by Category
        </h2>
        <Link href="/products" className="text-primary font-bold text-sm hover:underline">
          View All
        </Link>
      </div>
      
      <div className="relative group">
        <EmblaCarousel dragFree arrowButtons>
          {categories.map((category: Category) => (
            <Link
              href={`/products?categories=${category.name}`}
              key={category.slug}
              className="[flex:0_0_25%] sm:[flex:0_0_15%] md:[flex:0_0_12%] flex flex-col items-center gap-3 group/item transition-all duration-300"
            >
              <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white shadow-md group-hover/item:shadow-xl group-hover/item:scale-105 transition-all duration-300 border-2 border-transparent group-hover/item:border-primary/20">
                {category.image ? (
                  <Image
                    src={category.image.url}
                    alt={category.image.alt || category.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-700 group-hover/item:text-primary transition-colors text-center">
                {category.name}
              </h3>
            </Link>
          ))}
        </EmblaCarousel>
      </div>
    </section>
  );
};

export default Category;
