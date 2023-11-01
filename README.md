# @rulia/types

This package provides the type definition of the interaction functions for Rulia plugins.

If you don't use TypeScript, please ignore it.

## Quick start

1. Install:

```
npm install @rulia/types --save-dev
```

2. Update your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "@rulia/types"
    ]
  }
}
```

3. From now on the editor you are using should give you code hint when you call something under `window.Rulia`.
