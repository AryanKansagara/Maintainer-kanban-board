# Maintainer

Maintainer is a Kanban board project inspired by Azure DevOps Boards, built alongside an embedded LLM-maintained wiki. The repository is both an application codebase and a persistent knowledge graph in markdown: product context, engineering notes, execution history, research references, and implementation rationale all live next to the code.

## What This Repo Contains

- A React-based Kanban board MVP with editable columns and cards
- Drag-and-drop interactions for columns and tasks
- An LLM Wiki / knowledge graph that tracks how the project is designed and built
- A project log that records implementation milestones and validation steps

## Current Product Scope

The current MVP supports:

- creating columns
- renaming columns
- deleting columns
- creating cards
- editing card title, description, assignee, and priority
- dragging columns to reorder workflow lanes
- dragging cards within and across columns

The current version keeps board state in local React state. Persistence, auth, filtering, and advanced workflow rules are intentionally deferred.

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- CSS

### Drag and Drop

- `@dnd-kit/core`
- `@dnd-kit/sortable`
- `@dnd-kit/utilities`

### Tooling

- `pnpm`
- `vite`
- `typescript`
- `@vitejs/plugin-react`

## Why the Wiki Exists

Most project repos keep code in one place and decisions in scattered chats, tickets, docs, or memory. This repo follows the LLM Wiki pattern: the wiki is a persistent artifact that accumulates understanding over time instead of rediscovering it from scratch on every question.

The wiki is used to track:

- product direction
- feature definitions
- engineering notes
- execution steps
- build history
- decision summaries
- research on Azure DevOps-inspired patterns

This makes the repository function like both a product workspace and a lightweight knowledge graph.

## Wiki / Knowledge Graph Structure

The markdown wiki lives under `wiki/` and is indexed from `index.md`.

Key pieces:

- `copilot.md` defines how the LLM should maintain the project and wiki
- `index.md` is the content catalog
- `log.md` is the chronological project record
- `wiki/overview/` contains project-level orientation
- `wiki/product/` contains product direction and scope
- `wiki/features/` contains feature-specific pages
- `wiki/ux/` contains interface and interaction principles
- `wiki/engineering/` contains implementation notes and system reasoning
- `wiki/research/` contains competitive/reference analysis
- `wiki/execution/` contains implementation session records and build flow summaries
- `raw/` is reserved for immutable source material such as docs, screenshots, tickets, notes, and research inputs

## Repository Layout

```text
.
├─ src/
│  ├─ components/
│  ├─ App.tsx
│  ├─ data.ts
│  ├─ main.tsx
│  ├─ styles.css
│  └─ types.ts
├─ wiki/
│  ├─ engineering/
│  ├─ execution/
│  ├─ features/
│  ├─ overview/
│  ├─ product/
│  ├─ research/
│  └─ ux/
├─ raw/
├─ copilot.md
├─ index.md
├─ log.md
├─ package.json
└─ README.md
```

## Main Files

- `src/App.tsx` owns board state, column actions, and drag-end logic
- `src/components/ColumnView.tsx` renders a sortable column and card creation UI
- `src/components/TaskCard.tsx` renders editable task cards
- `src/data.ts` contains seeded starter board data
- `src/types.ts` defines the current `Column` and `Task` types
- `src/styles.css` defines the visual system for the board

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Start the dev server

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Preview the production build

```bash
pnpm preview
```

## Scripts

- `pnpm dev` starts the Vite development server
- `pnpm build` runs TypeScript build checks and creates a production bundle
- `pnpm preview` serves the built app locally

## Implementation Notes

- The current board model stores tasks nested inside columns for speed and simplicity.
- Drag-and-drop is handled with `@dnd-kit` using sortable column and task ids.
- Inline editing was chosen for the MVP to keep high-frequency actions direct.
- The wiki is updated as implementation changes so execution history remains durable.

## Wiki Entry Points

Start here if you want to understand the project quickly:

- [Project Overview](wiki/overview/project-overview.md)
- [Repository Map](wiki/overview/repository-map.md)
- [Product Vision](wiki/product/product-vision.md)
- [Execution Flow](wiki/engineering/execution-flow.md)
- [Board MVP Build](wiki/execution/2026-05-21-board-mvp-build.md)
- [Wiki Index](index.md)
- [Project Log](log.md)

## LLM Workflow

This repository is designed to work well with an LLM agent maintaining both code and documentation.

Typical flow:

1. Add or inspect a source in `raw/`.
2. Update or create the relevant wiki page.
3. Implement the required product change in code.
4. Record the execution summary in `wiki/execution/`.
5. Update `index.md` and append to `log.md`.

The result is a repo where knowledge compounds instead of disappearing into chat history.

## Current Status

- Kanban board MVP implemented
- Initial wiki structure implemented
- Build verified successfully with `pnpm build`
- Browser interaction testing still pending

## Next Likely Steps

- persist board state
- add keyboard and accessibility improvements
- refine drag affordances
- introduce board filtering or search
- ingest real Azure DevOps docs, screenshots, tickets, and notes into `raw/`
- expand the wiki with ADRs and richer execution history
