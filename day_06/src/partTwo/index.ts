import { readFile, readTestFile, shout } from "../utils";
import { SmartPond } from "./SmartPond";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partTwoShout = async () => {
  const [input] = await readFile();
  const fish = input.split(",").map((fish) => parseInt(fish));
  const pond = new SmartPond(fish, 256);

  shout(pond.fishCount);
};
