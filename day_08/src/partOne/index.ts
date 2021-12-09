import { shout } from "../utils";
import collect from "collect.js/dist";
import { difference } from "lodash";

export type Segment = "a" | "b" | "c" | "d" | "e" | "f" | "g";

export const _0: Segment[] = ["a", "b", "c", "e", "f", "g"]; //6
export const _1: Segment[] = ["c", "f"]; //2
export const _2: Segment[] = ["a", "c", "d", "e", "g"]; //5
export const _3: Segment[] = ["a", "c", "d", "f", "g"]; //5
export const _4: Segment[] = ["b", "c", "d", "f"]; //4
export const _5: Segment[] = ["a", "b", "d", "f", "g"]; //5
export const _6: Segment[] = ["a", "b", "d", "e", "f", "g"]; //6
export const _7: Segment[] = ["a", "c", "f"]; //3
export const _8: Segment[] = ["a", "b", "c", "d", "e", "f", "g"]; //7
export const _9: Segment[] = ["a", "b", "c", "d", "f", "g"]; //6

export const uniqueDigits = [_1, _4, _7, _8];

export const partOneShout = async (input = [] as string[][]) => {
  const uniqueLengths = uniqueDigits.map((dig) => dig.length);

  const res = input
    .map(([, digitString]) => digitString)
    .map((digitString) => digitString.split(" "))
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((digitString) => uniqueLengths.includes(digitString.length)).length;
  console.log(res);
  // shout(input);
  // shout(input.toString());
};
