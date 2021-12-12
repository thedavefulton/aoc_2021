import { readTestFile } from "../utils";
import { LavaBot } from "./LavaBot";

const initBot = async () => {
  const lines = await readTestFile();
  return new LavaBot(lines);
};

test("riskLevel", async () => {
  const bot = await initBot();
  expect(bot.riskLevel).toBe(15);
});

test("isLowPoint", async () => {
  const bot = await initBot();
  expect(bot.isLowPoint(0, 1)).toBe(true);
  expect(bot.isLowPoint(0, 0)).toBe(false);
});

test("lavaBot length", async () => {
  const bot = await initBot();
  expect(bot.length).toBe(10);
});

test("lavaBot height", async () => {
  const bot = await initBot();
  expect(bot.height).toBe(5);
});

test("findAdjacentHeights", async () => {
  const bot = await initBot();
  expect(bot.findAdjacentHeights(0, 0)).toStrictEqual({
    above: "",
    below: "3",
    left: "",
    right: "1",
  });
  expect(bot.findAdjacentHeights(0, 9)).toStrictEqual({
    above: "",
    below: "1",
    left: "1",
    right: "",
  });
  expect(bot.findAdjacentHeights(4, 0)).toStrictEqual({
    above: "8",
    below: "",
    left: "",
    right: "8",
  });
  expect(bot.findAdjacentHeights(4, 9)).toStrictEqual({
    above: "9",
    below: "",
    left: "7",
    right: "",
  });
});
