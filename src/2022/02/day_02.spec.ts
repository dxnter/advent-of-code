import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_02';

const EXAMPLE = `A Y
B X
C Z`;

const input = getInputForDate({ year: '2022', day: '02' });

describe('2022 - Day 02', () => {
  describe('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(15);
    });

    it('input', () => {
      expect(part1(input)).to.equal(14163);
    });
  });

  describe('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(12);
    });

    it('input', () => {
      expect(part2(input)).to.equal(12091);
    });
  });
});
