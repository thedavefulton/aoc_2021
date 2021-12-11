import { loadEntries } from "../utils";
import { Display } from "./Display";

const entry = [
  "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab",
  "cdfeb fcadb cdfeb cdbaf",
];

test("stepOne", () => {
  const display = new Display(entry);

  expect(display.digits._1).toBe("ab");
  expect(display.digits._4).toBe("abef");
  expect(display.digits._7).toBe("abd");
  expect(display.digits._8).toBe("abcdefg");

  expect(display.digits._0).toBe("abcdeg");

  expect(display.digits._5).toBe("bcdef");
  expect(display.digits._2).toBe("acdfg");
  expect(display.digits._3).toBe("abcdf");
  expect(display.digits._6).toBe("bcdefg");
  expect(display.digits._9).toBe("abcdef");

  // expect(display.decodeOutput("cdfeb")).toBe("5");
  // expect(display.decodeOutput("fcadb")).toBe("3");
  // expect(display.decodeOutput("cdfeb")).toBe("5");
  // expect(display.decodeOutput("cdbaf")).toBe("3");
});
