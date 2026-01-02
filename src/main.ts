import { createInterface } from "readline/promises";
import { exit, stdin, stdout } from "process";
import { Utils } from "./utils.ts";
import { MAX_DAYS, MAX_PARTS } from "./utils.ts";

const rl = createInterface({ input: stdin, output: stdout });

const day = await rl.question(`Which day would you like to view (1 to ${MAX_DAYS})? `);

const dayAsNum = Number(day.trim());
if (!Number.isInteger(dayAsNum) || dayAsNum > MAX_DAYS || dayAsNum < 1) {
  Utils.logError(`Error: enter a number between 1 and ${MAX_DAYS}`);
  rl.close();
  exit(1);
}

const solution = await rl.question(
  `Which solution would you like to run (1 or ${MAX_PARTS})? `,
);

const solutionAsNum = Number(solution.trim());
if (
  !Number.isInteger(solutionAsNum) ||
  solutionAsNum < 1 ||
  solutionAsNum > MAX_PARTS
) {
  Utils.logError(`Error: enter the number 1 or ${MAX_PARTS}`);
  rl.close();
  exit(1);
}

rl.close();

const solutionResult = await Utils.loadDaySolution(dayAsNum);

if (!solutionResult.ok) {
  Utils.logError(solutionResult.error.message);
  exit(1);
}

const daySolution = solutionResult.value;

try {
  if (solutionAsNum === 1) {
    await daySolution.partOne();
  } else {
    await daySolution.partTwo();
  }
} catch (error) {
  Utils.logError(`Error running solution: ${error instanceof Error ? error.message : String(error)}`);
  exit(1);
}
