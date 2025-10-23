import { exit } from "node:process";
import { setUser } from "./config";

export async function handlerLogin(commandName: string, ...args: string[]) {
  if (args.length === 0) {
    console.log("username is required");
    exit(1);
  }
  setUser(args[0]);
  console.log(`the user has been set`);
}
