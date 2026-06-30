# TypeScript Conversion Plan

## Goal
Convert the tiny C# .NET 10 Advent of Code console app into a TypeScript Node.js project using **only the `tsc` CLI** (no runtime transpilers like `ts-node` or `tsx`), with **zero runtime dependencies**.

---

## Current State
- 3 C# source files: `Program.cs`, `Days/DayOne.cs`, `Days/Utils.cs`
- 1 input file: `Inputs/one.txt`
- Only **Day 1** is implemented; Part Two is a stub

---

## 1. Project Scaffold

Replace `.csproj` / `sln` with two minimal config files:

| File | Purpose |
|------|---------|
| `package.json` | `devDependency`: `typescript`. `"type": "module"` enables ESM so top-level `await` works in `index.ts`. Scripts: `"build": "tsc"`, `"start": "node dist/index.js"` |
| `tsconfig.json` | `target: ES2022`, `module: NodeNext`, `outDir: dist`, `rootDir: src`, `strict: true` |

Update `.gitignore` to ignore `dist/`, `node_modules/`, and keep existing IDE ignores.

---

## 2. Directory Layout

**Inputs are co-located with their day code** instead of a separate top-level folder.

```
src/
├── index.ts              # entry point (replaces Program.cs)
└── days/
    ├── day-one/
    │   ├── index.ts      # replaces Days/DayOne.cs
    │   └── input.txt     # moved from Inputs/one.txt
    └── utils.ts          # replaces Days/Utils.cs
```

Each day folder owns its puzzle input. Days import their own `input.txt` with `new URL('input.txt', import.meta.url)`.

---

## 3. Radical Simplifications

| C# Complexity | TS Simplification | Rationale |
|---|---|---|
| `async Task` file I/O | **Top-level `await`** in `index.ts` and `async` functions in day modules | Modern TypeScript/Node ESM supports top-level `await`. Keeps the clean `await partOne()` / `await partTwo()` flow from the original without a useless `async` wrapper for a 10-line local file read. |
| `while` directory walker in `Utils.GetInputPath` | **Gone entirely** — each day uses `new URL('input.txt', import.meta.url)` | ESM gives us `import.meta.url`. No path math, no loops, no null checks, no shared utility. |
| `sealed class` with `static` methods | **Plain exported functions** | No `class`, `namespace`, or `static` boilerplate. `export async function partOne(): Promise<void> { ... }` |
| `Console.ForegroundColor` save/restore | **`console.error(message)`** | Semantically correct, zero state manipulation. |
| `((dial % 100) + 100) % 100` | Tiny helper: `const mod = (n: number, m: number): number => ((n % m) + m) % m;` | Same behavior, named for readability. |
| File read + split logic everywhere | **One `readLines` helper** in `utils.ts` | `export function readLines(path: string): string[]` reads the file, splits on `/\r?\n/`, and returns the array. Callers just `const lines = readLines(inputPath);` |

---

## 4. Type Mapping

| C# | TypeScript |
|---|---|
| `string[]` | `string[]` |
| `int` | `number` |
| `InvalidOperationException` | `throw new Error(...)` |
| `File.ReadAllLinesAsync` | using `fs.readFile(path, 'utf8').split(\n)` |
| `namespace Days` | ES modules (`import { readLines } from '../utils.js'`) |

---

## 5. Dependencies

- **`typescript`** — required `devDependency`
- **`@types/node`** — recommended `devDependency` so `fs`, `path`, and `import.meta.url` are typed under `strict` mode. Zero runtime footprint.

---

## 6. Build & Run

```bash
npm install        # installs typescript (and optionally @types/node)
npm run build      # tsc
npm start          # node dist/index.js
```

No `ts-node`, `tsx`, `nodemon`, or any other runtime transpiler.
