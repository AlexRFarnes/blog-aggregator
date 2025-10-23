import { argv, exit } from "node:process";
import type { CommandsRegistry } from "./commands";
import { registerCommand, runCommand } from "./commands";
import { handleLogin } from "./command_login";
import { handleRegister } from "./command_register";
import { handleReset } from "./command_reset";

async function main() {
  const commands: CommandsRegistry = {};
  registerCommand(commands, "login", handleLogin);
  registerCommand(commands, "register", handleRegister);
  registerCommand(commands, "reset", handleReset);

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
