import { getFlashSaleProducts, Product } from "@/lib/api-services";
import CountDown from "./CountDown";
import FlashSaleProduct from "./FlashSaleProduct";

const FlashSale = async () => {
  let flashSaleProducts: Product[] = [];
  
  try {
    flashSaleProducts = await getFlashSaleProducts();
  } catch (error) {
    console.error("Failed to load flash sale products:", error);
  }

  if (flashSaleProducts.length === 0) {
    return null;
  }

  const avgDiscount = flashSaleProducts.length > 0
    ? Math.round(
        flashSaleProducts.reduce((sum, p) => {
          const discount = p.flashSellPrice && p.price
            ? Math.round(((p.price - p.flashSellPrice) / p.price) * 100)
            : 0;
          return sum + discount;
        }, 0) / flashSaleProducts.length
      )
    : 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-baiJamjuree">
      <div
        className="rounded-[2.5rem] overflow-hidden bg-center bg-cover bg-no-repeat relative shadow-2xl"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="bg-black/40 backdrop-blur-md p-6 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <span className="w-12 h-1 bg-primary rounded-full"></span>
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                  Flash Sale
                </h2>
              </div>
              <p className="text-white/80 text-sm md:text-lg max-w-md">
                {`Get ready for exclusive deals! Enjoy up to ${avgDiscount}% off on our top-rated products for a limited time.`}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-lg">
                <CountDown />
            </div>
          </div>
          
          <div className="relative z-10">
            <FlashSaleProduct />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
