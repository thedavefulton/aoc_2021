import { partOneShout } from "./partOne";
import { partTwoShout } from "./partTwo";
import { readFile, readTestFile } from "./utils";

export async function loadCrabs() {
  // const lines = await readTestFile();
  const lines = await readFile();

  return lines[0].split(",").map((crab) => parseInt(crab));
}

async function main() {
  const crabs = await loadCrabs();
  partOneShout(crabs);
  partTwoShout();
}

main();
