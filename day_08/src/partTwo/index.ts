import { shout } from "../utils";
import { Display } from "./Display";

export const partTwoShout = (entries: string[][][]) => {
  const displays = entries
    .map((entry) => new Display(entry))
    .map((display) => display.output)
    .map((display) => parseInt(display))
    .reduce((acc, cur) => acc + cur);
  console.log(displays);
};
