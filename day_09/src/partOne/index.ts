import { shout } from "../utils";
import { LavaBot } from "./LavaBot";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partOneShout = async (input = [] as string[]) => {
  const bot = new LavaBot(input);
  shout(bot.riskLevel);
};
