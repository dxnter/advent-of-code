import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_04';

const EXAMPLE = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const input = getInputForDate({ year: '2022', day: '04' });

describe('2022 - Day 04', () => {
  describe('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(2);
    });

    it('input', () => {
      expect(part1(input)).to.equal(573);
    });
  });

  describe('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(4);
    });

    it('input', () => {
      expect(part2(input)).to.equal(867);
    });
  });
});
