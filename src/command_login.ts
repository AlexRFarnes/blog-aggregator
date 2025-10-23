import { exit } from "node:process";
import { setUser } from "./config";
import { getUser } from "./db/queries/users";

export async function handlerLogin(commandName: string, ...args: string[]) {
  if (args.length === 0) {
    console.log("username is required");
    exit(1);
  }
  const userName = args[0];

  const user = await getUser(userName);

  if (!user) {
    console.log(`user doesn't exist`);
    exit(1);
  }

  setUser(user.name);

  console.log(`user ${user.name} has been set`);
}
