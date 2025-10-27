import { getCurrentUser } from "./config";
import { createFeed } from "./db/queries/feeds";
import { getUser } from "./db/queries/users";
import { Feed, User } from "./db/schema/schema";

export async function addFeed(commandName: string, ...args: string[]) {
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
