import { exit } from "node:process";

export type CommandsRegistry = Record<string, CommandHandler>;

export type CommandHandler = (commandName: string, ...args: string[]) => void;

export function registerCommand(
  registry: CommandsRegistry,
  commandName: string,
  handler: CommandHandler
) {
  registry[commandName] = handler;
}

export function runCommand(
  registry: CommandsRegistry,
  commandName: string,
  ...args: string[]
) {
  if (!registry[commandName]) {
    console.log("command not recognized");
    exit(1);
  }

  registry[commandName](commandName, ...args);
}
