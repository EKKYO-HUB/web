"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────
   オープニング演出（初回のみ・全画面オーバーレイ）:
   カラフルな風の粒子が EKKYO.HUB ロゴを形づくり → 着地で光り →
   ブランドの青ロゴに収束 → 左上ヘッダーのロゴ位置へ吸い込まれて
   通常のページ（ヘッダー＋背景写真スライドショー＋本文）に着地する。
   ・キャンバスは全画面・透明（矩形の境界や青みの溜まりを出さない）
   ・再訪問者は sessionStorage でスキップ / reduced-motion はスキップ
   ────────────────────────────────────────────────────────── */

const LOGO_SRC = "/images/logo/EKKYO.HUB_横長_blue.svg";
const LOGO_AR = 243 / 83;
const HERO_IMAGES = [
  "/images/hero/ekkyo-conference.jpg",
  "/images/hero/summit-2022-euro.jpg",
  "/images/hero/summit-2023-sendai.jpg",
  "/images/hero/summit-2024-fukuoka.jpg",
];
const VIVID = [
  "#0071B3", "#0098E0", "#00B3A6", "#16C172", "#2D6BFF",
  "#7A3FF2", "#C026A8", "#E0218A", "#EB5505", "#FF8A00",
];

function hexToRgb(h: string): [number, number, number] {
  return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
}

type Particle = {
  tx: number; ty: number; x: number; y: number;
  vx: number; vy: number; c: number[]; ph: number; delay: number;
};

export default function HeroSection() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [ready, setReady] = useState(false);
  const [logoReveal, setLogoReveal] = useState(0);
  const [logoPx, setLogoPx] = useState(0);
  const [current, setCurrent] = useState(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crispRef = useRef<HTMLImageElement>(null);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 70]);
  const bgY = useTransform(scrollY, [0, 800], [0, 120]);
  const fade = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem("hero-seen") || reduce) { setReady(true); return; }
    sessionStorage.setItem("hero-seen", "1");
    setShowOverlay(true);
  }, []);

  // 背景写真スライドショー（着地後に自動切替）
  useEffect(() => {
    if (!ready) return;
    const id = window.setInterval(() => setCurrent((p) => (p + 1) % HERO_IMAGES.length), 6000);
    return () => window.clearInterval(id);
  }, [ready]);

  // オープニング演出
  useEffect(() => {
    if (!showOverlay) return;
    const canvas = canvasRef.current, overlay = overlayRef.current;
    if (!canvas || !overlay) return;
    const ctx = canvas.getContext("2d");
    const octx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!ctx || !octx) { setReady(true); setShowOverlay(false); return; }
    const oc = octx.canvas;

    const VR = VIVID.map(hexToRgb);
    const BLUE = [0, 113, 179];
    const GLOW_C = [175, 218, 255];
    const img = new window.Image();
    const timers: number[] = [];

    let W = 0, H = 0, DPR = 1, logoW = 0, logoH = 0, lx = 0, ly = 0;
    let particles: Particle[] = [];
    let t = 0, raf = 0, tFlash = -1, running = true, finished = false;
    const MAX = 6500;
    const unlock = () => { document.body.style.overflow = ""; };

    const size = () => {
      const r = overlay.getBoundingClientRect();
      W = Math.round(r.width); H = Math.round(r.height);
      DPR = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      oc.width = W; oc.height = H;
      logoW = Math.min(560, W * 0.8, H * 0.5 * LOGO_AR);
      logoH = logoW / LOGO_AR;
      lx = (W - logoW) / 2; ly = (H - logoH) / 2;
      setLogoPx(logoW);
    };
    const colorFor = (nx: number, ny: number) => {
      let i = Math.floor((nx * 4 + ny * 1.6 + 0.8 * Math.sin(nx * 11 + ny * 6)) * VR.length);
      i = ((i % VR.length) + VR.length) % VR.length;
      return VR[i].slice();
    };
    const buildPoints = () => {
      octx.clearRect(0, 0, W, H);
      octx.drawImage(img, lx, ly, logoW, logoH);
      const d = octx.getImageData(0, 0, W, H).data;
      const pts: number[][] = [];
      const step = Math.max(2, Math.round(logoW / 260));
      for (let y = Math.floor(ly); y < ly + logoH; y += step)
        for (let x = Math.floor(lx); x < lx + logoW; x += step)
          if (d[(y * W + x) * 4 + 3] > 110) pts.push([x, y]);
      return pts;
    };
    const ease = (p: number) => p * p * (3 - 2 * p);

    const dockAndReveal = () => {
      const crisp = crispRef.current;
      const headerImg = document.querySelector("header a img") as HTMLElement | null;
      if (crisp && headerImg) {
        const s = crisp.getBoundingClientRect();
        const d = headerImg.getBoundingClientRect();
        const scale = d.width / s.width;
        const dx = (d.left + d.width / 2) - (s.left + s.width / 2);
        const dy = (d.top + d.height / 2) - (s.top + s.height / 2);
        crisp.style.transformOrigin = "center";
        crisp.style.transition = "transform .85s cubic-bezier(.7,0,.2,1)";
        crisp.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      }
      const hasDock = !!(crisp && document.querySelector("header a img"));
      timers.push(window.setTimeout(() => {
        setReady(true);
        if (overlay) { overlay.style.transition = "opacity .5s ease"; overlay.style.opacity = "0"; }
        unlock();
      }, hasDock ? 770 : 0));
      timers.push(window.setTimeout(() => setShowOverlay(false), hasDock ? 1330 : 450));
    };

    const toCrispThenDock = () => {
      if (finished) return;
      finished = true; running = false; cancelAnimationFrame(raf);
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / 420);
        setLogoReveal(k);
        canvas.style.opacity = String(1 - k);
        if (k < 1) requestAnimationFrame(step); else dockAndReveal();
      };
      requestAnimationFrame(step);
    };

    const loop = () => {
      if (!running) return;
      t++;
      const settleFrames = 200, KMAX = 0.06, damp = 0.9;
      ctx.clearRect(0, 0, W, H); // 透明: 背景に色を溜めない（青みなし・矩形なし）

      const fa = tFlash >= 0 ? t - tFlash : -1;
      const glow = fa >= 0 ? Math.max(0, Math.sin(Math.min(1, fa / 18) * Math.PI)) : 0;
      const blueP = tFlash >= 0 ? Math.min(1, Math.max(0, (fa - 4) / 40)) : 0;

      let settled = 0;
      for (let i = 0; i < particles.length; i++) {
        const q = particles[i];
        const e = ease(Math.min(1, Math.max(0, (t - q.delay) / settleFrames)));
        const k = 0.004 + e * KMAX, wind = 1 - e;
        q.vx = (q.vx + (q.tx - q.x) * k + (Math.sin(q.y * 0.011 + t * 0.02) * 0.7 * wind + 0.9 * wind)) * damp;
        q.vy = (q.vy + (q.ty - q.y) * k + Math.cos(q.x * 0.011 - t * 0.018) * 0.7 * wind) * damp;
        q.x += q.vx; q.y += q.vy;
        const dx = q.tx - q.x, dy = q.ty - q.y, near = dx * dx + dy * dy < 3.5;
        if (near) { settled++; q.ph += 0.045; q.x = q.tx + Math.sin(q.ph) * 0.5; q.y = q.ty + Math.cos(q.ph * 0.9) * 0.5; }
        let col = q.c;
        if (blueP > 0) col = [col[0] + (BLUE[0] - col[0]) * blueP, col[1] + (BLUE[1] - col[1]) * blueP, col[2] + (BLUE[2] - col[2]) * blueP];
        if (glow > 0) col = [col[0] + (GLOW_C[0] - col[0]) * glow * 0.85, col[1] + (GLOW_C[1] - col[1]) * glow * 0.85, col[2] + (GLOW_C[2] - col[2]) * glow * 0.85];
        const cs = "rgb(" + (col[0] | 0) + "," + (col[1] | 0) + "," + (col[2] | 0) + ")";
        const rr = (near ? 1.5 : 2.0) + glow * 2.6;
        // 動いている間だけ短い流線（風）: 背景に溜まらないので青みは出ない
        const sp = q.vx * q.vx + q.vy * q.vy;
        if (!near && sp > 1.4) {
          ctx.strokeStyle = cs; ctx.globalAlpha = 0.32; ctx.lineWidth = rr * 0.9;
          ctx.beginPath(); ctx.moveTo(q.x - q.vx * 2.6, q.y - q.vy * 2.6); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
        ctx.fillStyle = cs; ctx.globalAlpha = 0.95;
        ctx.beginPath(); ctx.arc(q.x, q.y, rr, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (tFlash < 0 && settled > particles.length * 0.985 && t > settleFrames * 0.7) tFlash = t;
      if (fa >= 0 && fa < 30) {
        const a = Math.max(0, 1 - fa / 30);
        ctx.strokeStyle = "rgba(0,150,220," + a * 0.5 + ")";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(W / 2, H / 2, logoW * 0.5 * (0.7 + fa * 0.05), 0, 6.283); ctx.stroke();
      }
      if (fa > 70) { toCrispThenDock(); return; }
      raf = requestAnimationFrame(loop);
    };

    const begin = () => {
      size();
      let pts = buildPoints();
      if (pts.length === 0) { setReady(true); setShowOverlay(false); unlock(); return; }
      if (pts.length > MAX) {
        const s = pts.length / MAX, o: number[][] = [];
        for (let i = 0; i < pts.length; i += s) o.push(pts[i | 0]);
        pts = o;
      }
      particles = pts.map((p) => ({
        tx: p[0], ty: p[1], x: -Math.random() * W * 0.5 - 40, y: p[1] + (Math.random() - 0.5) * H * 0.7,
        vx: 0.4 + Math.random() * 1.0, vy: 0, c: colorFor((p[0] - lx) / logoW, (p[1] - ly) / logoH),
        ph: Math.random() * 6.283, delay: Math.random() * 70,
      }));
      t = 0; tFlash = -1;
      document.body.style.overflow = "hidden";
      raf = requestAnimationFrame(loop);
    };

    img.onload = begin;
    img.onerror = () => { setReady(true); setShowOverlay(false); unlock(); };
    img.src = LOGO_SRC;
    timers.push(window.setTimeout(toCrispThenDock, 6000)); // セーフティ

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      timers.forEach((x) => window.clearTimeout(x));
      unlock();
    };
  }, [showOverlay]);

  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6">
        {/* 背景写真スライドショー（自動切替＋Ken Burns） */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          {HERO_IMAGES.map((src, i) => (
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
                priority={i === 0}
                sizes="100vw"
                className="object-cover transition-transform duration-[6000ms] ease-out"
                style={{ transform: i === current && ready ? "scale(1.06)" : "scale(1)" }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-white/80" />
        </motion.div>

        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 14 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="mx-auto max-w-4xl text-[1.5rem] font-bold leading-[1.3] tracking-tight text-ekkyo-black sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-ekkyo-accent">面白そう</span>を開拓せよ、
              <br />
              <span className="text-ekkyo-accent">面白そう</span>では終わらせない。
            </h1>
            <p className="mx-auto mt-8 max-w-lg text-sm leading-[1.8] text-ekkyo-gray sm:text-base">
              好奇心と創造性で領域を越えていくクリエイティブユニット。
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 bg-ekkyo-accent px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-ekkyo-accent-dark"
              >
                PORTFOLIO
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/media"
                className="inline-flex items-center gap-2 border border-ekkyo-black/20 bg-white/50 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-ekkyo-black backdrop-blur-sm transition-all hover:border-ekkyo-accent hover:text-ekkyo-accent"
              >
                MEDIA
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* スライドインジケータ */}
        <motion.div
          className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === current ? "w-8 bg-ekkyo-accent" : "w-1.5 bg-ekkyo-black/20 hover:bg-ekkyo-black/40"
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-[9px] tracking-[0.3em] text-ekkyo-gray">SCROLL</p>
            <motion.div
              className="h-8 w-px bg-gradient-to-b from-ekkyo-gray/40 to-transparent"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>
        </motion.div>
      </section>

      {showOverlay && (
        <div ref={overlayRef} className="fixed inset-0 z-[100] bg-white">
          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={crispRef}
              src={LOGO_SRC}
              alt=""
              className="h-auto"
              style={{ width: logoPx ? `${logoPx}px` : "min(560px,80vw)", opacity: logoReveal }}
            />
          </div>
        </div>
      )}
    </>
  );
}
