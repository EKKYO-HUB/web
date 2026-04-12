"use client";

import { useState, useEffect, useRef } from "react";
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

const line1Full = "面白そうを開拓せよ、";
const line2Full = "面白そうでは終わらせない。";
const line1Chars = line1Full.split("");
const line2Chars = line2Full.split("");

export default function HeroSection() {
  // Skip intro if returning visitor (sessionStorage flag)
  const skipIntro = useRef(false);
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("hero-seen")) {
      skipIntro.current = true;
    }
  }, []);

  const [phase, setPhase] = useState<"typing" | "reveal" | "ready">("typing");
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [current, setCurrent] = useState(0);
  // Track reveal progress 0→1 for smooth color transition
  const [revealProgress, setRevealProgress] = useState(0);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const textY = useTransform(scrollY, [0, 800], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Phase 1: Typewriter (or skip if returning)
  useEffect(() => {
    if (skipIntro.current) {
      setTypedLine1(line1Full);
      setTypedLine2(line2Full);
      setRevealProgress(1);
      setPhase("ready");
      return;
    }
    sessionStorage.setItem("hero-seen", "1");

    let i = 0;
    const typeLine1 = () => {
      if (i < line1Chars.length) {
        setTypedLine1(line1Chars.slice(0, i + 1).join(""));
        i++;
        setTimeout(typeLine1, 100);
      } else {
        setTimeout(startLine2, 400);
      }
    };

    let j = 0;
    const startLine2 = () => {
      const typeLine2 = () => {
        if (j < line2Chars.length) {
          setTypedLine2(line2Chars.slice(0, j + 1).join(""));
          j++;
          setTimeout(typeLine2, 100);
        } else {
          // Pause, then start reveal
          setTimeout(() => {
            setPhase("reveal");
            // Animate revealProgress from 0 to 1 over 1.8s
            const start = Date.now();
            const duration = 1800;
            const tick = () => {
              const elapsed = Date.now() - start;
              const p = Math.min(elapsed / duration, 1);
              // easeInOut
              const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
              setRevealProgress(eased);
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, 1000);
          setTimeout(() => setPhase("ready"), 3500);
        }
      };
      typeLine2();
    };

    setTimeout(typeLine1, 600);
  }, []);

  // Auto-slide images with Ken Burns
  useEffect(() => {
    if (phase !== "ready") return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [phase]);

  const showBg = phase === "reveal" || phase === "ready";
  const showUI = phase === "ready";

  // Interpolate colors based on revealProgress
  const textColor = `rgb(${Math.round(255 - revealProgress * 245)}, ${Math.round(255 - revealProgress * 245)}, ${Math.round(255 - revealProgress * 245)})`;
  const accentOrWhite = revealProgress > 0.5 ? "#0071B3" : "#ffffff";

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Blue background — starts fully visible, covers hero images initially */}
      <div
        className="absolute inset-0 z-[2] bg-ekkyo-accent transition-none"
        style={{ opacity: 1 - revealProgress }}
      />

      {/* Background images — always rendered but hidden behind blue */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={showUI ? { y: bgY } : {}}
      >
        {heroImages.map((src, i) => (
          <div
            key={src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[2000ms]",
              i === current ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-[6000ms] ease-out"
              style={{
                transform: i === current && phase === "ready" ? "scale(1.06)" : "scale(1)",
              }}
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </motion.div>

      {/* White overlay — fades in as blue fades out */}
      <div
        className="absolute inset-0 z-[3] bg-white/80 transition-none"
        style={{ opacity: revealProgress }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 text-center"
        style={showUI ? { y: textY, opacity } : {}}
      >
        {/* Org name — appears after reveal */}
        <motion.p
          className="mb-6 text-[11px] font-medium tracking-[0.4em]"
          style={{ color: accentOrWhite }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showUI ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          一般社団法人 EKKYO.HUB
        </motion.p>

        {/* Main heading — typewriter then stays */}
        <h1 className="mx-auto max-w-4xl text-[1.35rem] font-bold leading-[1.3] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="inline-block" style={{ color: textColor }}>
            <span style={{ color: accentOrWhite }}>
              {typedLine1.slice(0, 4)}
            </span>
            {typedLine1.slice(4)}
            {typedLine1.length > 0 && typedLine1.length < line1Chars.length && (
              <motion.span
                className="ml-0.5 inline-block h-[1em] w-[2px] align-middle bg-current"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </span>
          <br />
          <span className="inline-block" style={{ color: textColor }}>
            <span style={{ color: accentOrWhite }}>
              {typedLine2.slice(0, 4)}
            </span>
            {typedLine2.slice(4)}
            {typedLine2.length > 0 && typedLine2.length < line2Chars.length && (
              <motion.span
                className="ml-0.5 inline-block h-[1em] w-[2px] align-middle bg-current"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-8 max-w-lg text-sm leading-[1.8] text-ekkyo-gray sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: showUI ? 1 : 0 }}
          transition={{ duration: 0.8, delay: showUI ? 0.3 : 0 }}
        >
          好奇心と創造性で領域を越えていくクリエイティブユニット。
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: showUI ? 1 : 0 }}
          transition={{ duration: 0.8, delay: showUI ? 0.5 : 0 }}
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
        className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2"
        initial={{ opacity: 0 }}
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
        initial={{ opacity: 0 }}
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
