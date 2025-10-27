import { fetchFeed } from "../utils/rss";

export async function handlerAggregate(commandName: string, ...args: string[]) {
  //   if (args.length === 0) {
  //     console.log("an url is required");
  //     exit(1);
  //   }
  //   const url = args[0];

  const feedURL = "https://www.wagslane.dev/index.xml";

  const feedData = await fetchFeed(feedURL);
  const feedDataStr = JSON.stringify(feedData, null, 2);
  console.dir(feedDataStr);
}
