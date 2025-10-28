import { argv, exit } from "node:process";
import type { CommandsRegistry } from "./commands/commands";
import { registerCommand, runCommand } from "./commands/commands";
import { handlerReset } from "./commands/reset";
import {
  handlerListUsers,
  handlerLogin,
  handlerRegister,
} from "./commands/users";
import { handlerAggregate } from "./commands/aggregate";
import { handlerAddFeed, handlerListFeeds } from "./commands/feeds";
import { handlerFollow, getFeedFollowsForUser } from "./commands/follow";

async function main() {
  const commands: CommandsRegistry = {};
  registerCommand(commands, "login", handlerLogin);
  registerCommand(commands, "register", handlerRegister);
  registerCommand(commands, "reset", handlerReset);
  registerCommand(commands, "users", handlerListUsers);
  registerCommand(commands, "agg", handlerAggregate);
  registerCommand(commands, "addfeed", handlerAddFeed);
  registerCommand(commands, "feeds", handlerListFeeds);
  registerCommand(commands, "follow", handlerFollow);
  registerCommand(commands, "following", getFeedFollowsForUser);

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
