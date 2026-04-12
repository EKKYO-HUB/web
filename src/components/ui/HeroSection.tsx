"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const heroImages = [
  "/images/hero/ekkyo-conference.jpg",
  "/images/hero/summit-2022-euro.jpg",
  "/images/hero/summit-2023-sendai.jpg",
  "/images/hero/summit-2024-fukuoka.jpg",
];

const line1Chars = "面白そうを開拓せよ、".split("");
const line2Chars = "面白そうでは終わらせない。".split("");

export default function HeroSection() {
  const [phase, setPhase] = useState<"typing" | "reveal" | "ready">("typing");
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [current, setCurrent] = useState(0);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 800], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Phase 1: Typewriter
  useEffect(() => {
    let i = 0;
    const typeLine1 = () => {
      if (i < line1Chars.length) {
        setTypedLine1(line1Chars.slice(0, i + 1).join(""));
        i++;
        setTimeout(typeLine1, 80);
      } else {
        setTimeout(startLine2, 300);
      }
    };

    let j = 0;
    const startLine2 = () => {
      const typeLine2 = () => {
        if (j < line2Chars.length) {
          setTypedLine2(line2Chars.slice(0, j + 1).join(""));
          j++;
          setTimeout(typeLine2, 80);
        } else {
          // Pause, then reveal
          setTimeout(() => setPhase("reveal"), 800);
          setTimeout(() => setPhase("ready"), 2200);
        }
      };
      typeLine2();
    };

    setTimeout(typeLine1, 600);
  }, []);

  // Auto-slide images
  useEffect(() => {
    if (phase !== "ready") return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [phase]);

  const showBg = phase === "reveal" || phase === "ready";
  const showUI = phase === "ready";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Phase 1 & 2: Blue/dark background */}
      <motion.div
        className="absolute inset-0 bg-ekkyo-accent"
        animate={{
          opacity: showBg ? 0 : 1,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Background images — fade in during reveal */}
      <motion.div
        className="absolute inset-0"
        style={showUI ? { y: bgY } : {}}
        animate={{ opacity: showBg ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Image
              src={heroImages[current]}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* White overlay — fades in with images */}
      <motion.div
        className="absolute inset-0 bg-white/80"
        animate={{ opacity: showBg ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 text-center"
        style={showUI ? { y: textY, opacity } : {}}
      >
        {/* Org name — appears after reveal */}
        <motion.p
          className="mb-6 text-[11px] font-medium tracking-[0.4em]"
          animate={{
            opacity: showUI ? 1 : 0,
            y: showUI ? 0 : 10,
            color: showBg ? "#0071B3" : "#ffffff",
          }}
          transition={{ duration: 0.6 }}
        >
          一般社団法人 EKKYO.HUB
        </motion.p>

        {/* Main heading — typewriter then stays */}
        <h1 className="mx-auto max-w-4xl text-[1.35rem] font-bold leading-[1.3] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          <motion.span
            className="inline-block"
            animate={{
              color: showBg ? "#0a0a0a" : "#ffffff",
            }}
            transition={{ duration: 1 }}
          >
            <span className={showBg ? "text-ekkyo-accent" : "text-white"}>
              {typedLine1.slice(0, 4)}
            </span>
            {typedLine1.slice(4)}
            {typedLine1.length > 0 && typedLine1.length < line1Chars.length && (
              <motion.span
                className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            animate={{
              color: showBg ? "#0a0a0a" : "#ffffff",
            }}
            transition={{ duration: 1 }}
          >
            <span className={showBg ? "text-ekkyo-accent" : "text-white"}>
              {typedLine2.slice(0, 4)}
            </span>
            {typedLine2.slice(4)}
            {typedLine2.length > 0 && typedLine2.length < line2Chars.length && (
              <motion.span
                className="inline-block w-[2px] h-[1em] bg-current ml-0.5 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-8 max-w-lg text-sm leading-[1.8] sm:text-base"
          animate={{
            opacity: showUI ? 1 : 0,
            y: showUI ? 0 : 15,
            color: showBg ? "#6b7280" : "#ffffff80",
          }}
          transition={{ duration: 0.6, delay: showUI ? 0.2 : 0 }}
        >
          好奇心と創造性で領域を越えていくクリエイティブユニット。
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          animate={{
            opacity: showUI ? 1 : 0,
            y: showUI ? 0 : 15,
          }}
          transition={{ duration: 0.6, delay: showUI ? 0.4 : 0 }}
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
        animate={{ opacity: showUI ? 1 : 0 }}
        transition={{ delay: 0.6 }}
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
        animate={{ opacity: showUI ? 1 : 0 }}
        transition={{ delay: 0.8 }}
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
