import { partOneShout } from "./partOne";
import { partTwoShout } from "./partTwo";
import { loadEntries } from "./utils";

async function main() {
  const entries = await loadEntries();

  await partOneShout(entries);
  // partTwoShout();
}

main();
