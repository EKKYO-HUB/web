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
 * 手動で追加する外部note記事。
 * RSSフィードに含まれない他アカウントの記事などをここに追加。
 */
const manualArticles: NoteArticle[] = [
  {
    title: "EKKYO.SUMMIT2025無事に終わりました！感想と運営の裏話",
    link: "https://note.com/tackmetakumi/n/n684d52aebb6e",
    pubDate: "2025-11-11",
    contentSnippet:
      "EKKYO.SUMMIT2025in信州上田を11月1日～3日に執り行い、無事終了いたしました。いや〜、本当に終わりました。感無量です。関係者各位には、本当に頭があがりません。ありがとうございます。大成功といってもいいのではないかと思うのですが、ここでは上田アンバサダーとしてSUMMITでは語りきれなかった裏話も交えながら振り返っていければと思います。",
    creatorName: "平澤拓海",
  },
];

export async function getNoteArticles(): Promise<NoteArticle[]> {
  try {
    const feed = await parser.parseURL(NOTE_RSS_URL);
    const rssArticles = feed.items.map((item) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      contentSnippet: item.contentSnippet ?? "",
      thumbnail: item["media:thumbnail"] || undefined,
      creatorName: item["note:creatorName"],
    }));

    // Merge RSS + manual, deduplicate by link, sort by date
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
    return manualArticles;
  }
}
