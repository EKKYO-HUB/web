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
  "media:thumbnail": { $: { url: string } };
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

export async function getNoteArticles(): Promise<NoteArticle[]> {
  try {
    const feed = await parser.parseURL(NOTE_RSS_URL);
    return feed.items.map((item) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      contentSnippet: item.contentSnippet ?? "",
      thumbnail: item["media:thumbnail"]?.["$"]?.url,
      creatorName: item["note:creatorName"],
    }));
  } catch (error) {
    console.error("Failed to fetch Note RSS:", error);
    return [];
  }
}
