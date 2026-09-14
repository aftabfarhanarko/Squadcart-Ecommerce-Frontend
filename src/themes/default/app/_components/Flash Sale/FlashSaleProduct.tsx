import EmblaCarousel from "@/components/shared/EmblaCarousel";
import ProductCard from "@/components/ui/ProductCard";
import client from "@/lib/apollo-client";
import { GET_FLASH_SALE_PRODUCTS } from "@/lib/queries";

interface Image {
  name: string;
  url: string;
}

interface Review {
  rating?: number; // Optional because the reviews array may be empty
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
  reviews: Review[]; // Array of reviews
  images: Image[]; // Array of images
  variant: Variant[]; // Array of price variants
}
const FlashSaleProduct = async () => {
  let products: ProductProps[] = [];
  try {
    const { data } = await client.query({
      query: GET_FLASH_SALE_PRODUCTS,
      variables: {
        pagination: { limit: 10 },
        filters: { off: { gte: 10 } },
      },
    });
    products = data?.products || [];
  } catch {
    // GraphQL server may not be available at build time
    products = [];
  }
  return (
    <div>
      <div>
        <EmblaCarousel dragFree arrowButtons>
          {products.map((product: ProductProps) => (
            <div
              key={product.SKU}
              className="[flex:0_0_65%] min-[400px]:[flex:0_0_50%]  min-[500px]:[flex:0_0_45%] sm:[flex:0_0_35%] md:[flex:0_0_30%] min-[880px]:[flex:0_0_27%] lg:[flex:0_0_19%] flex flex-col justify-between gap-3 py-3 cursor-pointer select-none"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </EmblaCarousel>
      </div>
    </div>
  );
};

export default FlashSaleProduct;
