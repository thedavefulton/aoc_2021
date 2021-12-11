import { shout } from "../utils";
import { Display } from "./Display";

export const partTwoShout = (entries: string[][][]) => {
  console.log(entries);
  const parsedEntries = entries
    .map((entry) => {
      const parsedParts = entry.map((part) => {
        console.log(part.join(" "));
        return part.join(" ");
      });
      return parsedParts;
    })
    .map((parts) => {
      console.log(parts);
      return parts;
    });

  // console.log(parsedEntries);
};
