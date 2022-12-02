<h1 align="center">
  🎄 Advent of Code Solutions
</h1>

<p align="center">
  <a href="https://github.com/dxnter/advent-of-code/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg?label=License&style=flat" alt="MIT License badge" /></a>
</p>

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/en/) v18.12.1 or higher

For contributors, please use [pnpm](https://pnpm.js.org/). Otherwise, feel free to use the package manager of your choice.

### Installation

```bash
git clone git@github.com:dxnter/advent-of-code.git
cd advent-of-code
pnpm i
```

## Usage

### Generate solution stubs

The workflow for solving and debugging puzzles depends on the following files:

- `day_XX.ts` - The solution file
- `input.txt` - The input file
- `day_XX.spec.ts` - The solution test file
- `day_XX.bench.ts` - The solution benchmark file

A `generate` script is available to automatically generate these stubs for you based on the day you want to solve.

#### Commands

Generate stubs within the most recent year for the next puzzle:

```bash
pnpm generate
```

Generate stubs for a specific year or day:

```bash
pnpm generate 2022/09
pnpm generate 2000/01
```

### Save the input

Once the stubs are generated, save the input for the puzzle you're solving in the `input.txt` file.

### Checking solutions

[Vitest](https://vitest.dev/) is used as the test runner to validate the solutions in real-time with Watch mode. In order to benefit from this feature, the `day_XX.spec.ts` file should first be updated after the input is saved.

1. Update the `EXAMPLE` variable to the example text displayed on AoC.
2. Update the expected `equal()` value for the **example** in **Part 1** from `true` to the expected value listed on AoC.
3. Update the expected `equal()` value for the **input** in **Part 1** from `true` to the expected value listed on AoC.

After the assertions have been updated in the test file, start the test runner with `pnpm test` and begin working on the solution in `day_XX.ts`. Following the submission of part 1, the `day_XX.spec.ts` file should be updated with the expected `equal()` value for part 2.

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
