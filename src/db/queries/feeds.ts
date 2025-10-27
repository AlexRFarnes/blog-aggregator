import { db } from "..";
import { feeds } from "../schema/schema";
import { User } from "../schema/schema";

export async function createFeed(name: string, url: string, user: User) {
  const [result] = await db
    .insert(feeds)
    .values({ name: name, url: url, user_id: user.id })
    .returning();

  return result;
}
