import Parser from "rss-parser";

export type NoteArticle = {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  thumbnail?: string;
  creatorName?: string;
};

type CustomFeed = { title: string; link: string };
type CustomItem = {
  "media:thumbnail": string;
  "note:creatorName": string;
};

const parser = new Parser<CustomFeed, CustomItem>({
  customFields: {
    item: [
      ["media:thumbnail", "media:thumbnail"],
      ["note:creatorName", "note:creatorName"],
    ],
  },
});

const NOTE_RSS_URL =
  process.env.NOTE_RSS_URL ?? "https://note.com/ekkyo_hub/rss";

/**
 * 手動で追加する外部note記事。URLだけ指定すればOK。
 * ビルド時にOGタグからタイトル・サムネイル・説明文を自動取得。
 */
const manualArticleUrls: string[] = [
  "https://note.com/tackmetakumi/n/n684d52aebb6e",
];

async function fetchOgMeta(
  url: string
): Promise<NoteArticle | null> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await res.text();

    const getOg = (prop: string): string => {
      const m =
        html.match(
          new RegExp(`property="${prop}"\\s+content="([^"]*?)"`)
        ) ||
        html.match(
          new RegExp(`content="([^"]*?)"\\s+property="${prop}"`)
        );
      return m ? m[1] : "";
    };

    const rawTitle = getOg("og:title");
    // note.com appends "｜著者名" to og:title
    const titleParts = rawTitle.split("｜");
    const title = titleParts[0].trim();
    const creatorName = titleParts[1]?.trim() || "";

    const thumbnail = getOg("og:image") || undefined;
    const contentSnippet = getOg("og:description");

    // Try to get published date from meta or JSON-LD
    const dateMatch = html.match(
      /note__createdAt"[^>]*>([^<]+)</
    ) || html.match(/"datePublished"\s*:\s*"([^"]+)"/);

    return {
      title,
      link: url.split("?")[0], // remove query params
      pubDate: dateMatch ? dateMatch[1] : new Date().toISOString(),
      contentSnippet,
      thumbnail,
      creatorName,
    };
  } catch (error) {
    console.error(`Failed to fetch OG meta for ${url}:`, error);
    return null;
  }
}

export async function getNoteArticles(): Promise<NoteArticle[]> {
  try {
    // Fetch RSS + manual articles in parallel
    const [feed, ...manualResults] = await Promise.all([
      parser.parseURL(NOTE_RSS_URL),
      ...manualArticleUrls.map((url) => fetchOgMeta(url)),
    ]);

    const rssArticles: NoteArticle[] = feed.items.map((item) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      contentSnippet: item.contentSnippet ?? "",
      thumbnail: item["media:thumbnail"] || undefined,
      creatorName: item["note:creatorName"],
    }));

    const manualArticles = manualResults.filter(
      (a): a is NoteArticle => a !== null
    );

    // Merge, deduplicate by link, sort by date
    const allLinks = new Set(rssArticles.map((a) => a.link));
    const unique = [
      ...rssArticles,
      ...manualArticles.filter((a) => !allLinks.has(a.link)),
    ];
    return unique.sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
  } catch (error) {
    console.error("Failed to fetch Note RSS:", error);
    // Fallback: try manual articles only
    const results = await Promise.all(
      manualArticleUrls.map((url) => fetchOgMeta(url))
    );
    return results.filter((a): a is NoteArticle => a !== null);
  }
}
