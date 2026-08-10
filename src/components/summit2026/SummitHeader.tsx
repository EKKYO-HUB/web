import Link from "next/link";

/* SUMMIT 2026 専用ミニマルヘッダー（没入型）
   左: 大会ロゴ / 右: EKKYO.HUBへの帰り道 + 参加申し込み */
export default function SummitHeader({
  registrationUrl,
}: {
  registrationUrl: string | null;
}) {
  return (
    <header className="fixed top-0 z-50 h-14 w-full border-b border-mamire-silt/20 bg-mamire-water-pale/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-10">
        <a href="#top" className="flex items-center" aria-label="EKKYO.SUMMIT 2026">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/summit2026/ekkyo-summit-2026.svg"
            alt="EKKYO.SUMMIT 2026"
            className="h-5 w-auto brightness-0 opacity-85 sm:h-6"
          />
        </a>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="hidden text-[11px] tracking-[0.12em] text-mamire-ink/60 transition-colors hover:text-mamire-ink sm:inline"
          >
            EKKYO.HUB &rarr;
          </Link>
          {registrationUrl ? (
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ekkyo-orange px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-white transition-colors hover:bg-ekkyo-orange-dark sm:px-5"
            >
              参加申し込み
            </a>
          ) : (
            <a
              href="#apply"
              className="bg-ekkyo-orange px-4 py-2 text-[11px] font-semibold tracking-[0.12em] text-white transition-colors hover:bg-ekkyo-orange-dark sm:px-5"
            >
              参加申し込み
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
