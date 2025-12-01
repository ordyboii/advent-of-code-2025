# Advent of Code - 2025

A small TypeScript/Node project for solving Advent of Code puzzles. 

---

## Requirements

- Node.js (recommended: v24+)
- A package manager (`npm`, `pnpm`, or `yarn`)
---

## Install

If you use npm:

```bash
# install dependencies (if package.json exists)
npm install
```

If you prefer `pnpm`:

```bash
pnpm install
```

---

## Running

Two common approaches:

1) Run with Node.js v24+ directly.

2) Run TypeScript directly (less than v24):
- With `ts-node`:
```bash
npm install -g tsx
tsx src/main.ts
```

The CLI will prompt you for a day and a solution part (1 or 2). Example prompt flow:

- Which day would you like to view?  -> `5`
- Which solution would you like to run (1 or 2)? -> `1`

---

## How to add a solution

Keep solution files small and predictable. A minimal pattern:

- Add a file at `src/days/N.ts` (replace `N` with the day number).
- Export functions for parts 

---

## License

This repository is intended to be permissively licensed. Add a `LICENSE` file at the repo root (for example, `MIT`) if you want to make the license explicit.

---
