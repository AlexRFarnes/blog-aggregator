import type { User } from "../db/schema/schema";
import { getAllUsers } from "../db/queries/users";
import { getCurrentUser } from "../config";
import { setUser } from "../config";
import { createUser, getUser } from "../db/queries/users";

export async function handlerListUsers(commandName: string, ...args: string[]) {
  const users: User[] = await getAllUsers();

  const currentUser = getCurrentUser();

  for (const user of users) {
    if (user.name === currentUser) {
      console.log(`* ${user.name} (current)`);
      continue;
    }
    console.log(`* ${user.name}`);
  }
}

export async function handlerLogin(commandName: string, ...args: string[]) {
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

export async function handlerRegister(commandName: string, ...args: string[]) {
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
