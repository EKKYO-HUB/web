import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORKSHOPS, getWorkshop, getAdjacent } from "@/content/summit2025";
import PlotArchive from "./PlotArchive";

export function generateStaticParams() {
  return WORKSHOPS.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const w = getWorkshop(params.slug);
  if (!w) return {};
  return {
    title: `${w.title} | 耕せ — EKKYO.SUMMIT 2025 ARCHIVE`,
    description: `EKKYO.SUMMIT 2025 in 信州上田（テーマ「耕せ」）のワークショップ「${w.title}」の記録。`,
  };
}

export default function PlotPage({ params }: { params: { slug: string } }) {
  const workshop = getWorkshop(params.slug);
  if (!workshop) notFound();
  const { prev, next } = getAdjacent(params.slug);
  return <PlotArchive workshop={workshop} prev={prev} next={next} />;
}
