---
description: Create an ecomweb storefront project for your store and start it
argument-hint: "[store ref]"
---

Create a new ecomweb storefront project and get it running. Work through these
steps in order, telling the user briefly what each one does.

1. **Prerequisites.** Run `node --version`, `pnpm --version` and `git --version`.
   - Node must be 24 or newer. If anything is missing or too old, stop and give
     the install links: https://nodejs.org (Node), https://pnpm.io/installation
     (pnpm), https://git-scm.com/downloads (git).
2. **Log in.** Run `npx -y @ecomweb/cli auth status`. If the user isn't logged
   in, ask them to do it themselves, outside this chat, so their key never
   enters it: create an API key for their store in the ecomweb dashboard, then
   run `npx @ecomweb/cli auth login --api-key <key>` in their own terminal.
   Wait until they say it's done, then check `auth status` again.
3. **Pick the store.** If `$ARGUMENTS` names a store ref, use it. Otherwise run
   `npx -y @ecomweb/cli stores list`, show the stores (name and ref), and ask
   which one.
4. **Where.** Ask: "Create the project on this machine, or as a new private
   GitHub repository (cloned here)?"
5. **Create it.** Run
   `npx -y @ecomweb/cli storefront init --store-ref <ref> [--github] --quiet`
   (add `--github` if they chose GitHub). It creates the folder and installs
   dependencies; don't start the dev server from here (it would block this
   session). If it reports `"install": "failed"`, show its message and help fix
   it (usually pnpm or the network).
6. **Hand over.** Tell the user:
   - to open a terminal in the new folder and run `pnpm dev`: the storefront
     appears at http://localhost:3002;
   - to quit this session and run `claude` inside the new folder, so the
     project's own ecomweb-storefront skill loads;
   - three first prompts to try, for example: "Build my home page from my
     best-selling products, in my brand colours", "Redesign the product page
     for phones with my real photos", "Add a size guide to product pages".

Never paste API keys or tokens into the chat or into files.
