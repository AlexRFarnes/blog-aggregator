import { exit } from "node:process";
import { deleteAllUsers } from "./db/queries/users";

export async function reset(commandName: string, ...args: string[]) {
  const wasSuccessful = await deleteAllUsers();
  if (wasSuccessful) {
    console.log("all entries deleted from users table");
    return;
  }
}
