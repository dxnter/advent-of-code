import { gt, head } from 'ramda';

type HeightMap = string[][];
type Vertex = [string, number];

function bfs(heightMap: HeightMap, start: string, end: string) {
  const visited = new Set();
  const queue = [[start, 0]];

  while (gt(queue.length, 0)) {
    const [coordinate, currentMove] = queue.shift() as Vertex;
    const [row, col] = coordinate.split(',').map(Number);
    const possibleMoves = getAvailableMoves(heightMap, row, col);

    for (const move of possibleMoves) {
      if (move === end) {
        return currentMove + 1;
      }

      if (!visited.has(move)) {
        visited.add(move);
        queue.push([move, currentMove + 1]);
      }
    }
  }
}

function getAvailableMoves(heightMap: HeightMap, row: number, col: number) {
  return [
    [row - 1, col],
    [row, col + 1],
    [row + 1, col],
    [row, col - 1],
  ]
    .filter((cords) => {
      return (
        (cords[0] >= 0 || cords[1] >= 0) &&
        heightMap?.[cords[0]]?.[cords[1]] &&
        canMove(heightMap[row][col], heightMap[cords[0]][cords[1]])
      );
    })
    .map((move) => move.join(','));
}

function canMove(from: string, to: string): boolean {
  return to.charCodeAt(0) - from.charCodeAt(0) <= 1;
}

export function part1(input: string) {
  const map: HeightMap = input.split('\n').map((line) => [...line]);

  let start = '0,0';
  let end = '0,0';

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      const current = map[row][col];
      if (current === 'S') {
        map[row][col] = 's';
        start = `${row},${col}`;
      } else if (current === 'E') {
        map[row][col] = 'z';
        end = `${row},${col}`;
      }
    }
  }

  return bfs(map, start, end);
}

export function part2(input: string) {
  const grid: HeightMap = input.split('\n').map((line) => [...line]);

  const startingSquares = ['0,0'];
  let end = '0,0';

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const current = grid[row][col];
      if (current === 'S' || current === 'a') {
        startingSquares.push(`${row},${col}`);
      } else if (current === 'E') {
        grid[row][col] = 'z';
        end = `${row},${col}`;
      }
    }
  }

  return head(
    startingSquares
      .map((start) => bfs(grid, start, end))
      .sort((a, b) => a! - b!),
  );
}
