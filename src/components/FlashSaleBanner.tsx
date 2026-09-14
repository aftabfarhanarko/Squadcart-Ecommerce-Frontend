import Link from "next/link";
import { IoFlash } from "react-icons/io5";

const FlashSaleBanner = () => {
  return (
    <Link href="/flashSell" className="block">
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white py-3 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-center gap-3">
          <IoFlash className="text-2xl animate-pulse" />
          <div className="text-center">
            <h3 className="font-bold text-lg md:text-xl uppercase tracking-tighter">
              ⚡ Flash Sale is Live! ⚡
            </h3>
            <p className="text-sm md:text-base font-medium opacity-90">
              Enjoy up to 50% OFF for a limited time!
            </p>
          </div>
          <IoFlash className="text-2xl animate-pulse" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="animate-pulse absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full"></div>
        </div>
      </div>
    </Link>
  );
};

export default FlashSaleBanner;