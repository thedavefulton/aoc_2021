import { shout } from "../utils";
import { closesPointsMap, SyntaxChecker } from "./SyntaxChecker";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partOneShout = async (input = [] as string[]) => {
  // shout("Hello from Part One!");
  const res = input
    .map((line) => new SyntaxChecker(line))
    .map((syn) => {
      syn.check();
      return syn;
    })
    .filter((syn) => !syn.error)
    .map((syn) => syn.score)
    .sort((a, b) => a - b);

  shout(res[Math.floor(res.length / 2)]);
};
