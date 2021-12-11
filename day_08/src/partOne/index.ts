import { shout } from "../utils";
import collect from "collect.js/dist";
import { difference } from "lodash";
import { uniqueDigits } from "../index";

export const partOneShout = async (inputs = [] as string[][][]) => {
  const uniqueLengths = uniqueDigits.map((dig) => dig.length);
  // console.log(uniqueLengths);
  const res = inputs
    .map(([, display]) => display)
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((digit) => uniqueLengths.includes(digit.length));

  shout(res.length);
  // shout(input.toString());
};
