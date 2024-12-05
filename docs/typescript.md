---
title: TypeScript
date: 2024-12-05
---

## Backend for CommonJS

```
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "CommonJS",
    "esModuleInterop": true,
    "noEmit": false,
  },
  "include": ["./server.ts", "./src/constants.ts"]
}
```

- `"noEmit": false` is needed if you want to generate the actual `.js` files
- When an `outDir` is specified, TS rebuilds the entire structure of files inside the `outDir` (e.g. `frontend/js`). You can not pick files from different folders (e.g. `api/*`, `modules/*`) and have them all output in one final directory, you will end up with the original dir structure recreated inside `outDir` (e.g. `frontend/js/api/*`, `frontend/js/modules/*`). File paths are maintained when files are generated.