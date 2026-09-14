import EmblaCarousel from "@/components/shared/EmblaCarousel";
import { Banner, getBanners } from "@/lib/api-services";
import { MOCK_BANNERS } from "@/lib/mockData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroCarousel: React.FC = async () => {
  let banners: Banner[] = [];

  try {
    banners = await getBanners('COMP-000001');
  } catch (error) {
    console.error("Failed to load banners:", error);
  }

  // Fallback to mock data if no banners are returned or ACTIVE
  let activeBanners = banners.filter((banner: Banner) => banner.isActive);
  
  if (activeBanners.length === 0) {
    console.warn("No active banners found from API, falling back to MOCK_BANNERS");
    activeBanners = MOCK_BANNERS.filter((banner) => banner.isActive);
  }

  if (activeBanners.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-[2rem] mx-4 my-6">
        <p className="text-gray-400">No banners available</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div className="rounded-[2rem] overflow-hidden shadow-2xl relative group font-baiJamjuree">
        <EmblaCarousel dotButtons autoplay>
          {activeBanners?.map((banner: Banner) => (
            <div
              key={banner.id}
              className="[flex:0_0_100%] w-full relative"
            >
              <div className="relative w-full aspect-[21/9] min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title || "Banner Image"}
                  fill
                  priority
                  className="object-cover"
                />
                
                {/* Modern Glassmorphic Overlay - Only show if title exists */}
                {banner.title && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center px-8 md:px-16 lg:px-24">
                    <div className="max-w-xl animate__animated animate__fadeInUp">
                      {banner.subtitle && (
                        <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md text-primary font-bold text-xs md:text-sm rounded-full mb-4 border border-primary/30 tracking-wider uppercase">
                          {banner.subtitle}
                        </span>
                      )}
                      <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] drop-shadow-lg">
                        {banner.title}
                      </h2>
                      
                      {banner.buttonText && banner.buttonLink && (
                        <Link
                          href={banner.buttonLink}
                          className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-bold rounded-full hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-xl text-sm md:text-base group"
                        >
                          {banner.buttonText}
                          <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </EmblaCarousel>
      </div>
    </section>
  );
};

export default HeroCarousel;
