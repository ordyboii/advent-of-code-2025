import { exit } from "process";
import { styleText } from "util";

export class Utils {
  public static logError(message: string): void {
    const styled = styleText("bgRed", message);
    console.log(styled);
    exit();
  }
}
