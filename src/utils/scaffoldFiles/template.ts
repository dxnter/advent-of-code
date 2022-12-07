interface PuzzleTemplate {
  [key: string]: (yearNumber: string, dayNumber: string) => string;
}

export const createTemplate: PuzzleTemplate = {
  solution: () => `export function part1(input: string) {
  return true;
}

export function part2(input: string) {
  return true;
}

`,
  test: (
    yearNumber: string,
    dayNumber: string,
  ) => `import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_${dayNumber}';

const EXAMPLE = \`\`;

const input = getInputForDate({ year: '${yearNumber}', day: '${dayNumber}' });

describe('${yearNumber} - Day ${dayNumber}', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(true);
    });

    it('input', () => {
      expect(part1(input)).to.equal(true);
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(true);
    });

    it('input', () => {
      expect(part2(input)).to.equal(true);
    });
  });
});
`,
  benchmark: (
    yearNumber: string,
    dayNumber: string,
  ) => `import { bench } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_${dayNumber}';

const input = getInputForDate({ year: '${yearNumber}', day: '${dayNumber}' });

bench(
  '${yearNumber} - Day ${dayNumber} - Part 1',
  () => {
    part1(input);
  },
  { time: 1000 },
);

bench(
  '${yearNumber} - Day ${dayNumber} - Part 2',
  () => {
    part2(input);
  },
  { time: 1000 },
);
`,
  input: () => '',
};
