import { createUser, getUser } from "./db/queries/users";
import { setUser } from "./config";

export async function register(commandName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${commandName} <user_name>`);
  }

  const userName = args[0];

  const userExists = await getUser(userName);
  if (userExists) {
    throw new Error(`${userName} already registered`);
  }

  const user = await createUser(userName);

  if (!user) {
    throw new Error(`Error when trying to register ${userName}`);
  }

  setUser(user.name);

  console.log("User was created successfully");
  console.log(user);
}
