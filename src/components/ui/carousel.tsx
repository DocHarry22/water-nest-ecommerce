"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export function Carousel({ children, autoPlay = true, interval = 5000, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, children.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="min-w-full">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex ? "bg-blue-600 w-8" : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
