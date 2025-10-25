import { exit } from "node:process";
import { createUser, getUser } from "./db/queries/users";
import { setUser } from "./config";

export async function register(commandName: string, ...args: string[]) {
  if (args.length === 0) {
    console.log("username is required");
    exit(1);
  }

  const userName = args[0];

  const userExists = await getUser(userName);
  if (userExists) {
    console.log("user already exists");
    exit(1);
  }

  const user = await createUser(userName);

  setUser(user.name);

  console.log("user was created successfully");
  console.log(user);
}
