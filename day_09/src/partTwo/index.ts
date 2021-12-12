import { shout } from "../utils";
import { LavaBot } from "./LavaBot";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partTwoShout = async (input = [] as string[]) => {
  // console.log(input);
  const bot = new LavaBot(input);
  // console.log(bot.points);
  shout(bot.basinScore);
};
