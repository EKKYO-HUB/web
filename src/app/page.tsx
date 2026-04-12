import Image from "next/image";
import Link from "next/link";
import { getNoteArticles } from "@/lib/note";
import { getPortfolioProjects } from "@/lib/mdx";
import { getPressReleases } from "@/lib/press-releases";
import { formatDate } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HeroSection from "@/components/ui/HeroSection";
import { blurProps } from "@/lib/image-utils";

type MediaItem = {
  title: string;
  date: string;
  link: string;
  isExternal: boolean;
};

export default async function HomePage() {
  const articles = await getNoteArticles().catch(() => []);
  const projects = getPortfolioProjects();
  const pressReleases = getPressReleases();

  // Merge note articles + press releases, sort by date, take top 3
  const noteItems: MediaItem[] = articles.map((a) => ({
    title: a.title,
    date: a.pubDate,
    link: a.link,
    isExternal: true,
  }));
  const pressItems: MediaItem[] = pressReleases.map((pr) => ({
    title: pr.title,
    date: pr.date,
    link: pr.externalUrl || `/media/news/${pr.slug}`,
    isExternal: !!pr.externalUrl,
  }));
  const latestMedia = [...noteItems, ...pressItems]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const featuredProjects = projects.slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "一般社団法人EKKYO.HUB",
    url: "https://www.ekkyo.jp",
    logo: "https://www.ekkyo.jp/images/logo/logo_丸_青背景.svg",
    description:
      "面白そうを開拓せよ、面白そうでは終わらせない。好奇心と創造性で領域を越えていくクリエイティブユニット。",
    address: {
      "@type": "PostalAddress",
      streetAddress: "円山町5番3号 MIEUX渋谷ビル8階",
      addressLocality: "渋谷区",
      addressRegion: "東京都",
      postalCode: "150-0044",
      addressCountry: "JP",
    },
    email: "info@ekkyo.jp",
    sameAs: [
      "https://note.com/ekkyo_hub",
      "https://www.instagram.com/ekkyo.hub/",
      "https://ekkyo-hub.peatix.com",
    ],
  };

  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <HeroSection />

      {/* About teaser */}
      <section className="relative overflow-hidden bg-ekkyo-black px-6 py-24 sm:px-12 lg:py-32">
        {/* Logo mark — large background accent */}
        <div className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2">
          <Image
            src="/images/logo/logo_mark_white.svg"
            alt=""
            width={600}
            height={600}
            className="opacity-[0.06] sm:opacity-[0.1] lg:opacity-[0.15]"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <AnimatedSection>
            <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
              ABOUT
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="mt-6 max-w-3xl text-2xl font-bold leading-[1.6] text-white sm:text-3xl lg:text-4xl">
              問いを立て、境を越え、
              <br />
              共に未来を創る。
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="mt-6 max-w-2xl text-sm leading-[2] text-white/60">
              EKKYO.HUBは、世の中のオルタナティブと好奇心を探究し続けるクリエイティブユニットです。
              <br />
              ワークショップやアート、ビジネス、テクノロジーを通じた探求と表現を行っています。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio preview */}
      {featuredProjects.length > 0 && (
        <section className="px-6 py-24 sm:px-12 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
                    PORTFOLIO
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    活動記録
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="hidden text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent transition-opacity hover:opacity-70 sm:inline"
                >
                  ALL WORKS &rarr;
                </Link>
              </div>
            </AnimatedSection>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {featuredProjects.map((project, i) => (
                <AnimatedSection key={project.slug} delay={i * 0.1}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group relative flex h-full flex-col overflow-hidden bg-gray-50 transition-all hover:bg-ekkyo-accent/5"
                  >
                    {project.coverImage && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 50vw"
                          {...blurProps(project.coverImage)}
                        />
                      </div>
                    )}
                    <div className="relative flex flex-1 flex-col p-8 sm:p-10">
                      <span className="absolute right-6 top-6 text-[10px] font-medium tracking-[0.15em] text-ekkyo-accent">
                        {project.category}
                      </span>
                      <p className="text-xs text-ekkyo-gray">
                        {project.dateLabel || formatDate(project.date)}
                      </p>
                      <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-ekkyo-accent sm:text-2xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ekkyo-gray">
                        {project.summary}
                      </p>
                      <span className="mt-auto inline-block pt-6 text-[11px] font-medium tracking-[0.15em] text-ekkyo-accent opacity-0 transition-opacity group-hover:opacity-100">
                        READ MORE &rarr;
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <Link
              href="/portfolio"
              className="mt-8 inline-block text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent sm:hidden"
            >
              ALL WORKS &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Media preview */}
      {latestMedia.length > 0 && (
        <section className="bg-gray-50 px-6 py-24 sm:px-12 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.3em] text-ekkyo-accent">
                    MEDIA
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    最新の記事
                  </h2>
                </div>
                <Link
                  href="/media"
                  className="hidden text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent transition-opacity hover:opacity-70 sm:inline"
                >
                  ALL ARTICLES &rarr;
                </Link>
              </div>
            </AnimatedSection>

            <div className="mt-12 space-y-0 divide-y divide-black/10">
              {latestMedia.map((item, i) => (
                <AnimatedSection key={item.link} delay={i * 0.1}>
                  <Link
                    href={item.link}
                    {...(item.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center justify-between gap-6 py-8"
                  >
                    <div className="flex-1">
                      <p className="text-xs text-ekkyo-gray">
                        {formatDate(item.date)}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-ekkyo-accent sm:text-xl">
                        {item.title}
                      </h3>
                    </div>
                    <span className="shrink-0 text-ekkyo-accent opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      &rarr;
                    </span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <Link
              href="/media"
              className="mt-6 inline-block text-[11px] font-medium tracking-[0.2em] text-ekkyo-accent sm:hidden"
            >
              ALL ARTICLES &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-ekkyo-accent px-6 py-24 text-center sm:px-12 lg:py-32">
        <AnimatedSection>
          <h2 className="whitespace-nowrap font-chunk text-2xl font-bold tracking-wide text-white sm:text-3xl lg:text-4xl">
            unusual and therefore worth noticing
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
            EKKYO.HUBの活動に興味がある方、一緒に何かやりたい方、
            <br />
            お気軽にご連絡ください。
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="border border-white/30 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-white hover:text-ekkyo-accent"
            >
              CONTACT
            </Link>
            <Link
              href="https://note.com/ekkyo_hub"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-white hover:text-ekkyo-accent"
            >
              NOTE
            </Link>
            <Link
              href="https://www.instagram.com/ekkyo.hub/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-white transition-all hover:bg-white hover:text-ekkyo-accent"
            >
              INSTAGRAM
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
