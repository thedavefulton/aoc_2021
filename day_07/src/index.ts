import { partOneShout } from "./partOne";
import { partTwoShout } from "./partTwo";
import { loadCrabs, readFile, readTestFile } from "./utils";

async function main() {
  const crabs = await loadCrabs();
  partOneShout(crabs);
  partTwoShout(crabs);
}

main();
