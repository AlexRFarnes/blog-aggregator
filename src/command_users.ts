import type { User } from "./db/schema/schema";
import { getAllUsers } from "./db/queries/users";
import { getCurrentUser } from "./config";

export async function getUsers(commandName: string, ...args: string[]) {
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
