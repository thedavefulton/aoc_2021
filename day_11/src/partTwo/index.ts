import { shout } from "../utils";
import { OctoGrid } from "../partOne/OctoGrid";
const chalk = require("chalk");

export const partTwoShout = async (input = [] as string[]) => {
  const grid = new OctoGrid(input);
  shout(chalk.red(grid.findSyncStep()));
  shout("Hello from Part Two!");
  // shout(input.toString());
};
