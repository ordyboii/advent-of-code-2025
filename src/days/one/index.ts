import { readFile } from "fs/promises";
import { Result, Utils } from "../../utils.ts";

export class DayOne {
  private static async getInput(): Promise<Result<string[]>> {
    try {
      const inputPath = Utils.getFilePath("days/input.txt");
      const input = await readFile(inputPath, { encoding: "utf-8" });
      return { ok: true, value: input.trim().split("\n") };
    } catch {
      return { ok: false, error: new Error("cannot read file") };
    }
  }

  public static async partOne(): Promise<void> {
    const input = await this.getInput();
    let dial = 50;
    let zeros = 0;

    if (!input.ok) {
      throw input.error;
    }

    for (const line of input.value) {
      const move = line[0];
      const ticks = Number(line.slice(1));
      console.log({ dial, move, ticks });

      switch (move) {
        case "R": {
          dial += ticks;
          break;
        }
        case "L": {
          dial -= ticks;
          break;
        }
      }

      dial = ((dial % 100) + 100) % 100;

      if (dial === 0) {
        zeros++;
      }
    }

    console.log(`Password: ${zeros}`);
  }

  public static async partTwo(): Promise<void> {
    const input = await this.getInput();

    if (!input.ok) {
      throw input.error;
    }

    console.log(input.value);
  }
}
