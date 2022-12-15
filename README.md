# 🎄 Advent of Code

![Tests](https://github.com/dxnter/advent-of-code/actions/workflows/test.yml/badge.svg)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?label=License&style=flat)

Solutions to the [Advent of Code](https://adventofcode.com/) challenges.

| Year | Days Completed | Stars Collected   |
|---|---|---|
| 2022 | ![2022 days completed](https://img.shields.io/badge/days%20completed-12-red&year=2022) | ![2022 stars collected](https://img.shields.io/badge/stars%20⭐-24-yellow&year=2022) |

---

## Setup

### Requirements

- [Node.js](https://nodejs.org/en/) v18.12.1+

For contributors, please use [pnpm](https://pnpm.js.org/). Otherwise, feel free to use a package manager of your choice.

### Installation

```bash
git clone git@github.com:dxnter/advent-of-code.git
cd advent-of-code
pnpm i
```

> **Note**
> If you're using this project for your own solutions, the year folder(s) that contain previous solutions should be removed before use.

## Usage

### Scaffold the next day

```sh
pnpm scaffold

# output:
# SUCCESS  Puzzle files created
# +  advent-of-code/src/2022/07/input.txt
# +  advent-of-code/src/2022/07/day_07.ts
# +  advent-of-code/src/2022/07/day_07.spec.ts
# +  advent-of-code/src/2022/07/day_07.bench.ts
# 🎄 Run pnpm test 2022/07 to start the test runner
```

### Scaffold a specific day

```sh
# example: `pnpm scaffold 2019/20`
pnpm scaffold <year>/<day>

# output:
# SUCCESS  Puzzle files created
# +  advent-of-code/src/2019/20/input.txt
# +  advent-of-code/src/2019/20/day_20.ts
# +  advent-of-code/src/2019/20/day_20.spec.ts
# +  advent-of-code/src/2019/20/day_20.bench.ts
# 🎄 Run pnpm test 2019/20 to start the test runner
```

### Save the input

Once the file stubs are created, save the input for the puzzle you're solving in the `input.txt` file.

### Checking solutions

[Vitest](https://vitest.dev/) is used as the test runner to validate the solutions in real-time with Watch mode. In order to benefit from this feature, the `day_XX.spec.ts` file should first be updated after the input is saved.

1. Update the `EXAMPLE` variable to the example text displayed on AoC.
2. Update the expected `equal()` value for the **example** in **Part 1** from `true` to the expected value listed on AoC.

After the assertions have been updated in the test file, start the test runner with `pnpm test` and begin working on the solution in `day_XX.ts`. As you solve each part, the expected `equal()` value should be updated after a successful submission.

#### Commands

Check all of the solutions:

```bash
pnpm test
```

Check all of the solutions for an entire year:

```bash
pnpm test 2022
```

Check the solutions for a specific day:

```bash
pnpm test 2022/01
```

### Benchmarking solutions

To compare the performance of your solutions, the benchmarking tool in [Vitest](https://vitest.dev/) is used. Vitest runs the solution multiple times to display different performance results.

#### Commands

Benchmark all of the solutions:

```bash
pnpm bench
```

Benchmark all of the solutions for an entire year:

```bash
pnpm bench 2022
```

Benchmark the solutions for a specific day:

```bash
pnpm bench 2022/01
```
