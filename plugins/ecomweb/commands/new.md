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
2. **Log in.** Run `npx -y @ecomweb/cli auth status`. If `logged_in` is false,
   run `npx -y @ecomweb/cli auth login`. Show the user the
   `verification_uri_complete` link and the `user_code`, and ask them to open
   the link and press Approve (the code on the page must match). Then run
   `npx -y @ecomweb/cli auth login --wait [--store-ref <ref>]`, and again while
   it answers `authorization_pending`. If it lists several stores, ask which
   one and run `npx -y @ecomweb/cli stores switch <ref>`; with none, ask for a
   name and run `npx -y @ecomweb/cli stores create --name "<name>"`.
3. **The store.** The login selected it; if `$ARGUMENTS` names a different store
   ref, use that one in step 5.
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

Never ask for codes, keys or tokens, and never write them into files: the user
approves the login in their own browser.
