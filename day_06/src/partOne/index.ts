import { readFile, readTestFile, shout } from "../utils";
import { School } from "./School";

export function ageFish(fish: number) {
  return fish > 0 ? fish - 1 : 6;
}

export const partOneShout = async () => {
  const [input] = await readFile();
  const fish = input.split(",").map((fish) => parseInt(fish));
  const school = new School(fish, 80);

  shout(school.fish.length);
};
