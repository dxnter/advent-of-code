import { descend, map, pipe, product, prop, sort, take } from 'ramda';

export class Monkey {
  public inspections: number;

  constructor(
    public id: number,
    public items: number[],
    public operation: Operation,
    public test: Test,
  ) {
    this.inspections = 0;
  }

  calculateNewWorryLevel(item: number): number {
    if (!this.operation.value) return item * item;
    if (this.operation.operator === '+') return item + this.operation.value;
    if (this.operation.operator === '*') return item * this.operation.value;
    return item;
  }

  inspectItem(item: number, divisor?: number): number {
    this.inspections++;

    return divisor
      ? this.calculateNewWorryLevel(item % divisor)
      : Math.floor(this.calculateNewWorryLevel(item) / 3);
  }

  testItem(item: number): number {
    return item % this.test.divisor === 0
      ? this.test.throw.onSuccess
      : this.test.throw.onFail;
  }
}

export function part1(input: Monkey[]) {
  for (let i = 0; i < 20; i++) {
    input.forEach((monkey) => {
      monkey.items.forEach((item) => {
        const newWorryLevel = monkey.inspectItem(item);
        const throwTo = monkey.testItem(newWorryLevel);

        input[throwTo].items.push(newWorryLevel);
      });
      monkey.items = [];
    });
  }

  return pipe(
    sort(descend<Monkey>(prop('inspections'))),
    take(2),
    map((monkey: Monkey) => monkey.inspections),
    product,
  )(input);
}

export function part2(input: Monkey[]) {
  const divisor = product(input.map((m) => m.test.divisor));
  for (let i = 0; i < 10000; i++) {
    input.forEach((monkey) => {
      monkey.items.forEach((item) => {
        const newWorryLevel = monkey.inspectItem(item, divisor);
        const throwTo = monkey.testItem(newWorryLevel);

        input[throwTo].items.push(newWorryLevel);
      });
      monkey.items = [];
    });
  }

  return pipe(
    sort(descend<Monkey>(prop('inspections'))),
    take(2),
    map((monkey: Monkey) => monkey.inspections),
    product,
  )(input);
}
