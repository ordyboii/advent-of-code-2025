import { readFileSync } from 'node:fs';

export function readLines(path: string): string[] {
  return readFileSync(path, 'utf8').split(/\r?\n/);
}

export function logError(message: string): void {
  console.error(message);
}

export const dayNames: readonly string[] = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
];

export function getDayName(dayNumber: number): string {
  return dayNames[dayNumber - 1];
}

export const maxDays = 12;
export const maxParts = 2;
