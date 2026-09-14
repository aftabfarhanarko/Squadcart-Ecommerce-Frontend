import Category from "./_components/Category";
import ForYou from "./_components/ForYou";
import HeroCarousel from "./_components/HeroCarousel";
import FeatureSection from "@/components/FeatureSection";
import { Suspense } from "react";
import FlashSale from "./_components/Flash Sale/FlashSale";
import TopProduct from "./_components/Top Products/TopProduct";
import TrendingProducts from "./_components/TrendingProducts";

export default function Home() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="min-h-screen">
        <HeroCarousel />
        <Category />
        <TrendingProducts />
        <TopProduct />
        <ForYou />
        <FeatureSection />
      </div>
    </Suspense>
  );
}

