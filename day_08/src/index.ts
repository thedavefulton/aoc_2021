import { partOneShout } from "./partOne";
import { partTwoShout } from "./partTwo";
import { loadEntries } from "./utils";

export type Segment = "a" | "b" | "c" | "d" | "e" | "f" | "g";

export const _1: Segment[] = ["c", "f"]; //2
export const _7: Segment[] = ["a", "c", "f"]; //3
export const _4: Segment[] = ["b", "c", "d", "f"]; //4

export const _2: Segment[] = ["a", "c", "d", "e", "g"]; //5
export const _5: Segment[] = ["a", "b", "d", "f", "g"]; //5
export const _3: Segment[] = ["a", "c", "d", "f", "g"]; //5

export const _9: Segment[] = ["a", "b", "c", "d", "f", "g"]; //6
export const _0: Segment[] = ["a", "b", "c", "e", "f", "g"]; //6
export const _6: Segment[] = ["a", "b", "d", "e", "f", "g"]; //6

export const _8: Segment[] = ["a", "b", "c", "d", "e", "f", "g"]; //7

export const uniqueDigits = [_1, _4, _7, _8];

async function main() {
  // const entries = await loadEntries(true);
  const entries = await loadEntries();
  // console.log(entries);

  // await partOneShout(entries);
  await partTwoShout(entries);
}

main();
