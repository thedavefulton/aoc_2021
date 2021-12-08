import { calculateFuel } from "./index";

test("calculateFuel", () => {
  expect(calculateFuel(16, 5)).toBe(66);
});
