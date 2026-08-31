"use client";

/* ─────────────────────────────────────────────────────
   「耕せ」アーカイブ ── 畑（トップページ）

   一面の乾いた土。ドラッグ（＝鍬を引く）で土が耕され、
   埋まっている18の区画（ワークショップ）が芽吹く。
   芽をクリックすると、その区画を掘りさげる（詳細へ）。

   ・耕した状態は sessionStorage に保存（戻っても芽は残る）
   ・「一覧」からは耕さずに直接訪ねることもできる
   ───────────────────────────────────────────────── */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  WORKSHOPS,
  MANIFESTO,
  CREDITS,
  DAY_LABELS,
  SUMMIT_META,
  type Workshop,
} from "@/content/summit2025";

const STORAGE_KEY = "tagayase-sprouted-v1";

/* 決定的なゆらぎ（リロードしても同じ畑になる） */
function jitter(seed: number, scale: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return (x - Math.floor(x) - 0.5) * 2 * scale;
}

type SeedPos = { w: Workshop; x: number; y: number };

/* 画面上の種の配置（割合）。デスクトップは3つの畝、モバイルは1日ずつ */
function layoutSeeds(isMobile: boolean, activeDay: 1 | 2 | 3): SeedPos[] {
  if (!isMobile) {
    const bandY: Record<1 | 2 | 3, number> = { 1: 0.24, 2: 0.5, 3: 0.76 };
    return WORKSHOPS.map((w) => {
      const dayWs = WORKSHOPS.filter((d) => d.day === w.day);
      const i = dayWs.indexOf(w);
      const n = dayWs.length;
      const x0 = 0.14 + (0.78 * (i + 0.5)) / n;
      return {
        w,
        x: x0 + jitter(w.no, 0.018),
        y: bandY[w.day] + jitter(w.no * 7, 0.02),
      };
    });
  }
  const dayWs = WORKSHOPS.filter((d) => d.day === activeDay);
  const n = dayWs.length;
  /* 日によって区画数が違う（6/10/4）。多い日は3列のレンガ状に組んで
     同じ列の芽同士が縦書き名札（最大170px）と重ならないようにする */
  const cols = n > 8 ? 3 : 2;
  const colX = cols === 3 ? [0.2, 0.5, 0.8] : [0.3, 0.7];
  const rows = Math.ceil(n / cols);
  return dayWs.map((w, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const y = 0.1 + (0.8 * row) / Math.max(rows - 1, 1);
    const x = colX[col] + jitter(w.no * 3, 0.04);
    return { w, x, y: y + jitter(w.no * 7, 0.015) };
  });
}

/* 土の色 */
const SOIL = {
  crust: "#4A3A26",
  crustGrains: ["#57452C", "#3F3120", "#52402A", "#443422", "#5C4A30"],
  tilled: ["#241711", "#2B1C12", "#1D120C", "#2E1E13"],
  clodEdge: "#6A5433",
  straw: "#8A7449",
  mound: "#5F4B2F",
};

const KANJI = "一二三四五六七八九十".split("");
function kanjiNo(n: number): string {
  if (n <= 10) return KANJI[n - 1];
  if (n < 20) return "十" + KANJI[n - 11];
  return "二十" + (n > 20 ? KANJI[n - 21] : "");
}

export default function Field() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const [sprouted, setSprouted] = useState<Set<string>>(new Set());
  /* 復元された芽は生育アニメーションを飛ばす */
  const restoredRef = useRef<Set<string>>(new Set());
  const [introDone, setIntroDone] = useState(false);
  const [overlay, setOverlay] = useState<null | "manifesto" | "index">(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [digging, setDigging] = useState<Workshop | null>(null);
  const [mounted, setMounted] = useState(false);

  const seeds = useMemo(
    () => layoutSeeds(isMobile, activeDay),
    [isMobile, activeDay]
  );
  const seedsRef = useRef(seeds);
  seedsRef.current = seeds;
  const sproutedRef = useRef(sprouted);
  sproutedRef.current = sprouted;
  /* 各区画の耕し量（slug → 打点数） */
  const progressRef = useRef<Map<string, number>>(new Map());

  /* ── 初期化：保存された芽の復元・端末判定 ── */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const slugs: string[] = JSON.parse(raw);
        restoredRef.current = new Set(slugs);
        setSprouted(new Set(slugs));
        if (slugs.length > 0) setIntroDone(true);
      }
    } catch {
      /* プライベートモード等では耕し直しになるだけ */
    }
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    setMounted(true);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  const persist = useCallback((next: Set<string>) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
    } catch {
      /* noop */
    }
  }, []);

  /* ── 土台の描画 ── */
  const paintBase = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const w = container.clientWidth;
    const h = container.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* 乾いた表土 */
    ctx.fillStyle = SOIL.crust;
    ctx.fillRect(0, 0, w, h);

    /* 大きな色むら（湿り・乾きのまだら） */
    const patches = Math.floor((w * h) / 26000) + 14;
    for (let i = 0; i < patches; i++) {
      const px = Math.random() * w;
      const py = Math.random() * h;
      const pr = 60 + Math.random() * 190;
      const dark = Math.random() < 0.55;
      const g = ctx.createRadialGradient(px, py, pr * 0.1, px, py, pr);
      const c = dark
        ? `rgba(30,20,12,${0.08 + Math.random() * 0.1})`
        : `rgba(122,99,64,${0.05 + Math.random() * 0.08})`;
      g.addColorStop(0, c);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }

    /* 砂粒 */
    const grains = Math.floor((w * h) / 320);
    for (let i = 0; i < grains; i++) {
      ctx.fillStyle =
        SOIL.crustGrains[(Math.random() * SOIL.crustGrains.length) | 0];
      ctx.globalAlpha = 0.3 + Math.random() * 0.45;
      const gx = Math.random() * w;
      const gy = Math.random() * h;
      const s = Math.random() < 0.85 ? 1 : 2;
      ctx.fillRect(gx, gy, s, s);
    }
    ctx.globalAlpha = 1;

    /* 乾いた畝の筋（水平のかすかな縞、濃さにむらを持たせる） */
    for (let y = 0; y < h; y += 13) {
      ctx.lineWidth = 1 + Math.random() * 2;
      const wob = Math.random() * 4;
      const phase = Math.random() * Math.PI * 2;
      for (let x = 0; x <= w; x += 60) {
        const a = 0.03 + 0.05 * (0.5 + 0.5 * Math.sin(x * 0.004 + phase));
        ctx.strokeStyle = `rgba(0,0,0,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(x, y + wob + Math.sin(x * 0.013 + y) * 2.2);
        ctx.lineTo(
          x + 60,
          y + wob + Math.sin((x + 60) * 0.013 + y) * 2.2
        );
        ctx.stroke();
      }
    }

    /* 日照りのひび割れ */
    const cracks = Math.floor((w * h) / 52000) + 8;
    for (let i = 0; i < cracks; i++) {
      let cx = Math.random() * w;
      let cy = Math.random() * h;
      let a = Math.random() * Math.PI * 2;
      const segs = 3 + ((Math.random() * 5) | 0);
      ctx.strokeStyle = `rgba(16,10,6,${0.14 + Math.random() * 0.12})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      for (let s = 0; s < segs; s++) {
        a += (Math.random() - 0.5) * 1.4;
        const len = 8 + Math.random() * 22;
        cx += Math.cos(a) * len;
        cy += Math.sin(a) * len;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

    /* 小石（上辺にわずかな光） */
    const stones = Math.floor((w * h) / 16000) + 20;
    for (let i = 0; i < stones; i++) {
      const sx = Math.random() * w;
      const sy = Math.random() * h;
      const sr = 1.5 + Math.random() * 3;
      const rot = Math.random() * Math.PI;
      ctx.globalAlpha = 0.3 + Math.random() * 0.3;
      ctx.fillStyle = Math.random() < 0.5 ? "#33271A" : "#5E4E36";
      ctx.beginPath();
      ctx.ellipse(sx, sy, sr, sr * 0.7, rot, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "#8F7B55";
      ctx.beginPath();
      ctx.ellipse(sx, sy - sr * 0.35, sr * 0.7, sr * 0.3, rot, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    /* 枯れ草・藁くず */
    const twigs = Math.floor((w * h) / 30000) + 12;
    for (let i = 0; i < twigs; i++) {
      const tx = Math.random() * w;
      const ty = Math.random() * h;
      const a = Math.random() * Math.PI;
      const len = 4 + Math.random() * 10;
      ctx.globalAlpha = 0.12 + Math.random() * 0.15;
      ctx.strokeStyle = SOIL.straw;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.quadraticCurveTo(
        tx + Math.cos(a) * len * 0.5 + (Math.random() - 0.5) * 4,
        ty + Math.sin(a) * len * 0.5 + (Math.random() - 0.5) * 4,
        tx + Math.cos(a) * len,
        ty + Math.sin(a) * len
      );
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    /* 種が埋まっている場所の、かすかな盛り土 */
    for (const s of seedsRef.current) {
      if (sproutedRef.current.has(s.w.slug)) continue;
      const cx = s.x * w;
      const cy = s.y * h;
      const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 30);
      g.addColorStop(0, "rgba(95,75,47,0.5)");
      g.addColorStop(1, "rgba(95,75,47,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, 3.2, 2.2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    /* 周辺減光 */
    const v = ctx.createRadialGradient(
      w / 2,
      h / 2,
      Math.min(w, h) * 0.3,
      w / 2,
      h / 2,
      Math.max(w, h) * 0.75
    );
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(10,6,3,0.5)");
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, w, h);
  }, []);

  /* リサイズ（モバイルのアドレスバー伸縮では再描画しない） */
  useEffect(() => {
    if (!mounted) return;
    paintBase();
    let lastW = window.innerWidth;
    const onResize = () => {
      if (Math.abs(window.innerWidth - lastW) < 2) return;
      lastW = window.innerWidth;
      paintBase();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mounted, paintBase, isMobile, activeDay]);

  /* ── 耕す ── */
  const tillingRef = useRef(false);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);

  const stamp = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      /* 掘り返した土くれ */
      const blobs = 2 + ((Math.random() * 2) | 0);
      for (let i = 0; i < blobs; i++) {
        const bx = x + (Math.random() - 0.5) * 26;
        const by = y + (Math.random() - 0.5) * 26;
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(Math.random() * Math.PI);
        ctx.fillStyle = SOIL.tilled[(Math.random() * SOIL.tilled.length) | 0];
        ctx.globalAlpha = 0.75 + Math.random() * 0.25;
        ctx.beginPath();
        ctx.ellipse(
          0,
          0,
          9 + Math.random() * 13,
          5 + Math.random() * 8,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }
      /* 土くれの縁のハイライト・藁くず */
      if (Math.random() < 0.35) {
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = SOIL.clodEdge;
        ctx.beginPath();
        ctx.ellipse(
          x + (Math.random() - 0.5) * 30,
          y + (Math.random() - 0.5) * 30,
          2.5,
          1.4,
          Math.random() * Math.PI,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      if (Math.random() < 0.14) {
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = SOIL.straw;
        ctx.lineWidth = 1;
        const sx = x + (Math.random() - 0.5) * 34;
        const sy = y + (Math.random() - 0.5) * 34;
        const a = Math.random() * Math.PI;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + Math.cos(a) * 7, sy + Math.sin(a) * 7);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      /* 近くの種を育てる */
      for (const s of seedsRef.current) {
        if (sproutedRef.current.has(s.w.slug)) continue;
        const dx = s.x * w - x;
        const dy = s.y * h - y;
        if (dx * dx + dy * dy < 75 * 75) {
          const p = (progressRef.current.get(s.w.slug) ?? 0) + 1;
          progressRef.current.set(s.w.slug, p);
          if (p >= 6) {
            setSprouted((prev) => {
              if (prev.has(s.w.slug)) return prev;
              const next = new Set(prev);
              next.add(s.w.slug);
              persist(next);
              return next;
            });
          }
        }
      }
    },
    [persist]
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    tillingRef.current = true;
    lastPtRef.current = null;
    setIntroDone(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      /* 自作カーソル追従 */
      const cur = cursorRef.current;
      if (cur) {
        cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${tillingRef.current ? 1.5 : 1})`;
      }
      if (!tillingRef.current) return;

      const last = lastPtRef.current;
      if (!last) {
        lastPtRef.current = { x, y };
        stamp(x, y);
        return;
      }
      const dist = Math.hypot(x - last.x, y - last.y);
      if (dist < 7) return;
      const steps = Math.min(Math.floor(dist / 7), 24);
      for (let i = 1; i <= steps; i++) {
        stamp(
          last.x + ((x - last.x) * i) / steps,
          last.y + ((y - last.y) * i) / steps
        );
      }
      lastPtRef.current = { x, y };
    },
    [stamp]
  );

  const endTill = useCallback(() => {
    tillingRef.current = false;
    lastPtRef.current = null;
    const cur = cursorRef.current;
    if (cur) {
      cur.style.transform = cur.style.transform.replace("scale(1.5)", "scale(1)");
    }
  }, []);

  /* ── 掘りさげる（詳細へ） ── */
  const digTo = useCallback(
    (w: Workshop) => {
      setDigging(w);
      window.setTimeout(() => {
        router.push(`/summit/2025/${w.slug}`);
      }, 560);
    },
    [router]
  );

  useEffect(() => {
    sprouted.forEach((slug) => {
      router.prefetch(`/summit/2025/${slug}`);
    });
  }, [sprouted, router]);

  useEffect(() => {
    document.body.style.overflow = overlay ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverlay(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [overlay]);

  const allSprouted = sprouted.size === WORKSHOPS.length;
  const visibleSeeds = seeds.filter((s) => sprouted.has(s.w.slug));

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-tagayase-deep">
      {/* ── 畑（キャンバス） ── */}
      <div
        ref={containerRef}
        className="absolute inset-0 touch-none select-none [cursor:none] max-md:[cursor:auto]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endTill}
        onPointerLeave={endTill}
        onPointerCancel={endTill}
      >
        <canvas ref={canvasRef} className="block" aria-hidden="true" />
      </div>

      {/* ── 芽 ── */}
      {visibleSeeds.map((s) => (
        <Sprout
          key={s.w.slug}
          seed={s}
          instant={restoredRef.current.has(s.w.slug)}
          onDig={() => digTo(s.w)}
        />
      ))}

      {/* ── 畝の日付ラベル（デスクトップ） ── */}
      {!isMobile &&
        mounted &&
        ([1, 2, 3] as const).map((d) => (
          <div
            key={d}
            className="tagayase-vertical pointer-events-none absolute left-5 font-mincho text-[11px] tracking-[0.35em] text-tagayase-straw/60"
            style={{ top: `${{ 1: 24, 2: 50, 3: 76 }[d] - 7}%` }}
          >
            {DAY_LABELS[d].kanji}
            <span className="ml-1 text-tagayase-straw/35">
              {DAY_LABELS[d].date.slice(5)}
            </span>
          </div>
        ))}

      {/* ── 導入（最初のひと耕しで消える） ── */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-[1200ms] ${
          introDone ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1
          className="tagayase-vertical font-bold leading-none tracking-[0.12em] text-tagayase-paper [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]"
          style={{ fontSize: "clamp(84px, 17vh, 160px)" }}
        >
          耕せ
        </h1>
        <div className="absolute bottom-[8%] left-1/2 w-full -translate-x-1/2 px-6 text-center">
          <Image
            src="/images/logo/logo_SUMMIT2025.svg"
            alt="EKKYO.SUMMIT 2025 in 信州上田"
            width={224}
            height={152}
            className="mx-auto mb-6 h-auto w-[176px] sm:w-[224px]"
            priority
          />
          <p className="text-sm leading-[2] tracking-[0.2em] text-tagayase-paper/90 sm:text-base">
            この記録は、耕したぶんだけ芽吹きます。
          </p>
          <p className="mt-1.5 text-xs leading-[2] tracking-[0.2em] text-tagayase-paper/70">
            {isMobile ? "指で土をなぞって、耕してください" : "ドラッグして、土を耕してください"}
          </p>
        </div>
      </div>

      {/* ── 見出し（左上・常設） ── */}
      <div
        className={`absolute left-5 top-5 z-30 transition-opacity duration-700 sm:left-8 sm:top-7 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/images/logo/logo_SUMMIT2025.svg"
          alt="耕せ — EKKYO.SUMMIT 2025 in 信州上田"
          width={96}
          height={65}
          className="h-auto w-[80px] sm:w-[96px]"
        />
      </div>

      {/* ── ナビ（右上・最初のひと耕しで現れる） ── */}
      <nav
        className={`absolute right-5 top-5 z-30 flex items-center gap-5 transition-opacity duration-700 sm:right-8 sm:top-7 sm:gap-7 ${
          introDone ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!introDone}
      >
        <button
          onClick={() => setOverlay("manifesto")}
          tabIndex={introDone ? 0 : -1}
          className="text-xs tracking-[0.3em] text-tagayase-paper/75 transition-colors hover:text-tagayase-paper sm:text-sm"
        >
          宣言
        </button>
        <button
          onClick={() => setOverlay("index")}
          tabIndex={introDone ? 0 : -1}
          className="text-xs tracking-[0.3em] text-tagayase-paper/75 transition-colors hover:text-tagayase-paper sm:text-sm"
        >
          一覧
        </button>
      </nav>

      {/* ── 収穫の記録（左下） ── */}
      <div
        className={`absolute bottom-5 left-5 z-30 transition-opacity duration-700 sm:bottom-7 sm:left-8 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-[5px]">
          {WORKSHOPS.map((w) => (
            <span
              key={w.slug}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                sprouted.has(w.slug)
                  ? "bg-tagayase-sprout"
                  : "border border-tagayase-straw/40"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-[10px] tracking-[0.2em] text-tagayase-straw/80">
          芽吹いた区画 {sprouted.size} / {WORKSHOPS.length}
        </p>
      </div>

      {/* ── 日の切り替え（モバイル） ── */}
      {isMobile && mounted && (
        <div className="absolute bottom-5 right-5 z-30 flex flex-col items-end gap-2">
          {([1, 2, 3] as const).map((d) => (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`font-mincho text-xs tracking-[0.25em] transition-colors ${
                activeDay === d
                  ? "text-tagayase-paper"
                  : "text-tagayase-straw/50"
              }`}
            >
              {activeDay === d && (
                <span className="mr-1.5 inline-block h-1 w-1 -translate-y-0.5 rounded-full bg-tagayase-akane" />
              )}
              {DAY_LABELS[d].kanji}
            </button>
          ))}
        </div>
      )}

      {/* ── 全区画が芽吹いたとき ── */}
      {allSprouted && (
        <div
          className="pointer-events-none absolute bottom-24 left-0 z-20 w-full px-6 text-center opacity-0 md:bottom-auto md:top-[8%]"
          style={{
            animation: "tagayase-rise 1.6s ease-out 0.8s forwards",
          }}
        >
          <p className="font-mincho text-sm leading-[2.2] tracking-[0.25em] text-tagayase-paper sm:text-lg">
            すべての区画が、芽吹きました。
          </p>
          <p className="mt-1 font-mincho text-xs tracking-[0.2em] text-tagayase-straw sm:text-sm">
            ──まだ見ぬ「わたし」に会いに行こう。
          </p>
        </div>
      )}

      {/* ── 自作カーソル（鍬の先） ── */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-40 hidden [@media(pointer:fine)]:block"
        style={{ transform: "translate(-100px, -100px)" }}
        aria-hidden="true"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-tagayase-paper/70 transition-transform duration-150">
          <span className="h-1 w-1 rounded-full bg-tagayase-paper/90" />
        </div>
      </div>

      {/* ── 掘りさげ遷移 ── */}
      <div
        className={`pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-tagayase-deep transition-opacity duration-500 ${
          digging ? "opacity-100" : "opacity-0"
        }`}
      >
        {digging && (
          <p className="tagayase-vertical font-mincho text-sm tracking-[0.4em] text-tagayase-straw">
            第{kanjiNo(digging.no)}区画を掘りさげる
          </p>
        )}
      </div>

      {/* ── 宣言・一覧 ── */}
      {overlay === "manifesto" && (
        <ManifestoOverlay onClose={() => setOverlay(null)} />
      )}
      {overlay === "index" && (
        <IndexOverlay onClose={() => setOverlay(null)} onSelect={digTo} />
      )}
    </div>
  );
}

/* ══════════ 芽 ══════════ */
function Sprout({
  seed,
  instant,
  onDig,
}: {
  seed: SeedPos;
  instant: boolean;
  onDig: () => void;
}) {
  const { w } = seed;
  const dur = instant ? "0s" : undefined;
  return (
    <button
      onClick={onDig}
      className="group absolute z-10 -translate-x-1/2 outline-none"
      style={{ left: `${seed.x * 100}%`, top: `${seed.y * 100}%` }}
      aria-label={`第${kanjiNo(w.no)}区画 ${w.title} の記録を開く`}
    >
      {/* 茎と葉（基点＝種の位置から上に伸びる） */}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2">
        <div
          className="group-hover:[animation:tagayase-sway_1.8s_ease-in-out_infinite] group-focus-visible:[animation:tagayase-sway_1.8s_ease-in-out_infinite]"
          style={{ transformOrigin: "50% 100%" }}
        >
        <svg
          width="44"
          height="52"
          viewBox="0 0 44 52"
          fill="none"
          className="overflow-visible"
        >
          <path
            d="M22 52 C22 40 21 30 22 18"
            stroke="#A4B25C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="60"
            strokeDashoffset="60"
            style={{
              animation: `tagayase-stem 0.9s cubic-bezier(0.22,1,0.36,1) forwards`,
              animationDuration: dur ?? "0.9s",
            }}
          />
          <path
            d="M22 24 C15 22 10 16 10 9 C18 10 22 16 22 24 Z"
            fill="#8B9A48"
            style={{
              transformOrigin: "22px 24px",
              opacity: 0,
              animation: `tagayase-leaf 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards`,
              animationDelay: instant ? "0s" : "0.55s",
              animationDuration: dur ?? "0.55s",
            }}
          />
          <path
            d="M22 20 C29 18 34 12 34 5 C26 6 22 12 22 20 Z"
            fill="#A4B25C"
            style={{
              transformOrigin: "22px 20px",
              opacity: 0,
              animation: `tagayase-leaf 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards`,
              animationDelay: instant ? "0s" : "0.72s",
              animationDuration: dur ?? "0.55s",
            }}
          />
        </svg>
        </div>
      </div>

      {/* 名前（基点から下に垂れる札） */}
      <span
        className="tagayase-vertical block pt-3 font-mincho text-[13px] leading-none tracking-[0.22em] text-tagayase-paper/90 opacity-0 transition-colors duration-300 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)] group-hover:text-tagayase-sprout group-focus-visible:text-tagayase-sprout sm:text-sm"
        style={{
          animation: "tagayase-name 0.8s ease-out forwards",
          animationDelay: instant ? "0s" : "1s",
          animationDuration: dur ?? "0.8s",
          maxHeight: "170px",
        }}
      >
        {w.label}
      </span>
    </button>
  );
}

/* ══════════ 宣言（全体コンセプト） ══════════ */
function ManifestoOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="tagayase-grain fixed inset-0 z-50 overflow-y-auto bg-tagayase-paper text-[#241711]">
      <CloseButton onClose={onClose} dark />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:px-12">
        {/* 縦書きの宣言文（右から左へ読む） */}
        <div dir="rtl" className="tagayase-scroll overflow-x-auto pb-6">
          <div
            dir="ltr"
            className="tagayase-vertical mx-auto font-mincho leading-[2.35] tracking-[0.08em]"
            style={{ height: "min(66vh, 620px)" }}
          >
            <p className="mb-8 ml-10 text-2xl font-bold tracking-[0.3em] sm:text-3xl">
              耕せ
            </p>
            {MANIFESTO.map((stanza, i) => (
              <p key={i} className="ml-8 text-[13px] sm:ml-10 sm:text-[15px]">
                {stanza.map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </p>
            ))}
            <p className="ml-12 pt-2 text-[11px] tracking-[0.3em] text-[#241711]/60">
              {SUMMIT_META.title}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-[#241711]/20 pt-10">
          <div className="grid gap-x-10 gap-y-6 text-[11px] leading-[1.9] sm:grid-cols-2">
            <div>
              <p className="font-mincho text-sm font-bold tracking-[0.15em]">
                {SUMMIT_META.title}
              </p>
              <p className="mt-1 text-[#241711]/70">
                {SUMMIT_META.period}　{SUMMIT_META.place}
              </p>
              <p className="mt-4 text-[#241711]/70">
                テーマ「{SUMMIT_META.theme}」のもと、3日間・18のワークショップで
                <br className="hidden sm:block" />
                感性を耕し合った越境の祭典の記録。
              </p>
            </div>
            <div className="space-y-3">
              {CREDITS.map((c) => (
                <div key={c.label} className="flex gap-4">
                  <span className="w-16 shrink-0 text-[#241711]/50">
                    {c.label}
                  </span>
                  <span className="text-[#241711]/80">
                    {c.items.join("　")}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 text-xs tracking-[0.1em]">
            <Link
              href="/"
              className="text-[#241711]/60 underline-offset-4 transition-colors hover:text-[#241711] hover:underline"
            >
              EKKYO.HUB のサイトへ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════ 一覧 ══════════ */
function IndexOverlay({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (w: Workshop) => void;
}) {
  return (
    <div className="tagayase-grain fixed inset-0 z-50 overflow-y-auto bg-tagayase-paper text-[#241711]">
      <CloseButton onClose={onClose} dark />
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-20 sm:px-10">
        <h2 className="font-mincho text-2xl font-bold tracking-[0.2em]">
          区画の一覧
        </h2>
        <p className="mt-3 text-xs leading-[1.9] text-[#241711]/60">
          畑で耕して見つけることも、ここから直接訪ねることもできます。
        </p>
        {([1, 2, 3] as const).map((d) => (
          <section key={d} className="mt-10">
            <p className="text-sm font-bold tracking-[0.3em] text-[#241711]/70">
              {DAY_LABELS[d].kanji}
              <span className="ml-3 text-xs font-normal tracking-[0.1em] text-[#241711]/45">
                {DAY_LABELS[d].date}
              </span>
            </p>
            <ul className="mt-3 border-t border-[#241711]/15">
              {WORKSHOPS.filter((w) => w.day === d).map((w) => (
                <li key={w.slug} className="border-b border-[#241711]/15">
                  <button
                    onClick={() => onSelect(w)}
                    className="group flex w-full items-baseline gap-4 py-3.5 text-left transition-colors hover:bg-[#241711]/5"
                  >
                    <span className="w-9 shrink-0 font-mincho text-xs text-[#241711]/45">
                      {kanjiNo(w.no)}
                    </span>
                    <span className="flex-1 font-mincho text-[13px] leading-[1.7] tracking-[0.04em] sm:text-sm">
                      {w.title}
                    </span>
                    <span className="shrink-0 text-xs text-[#241711]/0 transition-colors group-hover:text-tagayase-akane">
                      掘る
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function CloseButton({
  onClose,
  dark,
}: {
  onClose: () => void;
  dark?: boolean;
}) {
  return (
    <button
      onClick={onClose}
      aria-label="閉じる"
      className={`fixed right-5 top-5 z-[55] flex h-11 w-11 items-center justify-center sm:right-8 sm:top-7 ${
        dark ? "text-[#241711]/60 hover:text-[#241711]" : "text-tagayase-paper"
      } transition-colors`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.2">
        <line x1="1" y1="1" x2="17" y2="17" />
        <line x1="17" y1="1" x2="1" y2="17" />
      </svg>
    </button>
  );
}
