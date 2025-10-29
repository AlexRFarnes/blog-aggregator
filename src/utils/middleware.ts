import { CommandHandler } from "./../commands/commands";
import { getCurrentUser } from "src/config";
import { getUser } from "src/db/queries/users";
import { User } from "src/db/schema/schema";

type UserCommandHandler = (
  commandName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

type MiddlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function middlewareLoggedIn(fn: UserCommandHandler): CommandHandler {
  return async (commandName: string, ...args: string[]) => {
    const currentUser = getCurrentUser();
    const user = await getUser(currentUser);

    if (!user) {
      throw new Error(`User ${currentUser} not found`);
    }

    return fn(commandName, user, ...args);
  };
}
