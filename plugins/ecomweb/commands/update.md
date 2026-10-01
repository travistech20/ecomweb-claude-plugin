---
description: Update this storefront's ecomweb skill, kit and SDK, then check it
---

Update the current ecomweb storefront project.

1. If there is no `.ecomweb.json` here, say this isn't a storefront project and
   stop.
2. Run `npx -y @ecomweb/cli storefront skill --update` and summarize what it
   added, changed or removed in `.claude/skills/ecomweb-storefront/`.
3. Run `pnpm update @ecomweb/storefront-kit @ecomweb/sdk`.
4. Run `pnpm check`. If it fails after the update, show what broke and offer to
   fix it.
5. Summarize: the skill changes, the new kit and SDK versions (from
   `package.json`), and whether `pnpm check` passes. Remind the user to commit,
   including `pnpm-lock.yaml`.
