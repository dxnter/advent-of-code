import { anyPass, gt, __, product, reverse } from 'ramda';

function isPerimeterTree(grid: number[][], row: number, col: number): boolean {
  return (
    row === 0 || row === grid.length - 1 || col === 0 || col === grid.length - 1
  );
}

export function part1(input: string) {
  const grid = input
    .trim()
    .split('\n')
    .map((line) => [...line].map(Number));

  let visibleTrees = 0;

  for (let i = 0; i < grid.length * grid.length; i++) {
    const row = Math.floor(i / grid.length);
    const col = i % grid.length;

    if (isPerimeterTree(grid, row, col)) {
      visibleTrees++;
    } else {
      const currentTreeHeight = grid[row][col];

      const hightestLeftHeight = Math.max(...grid[row].slice(0, col));
      const highestRightHeight = Math.max(...grid[row].slice(col + 1));

      const columnValues: number[] = grid.map(
        (row) => row.filter((__, idx) => idx === col)[0],
      )!;

      const highestTopHeight = Math.max(...columnValues.slice(0, row));
      const highestBottomHeight = Math.max(...columnValues.slice(row + 1));

      if (
        anyPass([
          gt(__, hightestLeftHeight),
          gt(__, highestRightHeight),
          gt(__, highestTopHeight),
          gt(__, highestBottomHeight),
        ])(currentTreeHeight)
      ) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
}

export function part2(input: string) {
  const grid = input
    .trim()
    .split('\n')
    .map((line) => [...line].map(Number));

  let highestScenicScore = 0;

  for (let i = 0; i < grid.length * grid.length; i++) {
    const row = Math.floor(i / grid.length);
    const col = i % grid.length;

    if (isPerimeterTree(grid, row, col)) {
      continue;
    } else {
      const currentTreeHeight = grid[row][col];
      const visibleTrees: number[] = [];

      const leftHeights = reverse(grid[row].slice(0, col));
      const rightHeights = grid[row].slice(col + 1);

      const columnValues: number[] = grid.map(
        (row) => row.filter((__, idx) => idx === col)[0],
      )!;

      const topHeights = reverse(columnValues.slice(0, row));
      const bottomHeights = columnValues.slice(row + 1);

      [leftHeights, rightHeights, topHeights, bottomHeights].forEach(
        (directionHeights) => {
          for (const [index, treeHeight] of directionHeights.entries()) {
            if (
              treeHeight >= currentTreeHeight ||
              index === directionHeights.length - 1
            ) {
              visibleTrees.push(index + 1);
              break;
            }
          }
        },
      );

      const scenicScore = product(visibleTrees);
      if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
    }
  }

  return highestScenicScore;
}
