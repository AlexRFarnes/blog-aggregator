import { argv, exit } from "node:process";
import type { CommandsRegistry } from "./commands";
import { registerCommand, runCommand } from "./commands";
import { login } from "./command_login";
import { register } from "./command_register";
import { reset } from "./command_reset";
import { getUsers } from "./command_users";

async function main() {
  const commands: CommandsRegistry = {};
  registerCommand(commands, "login", login);
  registerCommand(commands, "register", register);
  registerCommand(commands, "reset", reset);
  registerCommand(commands, "users", getUsers);

  const cliArgs = argv.slice(2);

  if (cliArgs.length === 0) {
    console.log("not enough arguments were provided");
    exit(1);
  }

  const commandName = cliArgs[0];
  const args = cliArgs.slice(1);

  await runCommand(commands, commandName, ...args);

  process.exit(0);
}

main();
