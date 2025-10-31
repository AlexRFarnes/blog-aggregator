import { getNextFeedToFetch, markFeedFetched } from "src/db/queries/feeds";
import { fetchFeed } from "../utils/rss";
import { parseDuration } from "../utils/time";

export async function handlerAggregate(commandName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${commandName} <time_between_reqs>`);
  }

  const timeArg = args[0];
  const timeBetweenRequests = parseDuration(timeArg);

  if (!timeBetweenRequests) {
    throw new Error(
      `invalid duration: ${timeArg} — use format 1h 30m 15s or 1500ms`
    );
  }

  console.log(`Collecting feeds every ${timeArg}...`);

  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, timeBetweenRequests);

  await new Promise<void>(resolve => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator");
      clearInterval(interval);
      resolve();
    });
  });
}

export async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch();
  await markFeedFetched(nextFeed.id);

  const feedData = await fetchFeed(nextFeed.url);
  console.log(`Fetched data from ${feedData.channel.title}`);
  for (const item of feedData.channel.item) {
    console.log(`    - ${item.title}`);
  }
  console.log("\n");
}

export function handleError(error: unknown) {
  console.error(
    `Error scraping feeds: ${error instanceof Error ? error.message : error}`
  );
}
