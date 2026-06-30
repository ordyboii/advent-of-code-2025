# Conversion TODOs

Each task is self-contained so a new agent can pick it up with zero prior context. Check the box when done.

---

## 1. Project Scaffold
- [x] **Delete** `advent-of-code-2025.csproj` (C# project file).
- [x] **Create** `package.json` with:
  - `"type": "module"`
  - `devDependencies`: `"typescript"`
  - `scripts`: `"build": "tsc"`, `"start": "node dist/index.js"`
- [x] **Create** `tsconfig.json` with:
  - `"target": "ES2022"`
  - `"module": "NodeNext"`
  - `"moduleResolution": "NodeNext"`
  - `"outDir": "dist"`
  - `"rootDir": "src"`
  - `"strict": true`
- [x] **Update** `.gitignore`:
  - Add `dist/`, `node_modules/`
  - Remove `bin/`, `obj/`, `.codex/`
  - Keep `.idea/`, `.vscode/`, `.DS_Store`, `Thumbs.db`

---

## 2. Directory Layout
- [x] **Create** `src/`
- [x] **Create** `src/days/`
- [x] **Create** `src/days/day-one/`
- [x] **Move** `Inputs/one.txt` → `src/days/day-one/input.txt`
- [x] **Delete** empty `Inputs/` folder
- [x] **Delete** `Days/` folder (contains old C# code)

---

## 3. Shared Utilities (`src/days/utils.ts`)
- [x] **Create** `src/days/utils.ts` exporting:
  - `readLines(path: string): string[]` — reads file via `fs.readFileSync`, splits on `/\r?\n/`
  - `mod(n: number, m: number): number` — positive modulo `((n % m) + m) % m`
  - `logError(message: string): void` — `console.error(message)`
  - `dayNames: readonly string[]` — `"one"`, `"two"`, ... `"twelve"`
  - `getDayName(dayNumber: number): string` — index into `dayNames`
  - `maxDays: 12`, `maxParts: 2` as constants

---

## 4. Day One Module (`src/days/day-one/index.ts`)
- [x] **Create** `src/days/day-one/index.ts` with two exported `async` functions:
  - `partOne(): Promise<void>`
  - `partTwo(): Promise<void>`
- [x] In `partOne`:
  - Read `input.txt` via `new URL('input.txt', import.meta.url)`
  - Parse lines starting with `R` or `L` followed by a number
  - Track a `dial` starting at `50`
  - Apply moves using the `mod` helper for wrap-around on 100
  - Count how many times `dial` hits exactly `0`
  - Log: `console.log(`Password: ${zeros}`)`
  - Throw `new Error(...)` for invalid move directions
- [x] In `partTwo`:
  - Read `input.txt`
  - Log each line with `console.log` (stub behavior, keep it simple)

---

## 5. Entry Point (`src/index.ts`)
- [ ] **Create** `src/index.ts`
- [ ] Import `partOne` and `partTwo` from `./days/day-one/index.js` (note `.js` extension for ESM)
- [ ] Use top-level `await`:
  - `console.log('Advent of code 2025 days')`
  - `console.log('Day 1 solutions')`
  - `await partOne()`
  - `await partTwo()`

---

## 6. Clean Up Old C# Files
- [ ] **Delete** `Program.cs`
- [ ] **Delete** `Days/DayOne.cs`
- [ ] **Delete** `Days/Utils.cs`
- [ ] Verify no `.cs` or `.csproj` files remain in the repo

---

## 7. Build & Verify
- [ ] Run `npm install` to install TypeScript
- [ ] Run `npm run build` — `tsc` should compile without errors
- [ ] Run `npm start` — should print the expected Day 1 output
- [ ] Confirm `dist/` contains compiled `.js` files matching `src/` structure
