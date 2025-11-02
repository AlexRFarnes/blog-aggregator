import { getPostsForUser } from "src/db/queries/posts";
import type { User } from "src/db/schema/schema";

export async function handlerBrowse(
  commandName: string,
  user: User,
  ...args: string[]
) {
  if (args.length > 1) {
    throw new Error(`usage: ${commandName} <optional: limit>`);
  }

  let limit = 2;
  if (args.length === 1) {
    const trimmed = args[0].trim();

    if (trimmed === "" || isNaN(Number(trimmed))) {
      throw new Error(`usage: ${commandName} [limit]`);
    }
    limit = Math.trunc(Number(trimmed));
  }

  const posts = await getPostsForUser(user, limit);

  console.log(`Getting ${limit} posts...`);
  for (const { name, title, url, description } of posts) {
    console.log(`${name}`);
    console.log(`    - ${title}`);
    console.log(`    - ${url}`);
    console.log(`    - ${description}`);
    console.log("---------------------------------\n");
  }
}
