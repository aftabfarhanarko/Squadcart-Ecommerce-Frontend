"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";

interface ImageItem {
  name: string;
  url: string;
}
interface ImageGalleryProps {
  images: ImageItem[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <section className="flex lg:flex-row md:flex-col sm:flex-row flex-col gap-3">
      <div className="flex lg:flex-col md:flex-row sm:flex-col flex-row gap-1 md:order-last lg:order-none order-last sm:order-none">
        {images?.map((item, index) => (
          <div
            onClick={() => setCurrentImage(index)}
            key={index}
            className={cn(
              "cursor-pointer rounded-md overflow-hidden border-[2.5px] border-transparent ",
              currentImage === index && "border-primary "
            )}
          >
            <Image
              src={item?.url}
              alt="product"
              className=" object-contain aspect-[4/3] "
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
      <div className="w-full">
        <Image
          src={images[currentImage]?.url}
          alt="product"
          className="object-contain object-center md:aspect-[12/8] aspect-[15/8] w-full rounded-md"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default ImageGallery;
