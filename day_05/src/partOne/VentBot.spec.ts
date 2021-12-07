import { readTestFile } from '../utils';
import { VentBot } from './VentBot';

test('vent bot correctly parses input', async () => {
  const lines = await readTestFile();
  const bot = new VentBot(lines);

  expect(bot.lines.length).toBe(6);
});

test('overlappingPoints', async () => {
  const lines = await readTestFile();
  const bot = new VentBot(lines);

  expect(bot.overlappingPoints.length).toBe(5);
});
