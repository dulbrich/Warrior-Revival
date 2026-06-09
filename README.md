# Warrior Revival Website

This is the source code for the Warrior Revival website. It is a [Next.js](https://nextjs.org/) site that is deployed automatically to [Vercel](https://vercel.com/).

This guide is written for **non-coders**. If you have never used Git or Node.js before, follow the steps in order and you will be able to make changes to the site, preview them, and publish them.

> **TL;DR for someone who just wants to make a small text change:**
> 1. Install Git, Node.js, and VS Code (one-time setup — see [First-time setup](#1-first-time-setup-do-this-once)).
> 2. `git clone https://github.com/dulbrich/Warrior-Revival.git`
> 3. `cd Warrior-Revival && npm install`
> 4. Copy `.env.example` to `.env.local` and fill in the keys (ask the project owner).
> 5. `npm run dev` → open `http://localhost:3000`.
> 6. Make your change, then `git checkout -b my-change`, `git add .`, `git commit -m "describe change"`, `git push -u origin my-change`.
> 7. Open the URL Vercel posts on your branch to preview, then open a Pull Request on GitHub and merge into `main` to ship to production.

---

## Table of contents

1. [First-time setup (do this once)](#1-first-time-setup-do-this-once)
2. [Clone the project](#2-clone-the-project)
3. [Install the project dependencies](#3-install-the-project-dependencies)
4. [Environment variables (`.env.local`)](#4-environment-variables-envlocal)
5. [Run the site on your computer](#5-run-the-site-on-your-computer)
6. [Pulling and pushing changes (Git workflow)](#6-pulling-and-pushing-changes-git-workflow)
7. [Staging previews on Vercel (test before going live)](#7-staging-previews-on-vercel-test-before-going-live)
8. [Developing with AI tools (Claude Code, Codex, ChatGPT)](#8-developing-with-ai-tools-claude-code-codex-chatgpt)
9. [The style guide (and why the AI follows it)](#9-the-style-guide-and-why-the-ai-follows-it)
10. [Common commands cheat sheet](#10-common-commands-cheat-sheet)
11. [Where things live in this project](#11-where-things-live-in-this-project)
12. [Getting unstuck](#12-getting-unstuck)

---

## 1. First-time setup (do this once)

You need three free programs installed on your computer.

### 1.1 Install Git

Git is the tool that tracks every change made to the website's code.

- **Windows:** Download and run the installer from <https://git-scm.com/download/win>. Click *Next* through every screen — the defaults are fine.
- **Mac:** Open the *Terminal* app and run `xcode-select --install`, then click *Install* in the popup. (Or download from <https://git-scm.com/download/mac>.)

**Verify it worked:** Open *PowerShell* (Windows) or *Terminal* (Mac) and type:
```
git --version
```
You should see something like `git version 2.43.0`.

### 1.2 Install Node.js (version 20 LTS or newer)

Node.js is what actually runs the website on your computer while you preview changes. `npm` (Node Package Manager) comes bundled with it.

- Go to <https://nodejs.org/> and download the **LTS** version (the green button on the left).
- Run the installer. Use all the default options.

**Verify it worked:**
```
node --version
npm --version
```
You should see version numbers (Node should be `v20.x.x` or higher).

### 1.3 Install Visual Studio Code (the editor)

VS Code is a free code editor from Microsoft. It is where you will actually type your changes.

- Download from <https://code.visualstudio.com/> and run the installer.

That's it for one-time setup.

### 1.4 (Optional but recommended) Create a GitHub account

The code lives on GitHub at <https://github.com/dulbrich/Warrior-Revival>. To push your changes back up, you need a GitHub account.

- Sign up at <https://github.com/signup>.
- Ask the project owner (currently **dulbrich**) to add you as a collaborator on the `Warrior-Revival` repository. Without this, you can read the code but you cannot push changes.

The first time you `git push` (later in this guide), GitHub will prompt you to log in. On modern Windows and Mac, this opens a browser window where you click *Authorize* — there is no password to remember.

---

## 2. Clone the project

"Cloning" means downloading a copy of the website's code onto your computer.

1. Open *PowerShell* (Windows) or *Terminal* (Mac).
2. Pick a folder where you want the project to live. A common choice is your user folder:
   ```
   cd C:\Users\YourName\source
   ```
   (On Mac: `cd ~/source`.) If that folder doesn't exist, create it: `mkdir source` and then `cd source`.
3. Clone the repo:
   ```
   git clone https://github.com/dulbrich/Warrior-Revival.git
   ```
4. Move into the new folder:
   ```
   cd Warrior-Revival
   ```

You now have the whole project on your machine.

---

## 3. Install the project dependencies

The project needs roughly 300 supporting libraries (React, Next.js, Tailwind, Supabase, etc.). They are **not** stored in Git — you download them with one command.

From inside the `Warrior-Revival` folder:

```
npm install
```

This takes 1–3 minutes the first time and creates a `node_modules` folder. You only need to re-run `npm install` if someone updates `package.json` (you will usually see a note about it).

---

## 4. Environment variables (`.env.local`)

The site talks to **Supabase** (our database + login system). Supabase requires three secret keys. These keys are **not** stored in Git — you get them from the project owner.

### 4.1 Create your local env file

There is a template called `.env.example` at the root of the project. Copy it:

- **Windows (PowerShell):**
  ```
  Copy-Item .env.example .env.local
  ```
- **Mac/Linux:**
  ```
  cp .env.example .env.local
  ```

Open the new `.env.local` file in VS Code. It looks like this:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DEV_AUTH_EMAIL=
```

### 4.2 Where to get the values

Ask the project owner for the values. They come from the [Supabase dashboard](https://supabase.com/dashboard) under **Project Settings → API**:

| Variable | What it is | Where to find it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | The Supabase project's URL | Project Settings → API → *Project URL* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | A public, safe-to-expose read key | Project Settings → API → *anon public* key |
| `SUPABASE_SERVICE_ROLE_KEY` | An admin key — **NEVER share this publicly** | Project Settings → API → *service_role* key |
| `DEV_AUTH_EMAIL` | (Optional) Your admin email, used only locally to skip the magic-link login when you're developing | Just put your own email |

Paste each value to the right of the `=` sign. No quotes needed. Save the file.

### 4.3 Important rules about `.env.local`

- **Never commit `.env.local` to Git.** The project's `.gitignore` already excludes it, so this should not happen by accident.
- **Never paste secrets into Slack, email, or screenshots.** Send them via a password manager (1Password, Bitwarden) or a private channel.
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses all permissions. Treat it like a master password.

### 4.4 Production env vars

In production, the same keys are set in the [Vercel dashboard](https://vercel.com/) → *Project Settings → Environment Variables*. You do **not** need to touch those for normal day-to-day changes — they are already configured.

---

## 5. Run the site on your computer

Still in the `Warrior-Revival` folder:

```
npm run dev
```

After a few seconds you will see:
```
▲ Next.js 14.2.7
- Local:   http://localhost:3000
```

Open <http://localhost:3000> in your browser. You are now looking at a copy of the website running on **your own computer**. Edit any file in VS Code, save, and the browser auto-refreshes.

Press `Ctrl+C` in the terminal to stop the dev server.

---

## 6. Pulling and pushing changes (Git workflow)

Git is how the team shares code. Here is the day-to-day rhythm.

### 6.1 Always start by pulling the latest code

Before you start any new change, make sure you have the latest version of `main`:

```
git checkout main
git pull
```

This grabs anything other people have merged since the last time you worked on it.

### 6.2 Make a branch for your change

**Never edit `main` directly.** Always create a branch — it is just a label for your in-progress work.

```
git checkout -b fix-typo-on-homepage
```

Pick a short, lowercase, dash-separated name that describes what you're doing (`fix-typo-on-homepage`, `add-photo-gallery`, `update-contact-info`).

### 6.3 Make your changes

Edit files in VS Code. The dev server (`npm run dev`) will live-reload so you can watch your edits in the browser.

### 6.4 Save your work to Git ("commit")

A commit is a snapshot of your changes with a short description.

```
git add .
git commit -m "Fix typo on homepage hero"
```

- `git add .` means "stage every file I changed."
- `git commit -m "..."` saves the snapshot. Write a message a human can understand.

### 6.5 Push your branch to GitHub

```
git push -u origin fix-typo-on-homepage
```

The `-u origin <branch-name>` part is only needed the **first** time you push a new branch. After that, just `git push` is enough.

### 6.6 Open a Pull Request (PR)

After pushing, GitHub prints a URL like:
```
https://github.com/dulbrich/Warrior-Revival/pull/new/fix-typo-on-homepage
```
Click it. This opens a "Pull Request" — that's GitHub's word for "I want to merge my branch into `main`."

Fill in a title and a sentence or two of description, then click **Create pull request**. Anyone reviewing can leave comments before it is merged.

### 6.7 Merge to `main` to publish

When you're ready (and ideally after previewing on Vercel — see the next section), click **Merge pull request** on the GitHub PR page. **As soon as `main` is updated, Vercel publishes the change to the live site within ~1 minute.**

### 6.8 Pulling someone else's changes

If a teammate merged something while you were working, get their changes with:
```
git checkout main
git pull
```
If you have a half-finished branch and want their updates, switch back to your branch and merge `main` into it:
```
git checkout my-branch
git merge main
```

---

## 7. Staging previews on Vercel (test before going live)

The site is hosted on **Vercel**, and Vercel does something very useful: **every branch automatically gets its own preview URL.** This is your staging environment.

### How it works

1. You push a branch (e.g. `add-new-event-page`) to GitHub.
2. Vercel detects the push, builds the site for that branch, and posts a comment on the Pull Request with a URL like:
   ```
   https://warrior-revival-git-add-new-event-page-dulbrich.vercel.app
   ```
3. **That URL is a real, working copy of the site as it would look if your branch were merged.** Share it with anyone (board members, volunteers) for review.
4. Only when you merge the PR into `main` does the change appear at the real `warriorrevival.org` (production).

### Step-by-step tutorial

Let's say you want to update the contact phone number:

1. Make sure you're on `main` and up to date:
   ```
   git checkout main
   git pull
   ```
2. Branch off:
   ```
   git checkout -b update-contact-phone
   ```
3. Edit the file (e.g. `src/app/contact/ContactPageClient.tsx`) in VS Code. Save.
4. Verify it looks right locally at <http://localhost:3000/contact>.
5. Commit and push:
   ```
   git add .
   git commit -m "Update contact phone number"
   git push -u origin update-contact-phone
   ```
6. Open the PR URL GitHub gave you. Within ~60 seconds, **a `vercel` bot will comment on the PR** with a "Preview" link.
7. Click the preview link. Confirm the new phone number shows up on the staging site.
8. If something is wrong, just edit, commit, and push again — Vercel rebuilds the preview automatically.
9. When happy, click **Merge pull request**. Within another minute, the new phone number is live on production.

### Where to find Vercel itself

If you want to see all current previews, logs, or environment variables:

- Go to <https://vercel.com/> and log in (ask the project owner to add you to the team).
- Open the *Warrior Revival* project.
- The **Deployments** tab lists every preview, color-coded by branch.

You almost never need to log into Vercel for day-to-day changes — the PR comment with the preview link is enough.

---

## 8. Developing with AI tools (Claude Code, Codex, ChatGPT)

You do **not** have to write code by hand. Modern AI coding tools can do the editing for you — you describe what you want in plain English, and they make the changes in your editor. Below are the most useful options and how much they cost.

### 8.1 Claude Code (recommended)

Claude Code is Anthropic's official command-line coding assistant. It is what was used to build most of this site. It reads the project's `CLAUDE.md` file automatically, which means it already knows the design system, the file layout, and the conventions used here.

- **Install:** Open *PowerShell* or *Terminal* and run:
  ```
  npm install -g @anthropic-ai/claude-code
  ```
- **Start it:** From inside the `Warrior-Revival` folder, type:
  ```
  claude
  ```
- The first time you run it, it walks you through logging in.

**Pricing (as of early 2026 — always check <https://www.anthropic.com/pricing> for current):**

| Tier | Cost | What you get |
|---|---|---|
| **Free** (Claude.ai web) | $0 | Limited daily messages on claude.ai. Does **not** include Claude Code in the terminal. |
| **Claude Pro** | ~$20 / month | Includes generous Claude Code usage with the Sonnet model. **Best starting point for non-coders.** |
| **Claude Max** | $100–$200 / month | Much higher usage limits and access to Opus (the smartest model). Worth it if you're making many changes per day. |
| **Pay-as-you-go API** | per-token | For heavy power users only. Skip this. |

**Recommendation:** Start with **Claude Pro ($20/mo)**. It is enough for most weekly content updates.

### 8.2 OpenAI Codex / ChatGPT

OpenAI's equivalent is the *Codex CLI*, which works with a ChatGPT subscription.

- **Install:**
  ```
  npm install -g @openai/codex
  ```
- **Start it:** Run `codex` from inside the project folder.

**Pricing (as of early 2026 — always check <https://openai.com/pricing> for current):**

| Tier | Cost | What you get |
|---|---|---|
| **Free** (ChatGPT web) | $0 | Limited GPT usage on chat.openai.com. Does not include Codex CLI. |
| **ChatGPT Plus** | ~$20 / month | Includes Codex CLI access with reasonable usage. **Equivalent starting tier to Claude Pro.** |
| **ChatGPT Pro** | ~$200 / month | Highest usage and access to the most capable models. |

### 8.3 Which one should you use?

You can install both and try them. They do similar things. Most of this codebase was built with Claude Code, and the project includes a `CLAUDE.md` file that Claude reads automatically — so Claude has a slight head start on understanding this project. You can also point Codex at the same `CLAUDE.md` and it will work fine.

### 8.4 How to actually use it

Once `claude` (or `codex`) is running in your terminal, just describe what you want in plain English:

> *"Change the contact phone number on the Contact page from 555-1234 to 555-9999."*

> *"Add a new section to the homepage below the events strip that highlights upcoming volunteer opportunities. Use the existing card style."*

> *"The hero image on the About page is misaligned on mobile. Fix it."*

The AI will read the relevant files, make the changes, and show you a diff. Review the changes, then follow [Section 6](#6-pulling-and-pushing-changes-git-workflow) to commit and push.

### 8.5 Safety tips when using AI

- **Always preview on the Vercel staging link before merging to `main`.** AI tools occasionally make mistakes.
- **Read the diff before you commit.** Run `git diff` (or use VS Code's Source Control panel) to see exactly what changed.
- **Don't paste secrets into the AI.** Anthropic and OpenAI both have privacy policies, but the safest rule is: if it's in `.env.local`, don't paste it into chat.

---

## 9. The style guide (and why the AI follows it)

This project has two documents that define how the site looks and behaves:

- **[`Style Guide Request.md`](./Style%20Guide%20Request.md)** — colors, fonts, button styles, spacing.
- **[`warror-revival-frd.md`](./warror-revival-frd.md)** — the Functional Requirements Document. Describes every page, user role, and feature.
- **[`CLAUDE.md`](./CLAUDE.md)** — a technical summary of the codebase that AI tools read **automatically** before doing any work.

Because `CLAUDE.md` references the style guide and the FRD, **Claude Code and other AI tools that read `CLAUDE.md` will follow the style guide on their own.** You don't have to remind it to "use the navy color" or "use the Bebas Neue font" — it already knows.

If you want a new visual treatment that the style guide doesn't cover, update `Style Guide Request.md` first, then ask the AI to implement it. That way the rule is captured for next time.

---

## 10. Common commands cheat sheet

Run these from inside the `Warrior-Revival` folder.

| Command | What it does |
|---|---|
| `npm install` | Install/update project dependencies (after `git pull` if `package.json` changed) |
| `npm run dev` | Start the local site at <http://localhost:3000> (Ctrl+C to stop) |
| `npm run build` | Make a production build (Vercel does this for you — rarely needed locally) |
| `npm run lint` | Check the code for style/syntax problems |
| `git status` | See which files you've changed |
| `git pull` | Download the latest changes from GitHub |
| `git checkout -b my-branch` | Make and switch to a new branch |
| `git add .` | Stage all your changes for the next commit |
| `git commit -m "message"` | Save a snapshot with a description |
| `git push` | Send your committed changes to GitHub |
| `claude` | Start the Claude Code AI assistant in this folder |
| `codex` | Start the OpenAI Codex CLI in this folder |

---

## 11. Where things live in this project

Quick map for finding what you want to edit:

- `src/app/` — every page of the site, one folder per URL. For example `src/app/about/` is `/about`.
- `src/components/` — shared building blocks (`SiteHeader`, `SiteFooter`, `SubscribeSection`, buttons, etc.).
- `src/components/siteNavigation.ts` — **the top navigation menu.** Edit this to add or rename a menu link.
- `src/data/` — TypeScript files that store mostly-static content like founder bios.
- `src/lib/` — code that talks to Supabase (events, volunteers, gallery, testimonials).
- `public/` — static images and files served as-is. The site's logo, favicon, and bundled images live here.
- `supabase/migrations/` — database schema. Touch only if you really know what you're doing.
- `tailwind.config.ts` — color palette, font definitions, custom shadows.
- `CLAUDE.md` — architectural overview the AI uses.

---

## 12. Getting unstuck

| Problem | Try this |
|---|---|
| `npm run dev` says "port 3000 is in use" | Something else is using port 3000. Close the other thing, or run `npm run dev -- -p 3001`. |
| `git push` is rejected because someone pushed first | Run `git pull --rebase`, fix any conflicts in VS Code, then push again. |
| The site looks fine locally but broken on Vercel preview | Check the **Deployments** tab in Vercel for build errors. 95% of the time it's a typo introduced after your last local test. |
| The login on `/admin` doesn't send an email | Your Supabase keys in `.env.local` are wrong, or your email isn't in `auth.users` yet. Ask the project owner. |
| `npm install` fails with strange errors | Delete the `node_modules` folder and the `package-lock.json` file, then run `npm install` again. |
| You committed something to `main` by accident | Stop. Don't push. Ask for help — undoing this safely takes one command but the wrong command makes it worse. |
| You committed a secret (like a service-role key) | Tell the project owner immediately. The key needs to be rotated in Supabase, and the commit needs to be rewritten out of history. |

When in doubt, ask Claude Code: *"I got this error: [paste the error]. What should I do?"* It is usually faster than searching.

---

**Maintainer:** [@dulbrich](https://github.com/dulbrich)
**Production site:** auto-deployed from `main` via Vercel.
**Repo:** <https://github.com/dulbrich/Warrior-Revival>
