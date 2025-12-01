import { createInterface } from "readline/promises";
import { stdin, stdout } from "process";
import { Utils } from "./utils.ts";
import { DayOne } from "./days/one.ts";

const rl = createInterface({ input: stdin, output: stdout });

const day = await rl.question(
  "Which day would you like to view (1/2/3/4/5/6/7/8/9/10/11/12)?",
);

const dayAsNum = Number(day.trim());
if (!Number.isInteger(dayAsNum) || dayAsNum > 12 || dayAsNum < 1) {
  Utils.logError("Error: enter a number between 1 and 12");
}

const solution = await rl.question(
  "Which solution would you like to run (1 or 2)?",
);

const solutionAsNum = Number(solution.trim());
if (
  !Number.isInteger(solutionAsNum) ||
  solutionAsNum < 1 ||
  solutionAsNum > 2
) {
  Utils.logError("Error: enter the number 1 or 2");
}

switch (dayAsNum) {
  case 1: {
    if (solutionAsNum == 1) {
      DayOne.partOne();
    }
    if (solutionAsNum == 2) {
      DayOne.partTwo();
    }
  }
  default:
    console.log("No day selected");
}
