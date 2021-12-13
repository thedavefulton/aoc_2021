import { readTestFile } from "../utils";
import { OctoGrid } from "./OctoGrid";

async function initOctoGrid() {
  const lines = await readTestFile();
  return new OctoGrid(lines);
}

test("findSurroundingOctos", async () => {
  const grid = await initOctoGrid();

  expect(grid.findSurroundingOctos(grid.octos[1][1])).toStrictEqual({
    above: grid.octos[0][1],
    below: grid.octos[2][1],
    left: grid.octos[1][0],
    right: grid.octos[1][2],
    aboveLeft: grid.octos[0][0],
    aboveRight: grid.octos[0][2],
    belowLeft: grid.octos[2][0],
    belowRight: grid.octos[2][2],
  });
});

test("findAdjacentOctos", async () => {
  const grid = await initOctoGrid();

  expect(grid.findAdjacentOctos(grid.octos[0][0])).toStrictEqual({
    above: null,
    below: grid.octos[1][0],
    left: null,
    right: grid.octos[0][1],
  });
  expect(grid.findAdjacentOctos(grid.octos[0][9])).toStrictEqual({
    above: null,
    below: grid.octos[1][9],
    left: grid.octos[0][8],
    right: null,
  });
  expect(grid.findAdjacentOctos(grid.octos[9][9])).toStrictEqual({
    above: grid.octos[8][9],
    below: null,
    left: grid.octos[9][8],
    right: null,
  });
  expect(grid.findAdjacentOctos(grid.octos[9][0])).toStrictEqual({
    above: grid.octos[8][0],
    below: null,
    left: null,
    right: grid.octos[9][1],
  });
});

test("findDiagonalOctos", async () => {
  const grid = await initOctoGrid();

  expect(
    grid.findDiagonalOctos(grid.findAdjacentOctos(grid.octos[0][0]))
  ).toStrictEqual({
    aboveLeft: null,
    aboveRight: null,
    belowLeft: null,
    belowRight: grid.octos[1][1],
  });
  expect(
    grid.findDiagonalOctos(grid.findAdjacentOctos(grid.octos[0][9]))
  ).toStrictEqual({
    aboveLeft: null,
    aboveRight: null,
    belowLeft: grid.octos[1][8],
    belowRight: null,
  });
  expect(
    grid.findDiagonalOctos(grid.findAdjacentOctos(grid.octos[9][9]))
  ).toStrictEqual({
    aboveLeft: grid.octos[8][8],
    aboveRight: null,
    belowLeft: null,
    belowRight: null,
  });
  expect(
    grid.findDiagonalOctos(grid.findAdjacentOctos(grid.octos[9][0]))
  ).toStrictEqual({
    aboveLeft: null,
    aboveRight: grid.octos[8][1],
    belowLeft: null,
    belowRight: null,
  });
});
