"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* スクロールするほど画面が「まみれていく」オーバーレイ。
   - 粒子（細かいノイズ）／泥の染み／縁の汚れ の3層。進行度 --mamire-dirt(0→1) で濃くなる
   - body 直下へポータル（PageTransition の transform 配下では fixed が効かないため）
   - 進行度は要素の style に直接書く（React の再レンダーを起こさない）
   - 見た目の定義は globals.css の .mamire-dirt* */
export default function MamireDirt() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const start = vh * 0.6; // ヒーローを抜けたあたりから汚れ始める
      const end = document.documentElement.scrollHeight - vh; // 最下部で最大
      const raw = (y - start) / Math.max(1, end - start);
      const p = Math.min(1, Math.max(0, raw));
      const eased = Math.pow(p, 1.6); // 序盤は静かに、後半で一気に
      el.style.setProperty("--mamire-dirt", eased.toFixed(3));
      el.style.setProperty("--mamire-y", `${Math.round(y)}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={ref}
      aria-hidden
      className="mamire-dirt pointer-events-none fixed inset-0 z-30"
    >
      <div className="mamire-dirt__grain" />
      <div className="mamire-dirt__mud" />
      <div className="mamire-dirt__edge" />
    </div>,
    document.body
  );
}
