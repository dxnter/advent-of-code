import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_01';

const EXAMPLE = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const input = getInputForDate({ year: '2022', day: '01' });

describe('2022 - Day 1', () => {
  describe('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(24000);
    });

    it('input', () => {
      expect(part1(input)).to.equal(70296);
    });
  });

  describe('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(45000);
    });

    it('input', () => {
      expect(part2(input)).to.equal(205381);
    });
  });
});
