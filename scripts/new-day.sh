#!/bin/bash
set -euo pipefail

# Validate we're in the right directory
if [ ! -f "package.json" ]; then
  echo "Error: Must be run from project root"
  exit 1
fi

# Validate input count
if [ $# -ne 1 ]; then
  echo "Usage: npm run new-day <day-number>"
  echo "Example: npm run new-day 2"
  exit 1
fi

DAY_NUM=$1

# Validate day number (no leading zeros)
if ! [[ "$DAY_NUM" =~ ^[1-9][0-9]*$ ]] || [ "$DAY_NUM" -lt 1 ] || [ "$DAY_NUM" -gt 12 ]; then
  echo "Error: Day number must be between 1 and 12"
  exit 1
fi

# Map day number to word
declare -a DAY_NAMES=("one" "two" "three" "four" "five" "six" "seven" "eight" "nine" "ten" "eleven" "twelve")
DAY_NAME=${DAY_NAMES[$((DAY_NUM - 1))]}

# Validate DAY_NAME was set
if [ -z "$DAY_NAME" ]; then
  echo "Error: Invalid day mapping"
  exit 1
fi

# Validate no path traversal characters
if [[ "$DAY_NAME" =~ \.\.|\/ ]]; then
  echo "Error: Invalid day name contains path traversal"
  exit 1
fi

# Class name (capitalize first letter of each word)
IFS='-' read -ra PARTS <<< "$DAY_NAME"
CLASS_NAME="Day"
for part in "${PARTS[@]}"; do
  CLASS_NAME+="${part^}"
done

# Create directory
DAY_DIR="src/days/$DAY_NAME"
if [ -d "$DAY_DIR" ]; then
  echo "Error: Day $DAY_NUM ($DAY_NAME) already exists at $DAY_DIR"
  exit 1
fi

# Create directory atomically
mkdir -p "$DAY_DIR" || {
  echo "Error: Failed to create directory $DAY_DIR"
  exit 1
}

# Create index.ts from template (quoted EOF to prevent variable expansion)
cat > "$DAY_DIR/index.ts" << 'EOF'
import { readFile } from "fs/promises";
import { Result, Utils } from "../../utils.ts";

export class CLASS_NAME_PLACEHOLDER {
  private static async getInput(): Promise<Result<string[]>> {
    try {
      const inputPath = Utils.getFilePath("days/DAY_NAME_PLACEHOLDER/input.txt");
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
EOF

# Safely substitute placeholders
sed -i "s/CLASS_NAME_PLACEHOLDER/$CLASS_NAME/g" "$DAY_DIR/index.ts"
sed -i "s/DAY_NAME_PLACEHOLDER/$DAY_NAME/g" "$DAY_DIR/index.ts"

# Set secure permissions
chmod 644 "$DAY_DIR/index.ts"

# Create input.txt
cat > "$DAY_DIR/input.txt" << 'EOF'
# Paste your Advent of Code input here
EOF

chmod 644 "$DAY_DIR/input.txt"

echo "✓ Created Day $DAY_NUM ($DAY_NAME)"
echo "  Directory: $DAY_DIR"
echo "  Class: $CLASS_NAME"
echo ""
echo "Next steps:"
echo "  1. Paste your puzzle input into $DAY_DIR/input.txt"
echo "  2. Implement solutions in $DAY_DIR/index.ts"
echo "  3. Run: npm start"
