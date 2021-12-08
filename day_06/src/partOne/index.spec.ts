import { ageFish } from "./index";

test("ageFish", () => {
  expect(ageFish(3)).toBe(2);
  expect(ageFish(2)).toBe(1);
  expect(ageFish(1)).toBe(0);
  expect(ageFish(0)).toBe(6);
});
