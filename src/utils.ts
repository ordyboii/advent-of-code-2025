import { exit } from "process";
import { fileURLToPath } from "url";
import { styleText } from "util";
import { dirname, join } from "path";

type Ok<T> = { ok: true; value: T };
type Err = { ok: false; error: Error };
export type Result<T> = Ok<T> | Err;

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
}
