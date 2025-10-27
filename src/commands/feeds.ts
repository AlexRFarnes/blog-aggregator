import { getCurrentUser } from "../config";
import { createFeed, getAllFeeds } from "../db/queries/feeds";
import { getUser } from "../db/queries/users";
import { Feed, User } from "../db/schema/schema";

export async function handlerAddFeed(commandName: string, ...args: string[]) {
  const currentUser = getCurrentUser();
  const user = await getUser(currentUser);

  if (!user) {
    throw new Error("Need to register the user first");
  }

  if (args.length !== 2) {
    throw new Error(`usage: ${commandName} <feed_name> <url>`);
  }
  const feedName = args[0];
  const url = args[1];

  const feed = await createFeed(feedName, url, user);

  printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
  for (const [key, value] of Object.entries(feed)) {
    console.log(`${key}: ${value}`);
  }
  for (const [key, value] of Object.entries(user)) {
    console.log(`${key}: ${value}`);
  }
}

export async function handlerListFeeds(commandName: string, ...args: string[]) {
  const feeds = await getAllFeeds();

  if (feeds.length === 0) {
    console.log(`No feeds found.`);
    return;
  }

  console.log(`Found %d feeds:\n`, feeds.length);

  for (const entry of feeds) {
    for (const value of Object.values(entry)) {
      console.log(`- ${value}`);
    }
    console.log("----------------------------------------");
  }
}
