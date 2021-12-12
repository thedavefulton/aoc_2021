import { loadEntries } from "../utils";
import { Display } from "./Display";

const entry = [
  [
    "acedgfb",
    "cdfbe",
    "gcdfa",
    "fbcad",
    "dab",
    "cefabd",
    "cdfgeb",
    "eafb",
    "cagedb",
    "ab",
  ],
  ["cdfeb", "fcadb", "cdfeb", "cdbaf"],
];

test("orderNumberString", () => {
  const display = new Display(entry);
  expect(display.inputs[0]).toBe("abcdefg");
});

test("getOverlap", () => {
  const display = new Display(entry);
  expect(display.getOverlap("abcd", "bcde")).toBe(3);
});

test.skip("stepOne", () => {
  const display = new Display(entry);

  // expect(display.digits[1]).toBe("ab");
  // expect(display.digits[4]).toBe("abef");
  // expect(display.digits[7]).toBe("abd");
  // expect(display.digits[8]).toBe("abcdefg");
  //
  // expect(display.digits[0]).toBe("abcdeg");
  //
  // expect(display.digits[5]).toBe("bcdef");
  // expect(display.digits[2]).toBe("acdfg");
  // expect(display.digits[3]).toBe("abcdf");
  // expect(display.digits[6]).toBe("bcdefg");
  // expect(display.digits[9]).toBe("abcdef");

  // expect(display.decodeOutput("cdfeb")).toBe("5");
  // expect(display.decodeOutput("fcadb")).toBe("3");
  // expect(display.decodeOutput("cdfeb")).toBe("5");
  // expect(display.decodeOutput("cdbaf")).toBe("3");
});
