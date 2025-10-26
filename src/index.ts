import { argv, exit } from "node:process";
import type { CommandsRegistry } from "./commands";
import { registerCommand, runCommand } from "./commands";
import { login } from "./command_login";
import { register } from "./command_register";
import { reset } from "./command_reset";
import { getUsers } from "./command_users";
import { aggregate } from "./command_aggregate";

async function main() {
  const commands: CommandsRegistry = {};
  registerCommand(commands, "login", login);
  registerCommand(commands, "register", register);
  registerCommand(commands, "reset", reset);
  registerCommand(commands, "users", getUsers);
  registerCommand(commands, "agg", aggregate);

  const cliArgs = argv.slice(2);

  if (cliArgs.length < 1) {
    console.log("not enough arguments were provided");
    console.log("usage: cli <command> [args...]");
    exit(1);
  }

  const commandName = cliArgs[0];
  const args = cliArgs.slice(1);

  try {
    await runCommand(commands, commandName, ...args);
  } catch (err) {
    console.error(
      `Error running command ${commandName}: ${(err as Error).message}`
    );
    exit(1);
  }

  process.exit(0);
}

main();
