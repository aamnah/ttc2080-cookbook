---
title: Setup
date: 2024-12-04
---

## Frontend

- [Vite]()
- [Tailwind v4 beta](https://tailwindcss.com/docs/v4-beta)

```bash
# frontend
npm run dev

# api

# compiling API files for Node
# https://www.typescriptlang.org/docs/handbook/compiler-options.html
tsc --watch server.ts 

# Emit files referenced in with the compiler settings from tsconfig.production.json
tsc --watch --project tsconfig.express.json

```

## API

- [Express]()