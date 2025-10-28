import { getCurrentUser } from "src/config";
import { createFeedFollow } from "src/db/queries/feedFollow";
import { getFeedByUrl } from "src/db/queries/feeds";
import { getUser } from "src/db/queries/users";
import { getAllFollowedFeeds } from "src/db/queries/feedFollow";
import { printFeedFollow } from "src/utils/printFeedFollow";

export async function handlerFollow(commandName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${commandName} <url>`);
  }

  const url = args[0];

  const currentUser = getCurrentUser();
  const user = await getUser(currentUser);

  if (!user) {
    throw new Error(`User ${currentUser} not found`);
  }

  const feed = await getFeedByUrl(url);

  if (!feed) {
    throw new Error(`Feed ${url} not found`);
  }

  const followFeed = await createFeedFollow(feed, user);

  console.log(
    `${followFeed.userName} is now following feed ${followFeed.feedName}`
  );

  printFeedFollow(followFeed.userName, followFeed.feedName);
}

export async function getFeedFollowsForUser(
  commandName: string,
  ...args: string[]
) {
  const currentUser = getCurrentUser();
  const user = await getUser(currentUser);

  if (!user) {
    throw new Error(`User ${currentUser} not found`);
  }

  const followedFeeds = await getAllFollowedFeeds(user);

  if (followedFeeds.length === 0) {
    console.log(`You are not following any feed`);
    return;
  }

  console.log(`Feed follows for user ${user.name}:\n`);

  for (const entry of followedFeeds) {
    console.log(`- ${entry.feedName}`);
  }
}
