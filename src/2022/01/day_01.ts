export function part1(input: string): number {
  const sortedTotalCaloriesPerElf = input
    .split('\n\n')
    .map((elf) =>
      elf
        .split(/\r?\n/)
        .map(Number)
        .reduce((sum, val) => sum + val),
    )
    .sort((a, b) => b - a);

  return sortedTotalCaloriesPerElf.at(0) || 0;
}

export function part2(input: string): number {
  const sortedTotalCaloriesPerElf = input
    .split('\n\n')
    .map((elf) =>
      elf
        .split(/\r?\n/)
        .map(Number)
        .reduce((sum, val) => sum + val),
    )
    .sort((a, b) => b - a);

  return sortedTotalCaloriesPerElf
    .slice(0, 3)
    .reduce((sum, curr) => sum + curr, 0);
}
