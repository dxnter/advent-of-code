/* eslint-disable @typescript-eslint/no-unused-vars */
import { forEach, head, last, range, repeat, split } from 'ramda';

type Direction = 'U' | 'D' | 'L' | 'R';

interface Motion {
  direction: Direction;
  moves: number;
}

class Point {
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  getNextDirection(direction: Direction): number[] {
    switch (direction) {
      case 'U':
        return [0, -1];
      case 'D':
        return [0, 1];
      case 'L':
        return [-1, 0];
      case 'R':
        return [1, 0];
      default:
        return [0, 0];
    }
  }

  move(direction: Direction) {
    const [x, y] = this.getNextDirection(direction);
    this.x += x;
    this.y += y;
  }

  follow(point: Point) {
    const distanceBetweenPoints = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y),
    );

    if (distanceBetweenPoints > 1) {
      const directionX = point.x - this.x;
      const directionY = point.y - this.y;

      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
  }
}

function getMotions(input: string): Motion[] {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const [direction, moves] = split(' ', line);
      return {
        direction,
        moves: Number(moves),
      } as Motion;
    });
}

function markVisited(x: number, y: number, visited: Set<string>) {
  visited.add(`${x},${y}`);
}

export function part1(input: string) {
  const visited = new Set<string>();
  const head = new Point(0, 0);
  const tail = new Point(0, 0);
  markVisited(0, 0, visited);

  getMotions(input).forEach((motion) => {
    forEach(() => {
      head.move(motion.direction);
      tail.follow(head);
      markVisited(tail.x, tail.y, visited);
    }, range(0, motion.moves));
  });

  return visited.size;
}

export function part2(input: string) {
  const knots = repeat(0, 10).map((_) => new Point(0, 0));
  const visited = new Set<string>();
  markVisited(0, 0, visited);

  getMotions(input).forEach((motion) => {
    forEach(() => {
      head(knots)!.move(motion.direction);

      for (let knot = 1; knot < knots.length; knot++) {
        const point = knots[knot];
        point.follow(knots[knot - 1]);
      }

      const tail = last(knots)!;
      markVisited(tail.x, tail.y, visited);
    }, range(0, motion.moves));
  });

  return visited.size;
}
