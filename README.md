# ecomweb for Claude Code

Build your ecomweb store's storefront with [Claude Code](https://claude.com/claude-code).

## Install

In Claude Code:

```
/plugin marketplace add travistech20/ecomweb-claude-plugin
/plugin install ecomweb@ecomweb
```

## Use

| Command | What it does |
|---|---|
| `/ecomweb:new [store]` | Checks Node 24, pnpm and git; logs you in to ecomweb; picks your store; creates the storefront project (here or as a new GitHub repository); installs and starts it on http://localhost:3002. |
| `/ecomweb:check` | In a storefront project: runs `pnpm check`, then reviews the pages against the project skill's quality checklist. |
| `/ecomweb:update` | In a storefront project: updates the project's ecomweb skill, the storefront kit and the SDK, then runs `pnpm check`. |

After `/ecomweb:new`, restart Claude Code inside the new folder. Every
storefront project carries its own `ecomweb-storefront` skill, which teaches
Claude the storefront kit, your store's real data, a recipe per page and what
"done" means.

## Using Codex instead

Codex reads the project's `AGENTS.md`, which points to the same skill. Start
with `npx @ecomweb/cli storefront init`; see "Start with Codex" in the
project's `docs/start-with-codex.md`.

## Development

`npm test` checks the marketplace and plugin structure.
