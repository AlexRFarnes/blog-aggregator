import { exit } from "node:process";

export type CommandsRegistry = Record<string, CommandHandler>;

export type CommandHandler = (
  commandName: string,
  ...args: string[]
) => Promise<void>;

export function registerCommand(
  registry: CommandsRegistry,
  commandName: string,
  handler: CommandHandler
) {
  registry[commandName] = handler;
}

export async function runCommand(
  registry: CommandsRegistry,
  commandName: string,
  ...args: string[]
) {
  const command = registry[commandName];

  if (!command) {
    console.log("command not recognized");
    exit(1);
  }

  command(commandName, ...args);
}
