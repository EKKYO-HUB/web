import { blurData } from "./blur-data";

/**
 * Get blur placeholder props for next/image.
 * Usage: <Image {...blurProps("/images/xxx.jpg")} />
 */
export function blurProps(src: string) {
  const blur = blurData[src];
  if (!blur) return {};
  return {
    placeholder: "blur" as const,
    blurDataURL: blur,
  };
}
