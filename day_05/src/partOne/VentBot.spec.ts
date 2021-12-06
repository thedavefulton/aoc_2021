import { readTestFile } from '../utils';
import { VentBot } from './VentBot';

test('vent bot correctly parses input', async () => {
  const lines = await readTestFile();
  const bot = new VentBot(lines);

  expect(bot.partOneLines.length).toBe(6);
});
