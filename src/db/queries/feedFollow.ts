import { eq, and } from "drizzle-orm";
import { db } from "..";
import { Feed, feedFollows, User, feeds, users } from "../schema/schema";

export async function createFeedFollow(feed: Feed, user: User) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values({ userId: user.id, feedId: feed.id })
    .returning();

  const [result] = await db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      feedName: feeds.name,
      url: feeds.url,
      userName: users.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(feedFollows.id, newFeedFollow.id));

  return result;
}

export async function getAllFollowedFeeds(user: User) {
  const result = db
    .select({ feedName: feeds.name, url: feeds.url, userName: users.name })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.userId, user.id));

  return result;
}

export async function deleteFeedFollow(feed: Feed, user: User) {
  const [result] = await db
    .delete(feedFollows)
    .where(
      and(eq(feedFollows.feedId, feed.id), eq(feedFollows.userId, user.id))
    )
    .returning();

  return result;
}
