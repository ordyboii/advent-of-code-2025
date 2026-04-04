import { readFile } from "fs/promises";
import type { Result } from "../utils.js";
import { Utils } from "../utils.js";

export class DayTwo {
  private static async getInput(): Promise<Result<string[]>> {
    try {
      const inputPath = Utils.getFilePath("../scripts/two.txt");
      const input = await readFile(inputPath, { encoding: "utf-8" });
      return { ok: true, value: input.trim().split("\n") };
    } catch {
      return { ok: false, error: new Error("cannot read file") };
    }
  }

  public static async partOne(): Promise<void> {
    const input = await this.getInput();

    if (!input.ok) {
      throw input.error;
    }

    // TODO: Implement part one solution
    console.log("Part One - Not implemented yet");
    console.log("Input lines:", input.value.length);
  }

  public static async partTwo(): Promise<void> {
    const input = await this.getInput();

    if (!input.ok) {
      throw input.error;
    }

    // TODO: Implement part two solution
    console.log("Part Two - Not implemented yet");
    console.log("Input lines:", input.value.length);
  }
}
