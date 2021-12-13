import { shout } from "../utils";
import { Octopus } from "./Octopus";
import { OctoGrid } from "./OctoGrid";

export const sum = (...a: number[]) => a.reduce((acc, val) => acc + val, 0);

export const partOneShout = async (input = [] as string[]) => {
  const res = new OctoGrid(input);
  console.log(res.flashes);
  // shout("Hello from Part One!");
  // shout(input.toString());
};
