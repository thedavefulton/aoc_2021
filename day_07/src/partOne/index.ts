import { max, min, range, shout } from "../utils";

export function findEnds(crabs: number[]) {
  return [min(crabs), max(crabs)];
}

export function calculateFuel(crab: number, target: number) {
  return crab <= target ? target - crab : crab - target;
}

export function calculateOption(crabs: number[], option: number) {
  return crabs
    .map((crab) => calculateFuel(crab, option))
    .reduce((acc, cur) => acc + cur);
}

export const partOneShout = (crabs: number[]) => {
  const [start, end] = findEnds(crabs);
  const options = range(start, end);
  const lowestCost = options
    .map((option) => calculateOption(crabs, option))
    .reduce((acc, cur) => min([acc, cur]));

  shout(lowestCost);
};
