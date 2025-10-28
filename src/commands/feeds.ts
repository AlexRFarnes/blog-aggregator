import { printFeedFollow } from "src/utils/printFeedFollow";
import { createFeedFollow } from "src/db/queries/feedFollow";
import { getCurrentUser } from "../config";
import { createFeed, getAllFeeds } from "../db/queries/feeds";
import { getUser } from "../db/queries/users";
import { Feed, User } from "../db/schema/schema";

export async function handlerAddFeed(commandName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: ${commandName} <feed_name> <url>`);
  }

  const currentUser = getCurrentUser();
  const user = await getUser(currentUser);

  if (!user) {
    throw new Error(`User ${currentUser} not found`);
  }

  const feedName = args[0];
  const url = args[1];

  const feed = await createFeed(feedName, url, user);

  if (!feed) {
    throw new Error(`Something went wrong when creating the feed ${feedName}`);
  }

  const feedFollow = await createFeedFollow(feed, user);

  printFeedFollow(feedFollow.userName, feedFollow.feedName);

  console.log("Feed created successfully:");
  printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
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
