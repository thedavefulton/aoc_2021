import { calculateFuel, calculateOption, findEnds } from "./index";
import { loadTestCrabs } from "../utils";

test("findEnds", async () => {
  const crabs = await loadTestCrabs();
  expect(findEnds(crabs)).toStrictEqual([0, 16]);
});

test("calculateFuel", () => {
  expect(calculateFuel(0, 2)).toBe(2);
  expect(calculateFuel(2, 0)).toBe(2);
});

test("calculateOption", async () => {
  const crabs = await loadTestCrabs();
  expect(calculateOption(crabs, 2)).toBe(37);
});
