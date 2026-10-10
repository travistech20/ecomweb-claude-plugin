---
name: ecomweb
description: Use when someone wants to start building an ecomweb storefront, or asks how to build their ecomweb store's website with Claude Code, outside an existing storefront project.
---

# Starting an ecomweb storefront

An ecomweb storefront is a Next.js project for one ecomweb store: the store's
products, cart, checkout and accounts come from ecomweb; the merchant (with
Claude Code) owns the pages and the design.

## Inside a storefront project

If the current folder has an `.ecomweb.json` file, it already is a storefront
project. Use the project's own `ecomweb-storefront` skill
(`.claude/skills/ecomweb-storefront/SKILL.md`), not this one.

## Starting one

1. Prerequisites: Node.js 24 or newer, pnpm, git. Check with
   `node --version`, `pnpm --version`, `git --version`.
2. Run `/ecomweb:new`. It checks the ecomweb login (approved in your browser, no
   API key), picks the store,
   and creates and installs the project (on this machine or as a new GitHub
   repository).
3. Then restart Claude Code inside the new folder so the project's skill
   loads, and describe the storefront you want.

Without the slash command, the same thing is `npx @ecomweb/cli storefront init`.
