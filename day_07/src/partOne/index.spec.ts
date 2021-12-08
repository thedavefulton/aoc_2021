import { calculateFuel, calculateOption, findEnds } from "./index";
import { loadCrabs } from "../index";

test("findEnds", async () => {
  const crabs = await loadCrabs();
  expect(findEnds(crabs)).toStrictEqual([0, 16]);
});

test("calculateFuel", () => {
  expect(calculateFuel(0, 2)).toBe(2);
  expect(calculateFuel(2, 0)).toBe(2);
});

test("calculateOption", async () => {
  const crabs = await loadCrabs();
  expect(calculateOption(crabs, 2)).toBe(37);
});
