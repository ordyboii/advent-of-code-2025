import { fileURLToPath } from "url";
import { styleText } from "util";
import { dirname, join } from "path";
import { access } from 'fs/promises';

export type Ok<T> = { ok: true; value: T };
export type Err = { ok: false; error: Error };
export type Result<T> = Ok<T> | Err;
export type DayName = typeof DAY_NAMES[number];
export type DaySolution = {
  partOne(): Promise<void>;
  partTwo(): Promise<void>;
}

export const DAY_NAMES = [
  'one', 'two', 'three', 'four', 'five',
  'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve'
] as const;
export const MAX_DAYS = 12;
export const MAX_PARTS = 2;


export class Utils {
  public static logError(message: string): void {
    const styled = styleText("bgRed", message);
    console.log(styled);
  }

  public static getFilePath(path: string): string {
    const filename = fileURLToPath(import.meta.url);
    const dir = dirname(filename);

    return join(dir, path);
  }

  public static async loadDaySolution(dayNumber: number): Promise<Result<DaySolution>> {
    try {
      if (dayNumber < 1 || dayNumber > MAX_DAYS) {
        return { ok: false, error: new Error(`Invalid day number: ${dayNumber}`) };
      }

      const dayName = DAY_NAMES[dayNumber - 1];

      // Check if directory exists
      const currentFile = fileURLToPath(import.meta.url);
      const currentDir = dirname(currentFile);
      const dayPath = join(currentDir, 'days', dayName);

      try {
        await access(dayPath);
      } catch {
        return {
          ok: false,
          error: new Error(`Day ${dayNumber} has not been implemented yet`)
        };
      }

      // Dynamic import
      const modulePath = `./days/${dayName}/index.ts`;
      const module = await import(modulePath);

      // Find exported class with partOne/partTwo methods
      const solutionClass = Object.values(module).find(
        (exp): exp is DaySolution =>
          typeof exp === 'function' &&
          'partOne' in exp &&
          'partTwo' in exp
      );

      if (!solutionClass) {
        return {
          ok: false,
          error: new Error(`Day ${dayNumber} solution does not export a valid DaySolution class`)
        };
      }

      return { ok: true, value: solutionClass };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error
          ? error
          : new Error(`Failed to load day ${dayNumber}: ${String(error)}`)
      };
    }
  }
}
