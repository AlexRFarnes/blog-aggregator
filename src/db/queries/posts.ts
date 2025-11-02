import { eq, desc, asc } from "drizzle-orm";
import { db } from "..";
import { Feed, feedFollows, feeds, posts, User } from "../schema/schema";

export async function createPost(
  title: string,
  url: string,
  feed: Feed,
  pubDate: string,
  description?: string
) {
  const [result] = await db
    .insert(posts)
    .values({
      title: title,
      url: url,
      feedId: feed.id,
      publishedAt: new Date(pubDate),
      description: description,
    })
    .returning();

  return result;
}

export async function getPostsForUser(user: User, numOfPosts: number) {
  const result = await db
    .select({
      title: posts.title,
      url: posts.url,
      description: posts.description,
      name: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(posts, eq(feedFollows.feedId, posts.feedId))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.userId, user.id))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
    .limit(numOfPosts);

  return result;
}
