import { readTestFile } from "../utils";
import { LavaBot } from "./LavaBot";

const initBot = async () => {
  const lines = await readTestFile();
  return new LavaBot(lines);
};

test("basinScore", async () => {
  const bot = await initBot();
  const points = bot.points;
  expect(bot.basinScore).toBe(1134);
});

test("mapBasin", async () => {
  const bot = await initBot();
  const points = bot.points;
  expect(bot.basins[0].length).toBe(3);
  expect(bot.basins[1].length).toBe(9);
  expect(bot.basins[2].length).toBe(14);
  expect(bot.basins[3].length).toBe(9);
});

test("findNonBoundaryAdjacentPoints", async () => {
  const bot = await initBot();
  const points = bot.points;
  expect(bot.findNonBoundaryAdjacentPoints(points[0][1])).toStrictEqual([
    points[0][0],
  ]);
  expect(bot.findNonBoundaryAdjacentPoints(points[0][0])).toStrictEqual([
    points[1][0],
    points[0][1],
  ]);
  expect(bot.findNonBoundaryAdjacentPoints(points[1][0])).toStrictEqual([
    points[0][0],
  ]);
});

test("riskLevel", async () => {
  const bot = await initBot();
  expect(bot.riskLevel).toBe(15);
});

test("get lowPoints", async () => {
  const bot = await initBot();
  expect(bot.lowPoints.map((point) => point.toString())).toStrictEqual([
    "0:1",
    "0:9",
    "2:2",
    "4:6",
  ]);
});

test("markLowPoints", async () => {
  const bot = await initBot();
  const points = bot.points;
  expect(points[0][1].isLowPoint).toBe(true);
  expect(points[0][9].isLowPoint).toBe(true);
  expect(points[2][2].isLowPoint).toBe(true);
  expect(points[4][6].isLowPoint).toBe(true);
  expect(points[0][0].isLowPoint).toBe(false);
});

test("isLowPoint", async () => {
  const bot = await initBot();
  const points = bot.points;
  expect(bot.isLowPoint(points[0][1])).toBe(true);
  expect(bot.isLowPoint(points[0][0])).toBe(false);
});

test("lavaBot length", async () => {
  const bot = await initBot();
  expect(bot.length).toBe(10);
});

test("lavaBot height", async () => {
  const bot = await initBot();
  expect(bot.height).toBe(5);
});

test("findAdjacentPoints", async () => {
  const bot = await initBot();
  const points = bot.points;

  expect(bot.findAdjacentPoints(points[0][0])).toStrictEqual({
    above: null,
    below: points[1][0],
    left: null,
    right: points[0][1],
  });
  expect(bot.findAdjacentPoints(points[0][9])).toStrictEqual({
    above: null,
    below: points[1][9],
    left: points[0][8],
    right: null,
  });
  expect(bot.findAdjacentPoints(points[4][0])).toStrictEqual({
    above: points[3][0],
    below: null,
    left: null,
    right: points[4][1],
  });
  expect(bot.findAdjacentPoints(points[4][9])).toStrictEqual({
    above: points[3][9],
    below: null,
    left: points[4][8],
    right: null,
  });
});
