"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const heroImages = [
  "/images/hero/ekkyo-conference.jpg",
  "/images/hero/summit-2022-euro.jpg",
  "/images/hero/summit-2023-sendai.jpg",
  "/images/hero/summit-2024-fukuoka.jpg",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 800], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background images with Ken Burns + parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {heroImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            className={cn(
              "object-cover transition-opacity duration-[2000ms]",
              i === current
                ? "animate-ken-burns opacity-100"
                : "opacity-0"
            )}
            sizes="100vw"
            priority={i === 0}
          />
        ))}
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80" />

      {/* Content with parallax + staggered animation */}
      <motion.div
        className="relative z-10 px-6 text-center"
        style={{ y: textY, opacity }}
      >
        {/* Org name */}
        <motion.p
          className="mb-6 text-[11px] font-medium tracking-[0.4em] text-ekkyo-accent"
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          一般社団法人 EKKYO.HUB
        </motion.p>

        {/* Main heading — typewriter-style staggered reveal */}
        <motion.h1
          className="mx-auto max-w-4xl text-[1.35rem] font-bold leading-[1.2] tracking-tight text-ekkyo-black sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={mounted ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-ekkyo-accent">面白そう</span>を開拓せよ、
            </motion.span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={mounted ? { y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-ekkyo-accent">面白そう</span>では終わらせない。
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-8 max-w-lg text-sm leading-[1.8] text-ekkyo-gray sm:text-base"
          initial={{ opacity: 0, y: 15 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          好奇心と創造性で領域を越えていくクリエイティブユニット。
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 bg-ekkyo-accent px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-ekkyo-accent-dark"
          >
            PORTFOLIO
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
          <Link
            href="/media"
            className="inline-flex items-center gap-2 border border-ekkyo-black/20 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-ekkyo-black transition-all hover:border-ekkyo-accent hover:text-ekkyo-accent"
          >
            MEDIA
          </Link>
        </motion.div>
      </motion.div>

      {/* Slide indicators */}
      <motion.div
        className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
      >
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === current
                ? "w-8 bg-ekkyo-accent"
                : "w-1.5 bg-ekkyo-black/20 hover:bg-ekkyo-black/40"
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-[9px] tracking-[0.3em] text-ekkyo-gray">
            SCROLL
          </p>
          <motion.div
            className="h-8 w-[1px] bg-gradient-to-b from-ekkyo-gray/40 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
