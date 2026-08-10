"use client";

import { useEffect, useState } from "react";

/* 到着時の白いベール（水面を抜ける瞬間）。
   フェイルセーフのため:
   - サーバー描画では出さない（JS無効環境で幕が残らない）
   - 一定時間後に必ず DOM から取り除く（アニメ未実行でも覆い続けない）
   - reduced-motion では最初から出さない */
export default function ArrivalVeil() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 2600);
    return () => window.clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="mamire-veil pointer-events-none absolute inset-0 z-20 bg-mamire-water-pale"
    />
  );
}
