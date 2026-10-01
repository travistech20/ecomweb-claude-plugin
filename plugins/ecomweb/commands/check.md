---
description: Check this storefront - pnpm check, then the quality checklist
---

Check the current ecomweb storefront project.

1. If there is no `.ecomweb.json` here, say this isn't a storefront project and
   suggest `/ecomweb:new`. Stop.
2. Run `pnpm check` (typecheck, tests, build). If it fails, show the errors
   grouped by file. Fix them only if the user asks.
3. Read `.claude/skills/ecomweb-storefront/references/quality.md` and review the
   storefront's pages against it (performance, accessibility, SEO, Vietnam
   conventions).
4. Report: what passes, and the gaps by file with the checklist item each one
   misses. Keep it short; offer to fix them.
