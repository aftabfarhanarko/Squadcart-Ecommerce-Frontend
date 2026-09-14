import Image from "next/image";
import TopProductCarousel from "./TopProductCarousel";

const img_1 =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1916&auto=format&fit=crop";
const img_2 =
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1887&auto=format&fit=crop";

const TopProduct = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-baiJamjuree">
      <div className="grid gap-6 md:grid-cols-4 grid-cols-1 w-full">
        {/* Left Side Image */}
        <div className="hidden md:block rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
          <Image
            src={img_1}
            alt="Artistic frame"
            width={700}
            height={700}
            className="w-full h-full object-cover aspect-[3/4] hover:scale-110 transition-transform duration-700"
          />
        </div>
        
        {/* Central Slider */}
        <div className="md:col-span-2 rounded-[2rem] overflow-hidden shadow-2xl bg-white h-full min-h-[400px]">
          <TopProductCarousel />
        </div>
        
        {/* Right Side Image */}
        <div className="hidden md:block rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
          <Image
            src={img_2}
            alt="Interior design"
            width={700}
            height={700}
            className="w-full h-full object-cover aspect-[3/4] hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Mobile View Images (Stacked) */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
            <div className="rounded-2xl overflow-hidden shadow-md">
                <Image
                    src={img_1}
                    alt="Artistic frame"
                    width={500}
                    height={500}
                    className="aspect-square object-cover"
                />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
                <Image
                    src={img_2}
                    alt="Interior design"
                    width={500}
                    height={500}
                    className="aspect-square object-cover"
                />
            </div>
        </div>
      </div>
    </section>
  );
};

export default TopProduct;
