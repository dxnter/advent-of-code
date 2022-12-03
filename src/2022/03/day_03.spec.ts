import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_03';

const EXAMPLE = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const input = getInputForDate({ year: '2022', day: '03' });

describe('2022 - Day 03', () => {
  describe('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(157);
    });

    it('input', () => {
      expect(part1(input)).to.equal(8072);
    });
  });

  describe('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(70);
    });

    it('input', () => {
      expect(part2(input)).to.equal(2567);
    });
  });
});
