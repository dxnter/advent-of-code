import { Monkey } from './day_11';

export default [
  new Monkey(
    0,
    [59, 65, 86, 56, 74, 57, 56],
    { operator: '*', value: 17 },
    {
      divisor: 3,
      throw: { onSuccess: 3, onFail: 6 },
    },
  ),
  new Monkey(
    1,
    [63, 83, 50, 63, 56],
    { operator: '+', value: 2 },
    {
      divisor: 13,
      throw: { onSuccess: 3, onFail: 0 },
    },
  ),
  new Monkey(
    2,
    [93, 79, 74, 55],
    { operator: '+', value: 1 },
    {
      divisor: 2,
      throw: { onSuccess: 0, onFail: 1 },
    },
  ),
  new Monkey(
    3,
    [86, 61, 67, 88, 94, 69, 56, 91],
    { operator: '+', value: 7 },
    {
      divisor: 11,
      throw: { onSuccess: 6, onFail: 7 },
    },
  ),
  new Monkey(
    4,
    [76, 50, 51],
    { operator: '^2' },
    {
      divisor: 19,
      throw: { onSuccess: 2, onFail: 5 },
    },
  ),
  new Monkey(
    5,
    [77, 76],
    { operator: '+', value: 8 },
    {
      divisor: 17,
      throw: { onSuccess: 2, onFail: 1 },
    },
  ),
  new Monkey(
    6,
    [74],
    { operator: '*', value: 2 },
    {
      divisor: 5,
      throw: { onSuccess: 4, onFail: 7 },
    },
  ),
  new Monkey(
    7,
    [86, 85, 52, 86, 91, 95],
    { operator: '+', value: 6 },
    {
      divisor: 7,
      throw: { onSuccess: 4, onFail: 5 },
    },
  ),
];
