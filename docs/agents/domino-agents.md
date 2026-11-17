# domino-agents config

<!--
Written by the domino-agents setup (SETUP.md) to docs/agents/domino-agents.md.
Every fill marker is a value the setup asks for; the Coordinator refuses to run while one is left.
Edit by hand any time: the Coordinator and every session read this file fresh.
Keep the headings and the "Field:" names as they are: the skill, the role files and the memory
guard find values by them.
-->

## Project

- Name: vmnog.com
- Approver: Victor
- Partners: none
- Who it serves: one person's portfolio site; its readers are recruiters and clients looking at Victor's work
- Rules files: CLAUDE.md
- Glossary: GLOSSARY.md (created by domain-modeling when the first term is settled)
- Decision records: docs/adr/
- Naming checker: none
- Rebuild of: none
  <!-- When set, a screen the old app ships is never deferred because a read is missing: the read gets a ticket. -->

## Talk style

- Plain: yes
  <!-- yes = context first, then the point; ASD-STE100 Simplified Technical English: one idea per sentence, active voice, common words, 20 words or fewer; every term explained in one plain sentence before it is used. -->
- Profile: adhd
  <!-- adhd = the next action first; numbered steps, one action each; the state restated every turn; concrete time units for the approver's own steps; lists of 5 at most; no preamble, recap or closing line; one concrete next action at the end. -->
- Notes: none

## Runtime

- Agent: claude-desktop
- Reports folder: /Users/victornogueira/fun/vmnog-site/.domino/reports

## Tracker

How to call it is in docs/agents/issue-tracker.md (written by the mattpocock-skills setup, which
the approver runs as /setup-matt-pocock-skills; see SETUP.md). This
section holds only what the loop adds.

- Tool: local
- Where: .scratch/
- Milestone order: `.scratch/MILESTONES.md`, one `## <n> · <name>` heading per milestone, in order
- Later milestone: Later
- Ticket id: <feature-slug>/NN, e.g. linkedin-link/01 (the file .scratch/<feature-slug>/issues/NN-<slug>.md)
- Status in progress: In Progress
- Status merged not released: On Staging
- Status released: Done

## Branches

- Integration: staging
- Production: main
- Branch name: <feature-slug>-<NN>-<short-slug>
- Merge method: squash
- Code host CLI: gh
- PR checks: no CI runs the tests; the local gate is the test run

## Gate

Every command runs from this folder: .

- Check: pnpm lint && pnpm exec tsc --noEmit && pnpm build
- Lint: inside Check
- More tests: none
- Database tests: none
- Smoke run: none
- Prompt check: none
- Dev server: pnpm dev --port <web>
- Own database: none

## Ports

- Session n uses: web 3400+n
- Shared ports: 3000, 3457

## Evidence

What the approver reviews before a merge, instead of reading code.

- Kind: screenshots
- Recorder: Playwright, installed in a temp folder outside the repo and deleted after
- Viewport: 390 px (phone) and 1300 px (desktop)
- Phone check: Playwright at 390 px; no simulator
- Entry screen: the homepage, /
- Folder: screenshots/<ticket>/
- Test users: none (the site has no sign-in)
- Test addresses: none (the site sends no email or messages)

## Design

- Tool: paper
- File: https://app.paper.design/file/01M7NHT3JGWJFZYAB6YF1TGB82
- Explorations page: Explorations
- Flow pages: one page per flow, boards in labelled rows; the homepage is the Home page
- Foundations page: none
- Proposed page: none
- Archive page: 99 · Archive
- Board width: 390 and 1300
- Board names: Screen / state — option A
- Tokens file: src/app/globals.css
- Components from: none

## Keys and limits

- Keys: none (the site reads no secrets)
- Off limits: none
- Production actions: the approver, by hand; agents read production only
- Infra autonomy: on Vercel, read deploys and logs and set up the staging branch's preview without asking; ask first for domains, deletes, billing and environment variables

## Release

- Staging URL: https://vmnog-site-git-staging-vmnogs-projects.vercel.app
- Production URL: https://vmnog.com
- Release ticket: Release: next (<what is in it, in a few words>)
- Before it goes out: none
- After it goes out: the production deploy for the release commit reads Ready on Vercel, and https://vmnog.com shows the released change
- What holds it: early: a row whose evidence the approver OK'd counts as tested

## Memory guard

Read by the domino-agents skill's hooks/domino-memory-guard.sh when it is installed. GB is the estimate for one new
session on this computer; one idle Claude Code session measured about 0.85 GB.

```text
limit_percent: 90
start_floor_free_percent: 25
builder_gb: 3.0
designer_gb: 2.0
other_gb: 1.5
```
