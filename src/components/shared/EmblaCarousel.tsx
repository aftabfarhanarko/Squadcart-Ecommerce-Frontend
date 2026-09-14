"use client";

import { cn } from "../../utils/cn";
import { EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback } from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButtons";

type PropType = {
  children?: React.ReactNode;
  autoplay?: boolean; // Autoplay functionality
  dragFree?: boolean; // Drag-free functionality
  arrowButtons?: boolean; // Show arrow buttons
  dotButtons?: boolean; // Show dot buttons
};

const EmblaCarousel: React.FC<PropType> = ({
  children,
  autoplay = false,
  dragFree = false,
  arrowButtons = false,
  dotButtons = false,
}) => {
  // Initialize EmblaCarousel with options
  const plugins = autoplay ? [Autoplay()] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { dragFree, slidesToScroll: "auto" }, // Automatically adjust slidesToScroll
    plugins
  );

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    const resetOrStop =
      autoplayPlugin.options.stopOnInteraction === false
        ? autoplayPlugin.reset
        : autoplayPlugin.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="w-full m-auto relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className="flex gap-4 touch-pan-y touch-pinch-zoom"
          style={{
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            MozBackfaceVisibility: "hidden",
          }}
        >
          {children}
        </div>
      </div>

      {/* Render arrow buttons if arrowButtons prop is true */}
      {arrowButtons && (
        <>
          <div className="flex items-center justify-center absolute top-0 bottom-0 sm:-left-4 left-2">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          </div>
          <div className="flex items-center justify-center absolute top-0 bottom-0 sm:-right-4 right-2">
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </>
      )}

      {/* Render dot buttons if dotButtons prop is true */}
      {dotButtons && (
        <div className=" absolute bottom-4 left-1/2 right-1/2">
          <div className="flex  justify-center items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  "touch-manipulation cursor-pointer rounded-full sm:p-[2.5px] p-0.5 flex items-center justify-center",
                  index === selectedIndex ? "border-2 border-white" : ""
                )}
              >
                <div className="sm:w-[10px] w-2 sm:h-[10px] h-2 bg-white rounded-full"></div>
              </DotButton>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;
