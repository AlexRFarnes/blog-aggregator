import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema/schema";
import { User } from "../schema/schema";

export async function createFeed(name: string, url: string, user: User) {
  const [result] = await db
    .insert(feeds)
    .values({ name: name, url: url, userId: user.id })
    .returning();

  return result;
}

export async function getAllFeeds() {
  const result = await db
    .select({ name: feeds.name, url: feeds.url, userName: users.name })
    .from(feeds)
    .leftJoin(users, eq(feeds.userId, users.id));

  return result;
}

export async function getFeedByUrl(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));

  return result;
}

export async function markFeedFetched(id: string) {
  await db
    .update(feeds)
    .set({ lastFetchedAt: new Date() })
    .where(eq(feeds.id, id));
}

export async function getNextFeedToFetch() {
  const [result] = await db
    .select()
    .from(feeds)
    .limit(1)
    .orderBy(sql`${feeds.lastFetchedAt} NULLS FIRST`);

  return result;
}
