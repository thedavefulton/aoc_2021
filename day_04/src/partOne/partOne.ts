import { readFile, shout } from '../utils';
import { BingoBot } from './BingoBot';

export const partOneShout = async () => {
  const lines = await readFile();
  const bot = new BingoBot(lines);

  shout(bot.calculateScore());
};
