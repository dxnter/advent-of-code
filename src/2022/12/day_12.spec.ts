import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_12';

const EXAMPLE = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const input = getInputForDate({ year: '2022', day: '12' });

describe('2022 - Day 12', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(31);
    });

    it('input', () => {
      expect(part1(input)).to.equal(504);
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(29);
    });

    it('input', () => {
      expect(part2(input)).to.equal(500);
    });
  });
});
