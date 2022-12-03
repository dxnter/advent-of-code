import { bench } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_03';

const input = getInputForDate({ year: '2022', day: '03' });

bench(
  '2022 - Day 03 - Part 1',
  () => {
    part1(input);
  },
  { time: 1000 },
);

bench(
  '2022 - Day 03 - Part 2',
  () => {
    part2(input);
  },
  { time: 1000 },
);
