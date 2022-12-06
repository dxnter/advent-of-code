import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_06';

const EXAMPLE = `bvwbjplbgvbhsrlpgdmjqwftvncz`;

const input = getInputForDate({ year: '2022', day: '06' });

describe('2022 - Day 06', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(5);
    });

    it('input', () => {
      expect(part1(input)).to.equal(1300);
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(23);
    });

    it('input', () => {
      expect(part2(input)).to.equal(3986);
    });
  });
});
