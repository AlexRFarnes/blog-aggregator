import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const response = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
      accept: "application/rss+xml",
    },
  });

  if (!response.ok) {
    throw new Error(
      `failed to fetch feed: ${response.status} ${response.statusText}`
    );
  }

  const xml = await response.text();

  const parser = new XMLParser();
  const { rss } = parser.parse(xml);

  const channel = rss?.channel;

  if (!channel) {
    throw new Error("failed to parse channel");
  }

  if (!isValidField(channel, "title", "string")) {
    throw new Error("failed to parse channel");
  }

  if (!isValidField(channel, "link", "string")) {
    throw new Error("failed to parse channel");
  }

  if (!isValidField(channel, "description", "string")) {
    throw new Error("failed to parse channel");
  }

  if (!channel.item) {
    throw new Error("failed to parse channel");
  }

  const items: any[] = Array.isArray(channel.item)
    ? channel.item
    : [channel.item];

  const rssItems: RSSItem[] = [];

  for (const item of items) {
    if (!item.title || !item.link || !item.description || !item.pubDate)
      continue;

    const { title, link, description, pubDate } = item; // item here can have additional unwanted fields
    rssItems.push({ title, link, description, pubDate });
  }

  const { title, link, description } = channel;

  return {
    channel: {
      title,
      link,
      description,
      item: rssItems,
    },
  } as RSSFeed;
}

function isValidField(
  obj: Record<string, string>,
  field: string,
  type: string
): boolean {
  if (!obj[field] || typeof obj[field] !== type) return false;
  return true;
}
