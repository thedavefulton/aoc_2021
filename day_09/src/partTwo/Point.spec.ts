import { Point } from "./Point";

test("toString", () => {
  const point = new Point(0, 0, 0);
  expect(point.toString()).toBe("0:0");
});

test("get coords", () => {
  const point = new Point(0, 1, 0);
  expect(point.coords).toStrictEqual([1, 0]);
});
