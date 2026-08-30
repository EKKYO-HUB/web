"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/* SUMMIT 2026 / 2025アーカイブ は没入型マイクロサイト（専用の結びを持つ）のため
   共通フッターを出さない。それ以外のページではそのまま表示する。 */
export default function ConditionalFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/summit/2026") || pathname.startsWith("/summit/2025"))
    return null;
  return <>{children}</>;
}
