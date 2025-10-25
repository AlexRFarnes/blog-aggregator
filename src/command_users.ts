import type { SelectUser } from "./db/schema";
import { exit } from "process";
import { getAllUsers } from "./db/queries/users";
import { getCurrentUser } from "./config";

export async function getUsers(commandName: string, ...args: string[]) {
  const users: SelectUser[] = await getAllUsers();

  if (users.length === 0) {
    console.log("no register users were found");
    exit(0);
  }
  const currentUser = getCurrentUser();

  for (const user of users) {
    if (user.name === currentUser) {
      console.log(`* ${user.name} (current)`);
      continue;
    }
    console.log(`* ${user.name}`);
  }
}
