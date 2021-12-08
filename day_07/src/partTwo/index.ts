import { min, range, shout } from "../utils";
import { findEnds } from "../partOne";

export function calculateFuel(crab: number, target: number) {
  const distance = Math.abs(target - crab);
  return range(1, distance).reduce((acc, cur) => acc + cur, 0);
}

export function calculateOption(crabs: number[], option: number) {
  return crabs
    .map((crab) => calculateFuel(crab, option))
    .reduce((acc, cur) => acc + cur);
}

export const partTwoShout = (crabs: number[]) => {
  const [start, end] = findEnds(crabs);
  const options = range(start, end);
  const lowestCost = options
    .map((option) => calculateOption(crabs, option))
    .reduce((acc, cur) => min([acc, cur]));

  shout(lowestCost);
};
