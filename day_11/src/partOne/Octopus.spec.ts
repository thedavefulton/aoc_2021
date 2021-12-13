import { Octopus } from "./Octopus";

test("increment", () => {
  const octopus = new Octopus(0, 0, 8);
  octopus.increment();
  expect(octopus.energy).toBe(9);
  expect(octopus.flashed).toBe(false);

  octopus.increment();
  expect(octopus.energy).toBe(0);
  expect(octopus.flashed).toBe(true);

  octopus.increment();
  expect(octopus.energy).toBe(0);
});

test("reset", () => {
  const octopus = new Octopus(0, 0, 9);
  octopus.increment();
  expect(octopus.flashed).toBe(true);
  octopus.reset();
  expect(octopus.flashed).toBe(false);
});
