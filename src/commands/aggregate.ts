import { getNextFeedToFetch, markFeedFetched } from "src/db/queries/feeds";
import { fetchFeed } from "../utils/rss";

export async function handlerAggregate(commandName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${commandName} <time_between_reqs>`);
  }

  const durationStr = args[0];
  const duration = parseDuration(durationStr);

  // TODO: implement scheduling logic here

  // console.log(`Collecting feeds every`);

  // const feedData = await fetchFeed(feedURL);
  // const feedDataStr = JSON.stringify(feedData, null, 2);
  // console.dir(feedDataStr);
}

export async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch();
  await markFeedFetched(nextFeed.id);

  const feedData = await fetchFeed(nextFeed.url);
  console.log(`Fetched data from ${feedData.channel.title}`);
  for (const item of feedData.channel.item) {
    console.log(`- ${item.title}`);
  }
}

function parseDuration(durationStr: string): number {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);

  if (!match) {
    throw new Error(
      "time_between_reqs should be in format '<time><unit_of_time>' eg: 1m"
    );
  }
  return parseInt(match[1]);
}
