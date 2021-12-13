import { partOneShout } from "./partOne";
import { partTwoShout } from "./partTwo";
import { readFile, readTestFile } from "./utils";

async function main() {
  // const lines = await readTestFile();
  const lines = await readFile();
  await partOneShout(lines);
  await partTwoShout();
}

main();
