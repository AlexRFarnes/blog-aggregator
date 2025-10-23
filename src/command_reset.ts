import { exit } from "node:process";
import { deleteAllUsers } from "./db/queries/users";

export async function handleReset(commandName: string, ...args: string[]) {
  const wasSuccessful = await deleteAllUsers();
  if (wasSuccessful) {
    console.log("all entries deleted from users table");
    return;
  }
  console.log("something went wrong when trying to reset the table");
  exit(1);
}
