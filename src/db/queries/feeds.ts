import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema/schema";
import { User } from "../schema/schema";

export async function createFeed(name: string, url: string, user: User) {
  const [result] = await db
    .insert(feeds)
    .values({ name: name, url: url, user_id: user.id })
    .returning();

  return result;
}

export async function getAllFeeds() {
  const result = await db
    .select({ name: feeds.name, url: feeds.url, user_name: users.name })
    .from(feeds)
    .leftJoin(users, eq(feeds.user_id, users.id));

  return result;
}
