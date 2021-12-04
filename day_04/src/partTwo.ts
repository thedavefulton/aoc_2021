import { readFile, shout } from './utils';
import { BingoBot } from './partOne/BingoBot';

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partTwoShout = async () => {
  const lines = await readFile();
  const bot = new BingoBot(lines);

  shout(bot.calculateLastScore());
};
