import { argv, exit } from "node:process";
import type { CommandsRegistry } from "./commands";
import { registerCommand, runCommand } from "./commands";
import { handlerLogin } from "./command_login";

async function main() {
  const commands: CommandsRegistry = {};
  registerCommand(commands, "login", handlerLogin);
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
