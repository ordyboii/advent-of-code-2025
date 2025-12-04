import { createInterface } from "readline/promises";
import { exit, stdin, stdout } from "process";
import { Utils } from "./utils.ts";
import { DayOne } from "./days/one/index.ts";

const rl = createInterface({ input: stdin, output: stdout });

const day = await rl.question("Which day would you like to view (1 to 12)?");

const dayAsNum = Number(day.trim());
if (!Number.isInteger(dayAsNum) || dayAsNum > 12 || dayAsNum < 1) {
  Utils.logError("Error: enter a number between 1 and 12");
  rl.close();
  exit(1);
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
  rl.close();
  exit(1);
}

rl.close();

switch (dayAsNum) {
  case 1: {
    if (solutionAsNum === 1) {
      DayOne.partOne();
    } else if (solutionAsNum === 2) {
      DayOne.partTwo();
    } else {
      console.log("No part available");
    }
    break;
  }
}
