import { setUser } from "./config";
import { getUser } from "./db/queries/users";

export async function login(commandName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${commandName} <user_name>`);
  }
  const userName = args[0];

  const registeredUser = await getUser(userName);

  if (!registeredUser) {
    throw new Error(`user ${userName} not found`);
  }

  setUser(registeredUser.name);

  console.log("User switched successfully!");
}
