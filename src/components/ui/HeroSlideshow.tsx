"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function HeroSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          className={cn(
            "object-cover transition-opacity duration-1000",
            i === current ? "opacity-100" : "opacity-0"
          )}
          sizes="100vw"
          priority={i === 0}
        />
      ))}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
