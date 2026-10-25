const VIDEO_ID = "6JRiI8_Wj9s";
const YOUTUBE_URL = `https://youtu.be/${VIDEO_ID}`;
const THUMB = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

/* 当日のムービー。ページ末尾の結び（水底）に置くカード。
   ページ内では再生せず、押すと YouTube を別タブで開く。 */
export default function EventMovie() {
  return (
    <a
      href={YOUTUBE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="当日のムービーを YouTube で観る"
      className="group mx-auto mt-12 block max-w-2xl text-left"
    >
      <span className="relative block aspect-video overflow-hidden border border-mamire-water-pale/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={THUMB}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border border-mamire-water-pale/70 bg-mamire-water-deep/40 pl-1 text-mamire-water-pale backdrop-blur-[2px] transition-transform group-hover:scale-105">
            ▶
          </span>
        </span>
      </span>
      <span className="mt-3 flex items-baseline justify-between gap-4">
        <span className="font-mincho text-sm tracking-[0.2em] text-mamire-water-pale/80">
          当日のムービー
        </span>
        <span className="text-[11px] tracking-[0.15em] text-mamire-water-pale/55 transition-colors group-hover:text-mamire-water-pale">
          YouTubeで観る ↗
        </span>
      </span>
    </a>
  );
}
