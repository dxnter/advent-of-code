import { has, last, sum, split, values, equals, range, any } from 'ramda';

function parseInput(input: string) {
  return input
    .trim()
    .split('\n')
    .map((instruction) => {
      return instruction === 'noop'
        ? {
            value: 'noop',
          }
        : { value: Number(last(split(' ', instruction))) };
    });
}

class ClockCircuit {
  public register = 1;
  public cycle = 1;
  public signalStrength = 0;

  public milestones: { [id: number]: number } = {
    20: 0,
    60: 0,
    100: 0,
    140: 0,
    180: 0,
    220: 0,
  };

  get currentCycle(): string {
    return String(this.cycle);
  }

  evaluateSignalStrength() {
    this.signalStrength = this.cycle * this.register;

    if (has(this.currentCycle, this.milestones)) {
      this.milestones[this.cycle] = this.signalStrength;
    }
  }

  spritePosition() {
    return [this.register - 1, this.register, this.register + 1];
  }
}

export function part1(input: string) {
  const instructions = parseInput(input);
  const clock = new ClockCircuit();

  instructions.forEach((instruction) => {
    if (equals('noop', instruction.value)) {
      clock.evaluateSignalStrength();

      return clock.cycle++;
    }

    range(0, 2).forEach(() => {
      clock.evaluateSignalStrength();

      clock.cycle++;
    });

    clock.register += instruction.value as number;
  });

  return sum(values(clock.milestones));
}

class CathodeRayTube {
  public image: string[] = [];
  public spritePosition = ['■', '■', '■'].concat(new Array(37).fill('.'));
  public row = '';

  get lastPixel() {
    return this.row.length;
  }

  drawPixel(spritePosition: number[]) {
    any(equals(this.lastPixel))(spritePosition)
      ? (this.row += '■')
      : (this.row += ' ');

    if (this.lastPixel === 40) {
      this.image.push(this.row);
      this.row = '';
    }
  }
}

export function part2(input: string) {
  const instructions = parseInput(input);
  const clock = new ClockCircuit();
  const crt = new CathodeRayTube();

  instructions.forEach((instruction) => {
    if (equals('noop', instruction.value)) {
      clock.evaluateSignalStrength();

      crt.drawPixel(clock.spritePosition());

      return clock.cycle++;
    }

    range(0, 2).forEach(() => {
      clock.evaluateSignalStrength();

      crt.drawPixel(clock.spritePosition());

      clock.cycle++;
    });

    clock.register += instruction.value as number;
  });

  console.log(crt.image);

  return crt.image;
}
