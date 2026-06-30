import { fileURLToPath } from 'node:url';
import { readLines, mod } from '../utils.js';

const inputPath = fileURLToPath(new URL('input.txt', import.meta.url));

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export async function partOne(): Promise<void> {
  const lines = readLines(inputPath);
  let dial = 50;
  let zeros = 0;

  for (const line of lines) {
    if (!line.trim()) {
      continue;
    }

    const move = line[0];
    const ticks = Number.parseInt(line.slice(1), 10);

    switch (move) {
      case 'R':
        dial += ticks;
        break;
      case 'L':
        dial -= ticks;
        break;
      default:
        throw new Error(`Invalid move direction: ${move}`);
    }

    dial = mod(dial, 100);

    if (dial === 0) {
      zeros++;
    }
  }

  console.log(`Password: ${zeros}`);
}

export async function partTwo(): Promise<void> {
  const lines = readLines(inputPath);

  for (const line of lines) {
    console.log(line);
  }
}
