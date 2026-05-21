# Copilot Schema for Project + LLM Wiki

This repository contains two tightly related things:

1. The actual Kanban board project codebase.
2. An LLM-maintained wiki that documents the project, its decisions, its execution history, and its evolving understanding.

The project is a Kanban board inspired by Azure DevOps Boards. The wiki exists to turn scattered project inputs and implementation activity into a persistent, navigable knowledge base that compounds over time.

The human curates sources, asks questions, and steers priorities. The LLM maintains the wiki.

## Mission

Maintain both:

- the Kanban board project itself
- and a structured project wiki that helps design, implement, explain, and evolve it

The product should support:

- Users can create, rename, reorder, and delete columns.
- Tasks/cards can be created, edited, prioritized, and moved across columns.
- Drag-and-drop reflects status progression.
- The product may borrow patterns from Azure DevOps Boards while adapting them to this project.

The wiki should support:

- product thinking
- technical planning
- implementation tracking
- execution flow documentation
- competitive/reference analysis
- historical traceability for how the project was built

## Source Types

The `raw/` layer may contain any of the following:

- Azure DevOps documentation
- Product requirements
- Design screenshots and UI references
- Competitor board screenshots or notes
- Source code files and architecture notes
- Meeting notes
- Issue tickets and backlog exports
- User feedback
- API documentation
- Personal notes and implementation notes

Treat all raw sources as immutable. Read from them, never rewrite them.

## Repository Layout

Use this structure unless the repo already has a stronger convention:

```text
src/                        # app source code, if applicable
components/                 # UI components, if applicable
app/                        # framework app directory, if applicable
docs/                       # optional human-authored project docs
raw/
  docs/
  requirements/
  designs/
  competitors/
  code-notes/
  meetings/
  tickets/
  feedback/
  api/
  notes/
  assets/

wiki/
  overview/
  product/
  ux/
  engineering/
  architecture/
  features/
  entities/
  research/
  decisions/
  execution/
  sources/

index.md
log.md
copilot.md
```

Not every code folder needs to exist up front. Respect the actual app/framework structure already present in the repo.

If a folder does not exist yet, create it when first needed.

## Core Rule

Do not treat the wiki as separate from the codebase. The code and the wiki should inform each other.

Do not answer from raw files alone when the wiki should be updated first.

When new information materially changes project understanding or implementation state:

1. Read the source.
2. Inspect affected code or project files if relevant.
3. Update the relevant wiki pages.
4. If code changed, document the execution impact.
5. Update `index.md`.
6. Append to `log.md`.
7. Then answer using the updated wiki.

## Page Types

Prefer short, focused markdown pages over long dumping grounds.

### 1. Source Summary Pages

Path pattern:

```text
wiki/sources/YYYY-MM-DD-short-title.md
```

Purpose:

- Summarize one raw source
- Capture key claims, requirements, risks, and open questions
- Link to affected wiki pages

Suggested sections:

- Summary
- Key Facts
- Implications for the Project
- Open Questions
- Related Pages
- Raw Source Location

### 2. Feature Pages

Path pattern:

```text
wiki/features/feature-name.md
```

Examples:

- `wiki/features/column-management.md`
- `wiki/features/card-drag-and-drop.md`
- `wiki/features/work-item-editing.md`

Suggested sections:

- Goal
- User Value
- Functional Requirements
- Edge Cases
- UX Notes
- Engineering Notes
- Dependencies
- Open Questions
- Related Sources

### 3. Architecture / Engineering Pages

Purpose:

- Capture system structure and implementation strategy
- Document technical constraints and tradeoffs

Examples:

- data model for boards, columns, and cards
- drag-and-drop architecture
- persistence strategy
- optimistic updates and sync behavior

### 4. Decision Pages

Path pattern:

```text
wiki/decisions/ADR-XXXX-title.md
```

Use ADR-style pages for major project decisions.

Suggested sections:

- Status
- Context
- Decision
- Alternatives Considered
- Consequences
- Related Pages

### 5. Execution Pages

Path pattern:

```text
wiki/execution/YYYY-MM-DD-topic.md
```

Purpose:

- Capture what the LLM and user actually did during implementation work
- Record rationale summaries, not hidden chain-of-thought
- Preserve why a change was made, what was changed, and what remains
- Show execution steps, implementation flow, and milestone progression in a readable form

Suggested sections:

- Objective
- Actions Taken
- Execution Flow
- Files Touched
- Decision Summary
- Tradeoffs
- Validation
- Remaining Work
- Related Decisions

Important:

- Do not claim to store private/internal reasoning.
- Store concise, externalized reasoning only: rationale, assumptions, tradeoffs, and observable decision steps.
- If the user asks to “show thinking,” interpret that as a request for a decision log and implementation rationale summary.
- Capture how the project was executed in terms of sequence, flow, implementation choices, and outcomes.

## Required Top-Level Files

### `index.md`

This is the wiki catalog. Update it on every meaningful ingest or major page creation.

Organize it by sections such as:

- Overview
- Features
- UX
- Engineering
- Architecture
- Decisions
- Execution
- Research
- Sources

Each entry should include:

- page link
- one-line description
- optional status or date

### `log.md`

This is append-only and chronological.

Every entry must begin with:

```text
## [YYYY-MM-DD] type | title
```

Valid `type` values:

- `ingest`
- `query`
- `decision`
- `execution`
- `build`
- `implementation`
- `lint`
- `refactor`

Each log entry should briefly note:

- what happened
- which sources or pages were involved
- which code areas were involved
- what changed
- what follow-up remains

## Canonical Project Pages

Create and maintain these pages early:

- `wiki/overview/project-overview.md`
- `wiki/overview/repository-map.md`
- `wiki/product/product-vision.md`
- `wiki/features/column-management.md`
- `wiki/features/card-lifecycle.md`
- `wiki/features/board-interactions.md`
- `wiki/ux/board-ux-principles.md`
- `wiki/engineering/data-model.md`
- `wiki/engineering/drag-and-drop.md`
- `wiki/engineering/execution-flow.md`
- `wiki/research/azure-devops-reference.md`

Their exact names may evolve, but keep them stable once linked broadly.

## Ingest Workflow

When asked to process a new source:

1. Identify source type and store or reference it under `raw/`.
2. Read the source carefully.
3. Inspect related code paths if the source affects implementation.
4. Create or update a source summary page in `wiki/sources/`.
5. Update all impacted feature, UX, engineering, architecture, research, or execution pages.
6. If the source changes a major decision, create or update an ADR page.
7. If the source changes active implementation direction, add an execution page or update the current one.
8. Update `index.md`.
9. Append an `ingest` entry to `log.md`.
10. Surface contradictions, ambiguities, and follow-up questions to the user.

## Query Workflow

When asked a project question:

1. Read `index.md` first.
2. Identify the most relevant existing wiki pages.
3. Inspect relevant code if the question is implementation-specific.
4. Read those pages before consulting raw sources.
5. Answer with citations to wiki pages, raw sources, and code paths when useful.
6. If the answer creates durable project knowledge, write it back into the wiki as:
   - a feature update
   - a decision page
   - an execution page
   - or a new research/comparison page
7. Append a `query` entry to `log.md` if the exchange materially advanced the project.

## Execution Tracking Workflow

This wiki is not only for static knowledge. It also tracks how the project was executed.

Use `wiki/execution/` pages to capture:

- implementation plans
- what was built in a session
- step-by-step execution flow for significant work
- why the approach was chosen
- blockers and unresolved risks
- links to relevant code, tickets, and decisions
- what was validated and what was not

Execution pages should be concise and operational. They are not diary entries and not raw chain-of-thought dumps.

Good examples:

- why local state was chosen before backend sync
- why a specific drag-and-drop library was selected
- what changed in the board data model after new requirements
- why WIP limits were deferred to a later milestone
- how column reordering was implemented across UI state, persistence, and drag handlers
- how a task moves from creation to drag interaction to persisted status update

## Codebase Tracking Workflow

When implementation work happens in the repo:

1. Identify which feature or engineering pages the code change belongs to.
2. Inspect the relevant files before editing.
3. After edits, update or create an execution page summarizing:
   - the implementation goal
   - the execution steps
   - the files touched
   - the rationale
   - the validation status
4. If the change reflects a reusable system choice, record it in an ADR or engineering page.
5. Add or update links from the relevant feature page to the execution record.
6. Append an `implementation` or `build` entry to `log.md` when warranted.

## Lint Workflow

Periodically audit the wiki for:

- orphan pages with no inbound links
- stale requirements superseded by newer sources
- contradictions between product and engineering pages
- features mentioned in sources but lacking dedicated pages
- missing ADRs for major implementation choices
- execution pages that never resolved into decisions or feature updates
- code areas with major changes but no execution record
- feature pages that no longer match the current implementation
- important assets or screenshots referenced but not stored locally

When running a lint pass:

1. Review `index.md` and recent `log.md` entries.
2. Inspect cross-links and missing pages.
3. Write findings into a `lint` entry in `log.md`.
4. If needed, create a short page in `wiki/execution/` or `wiki/research/` to track cleanup.

## Writing Conventions

- Use markdown only.
- Prefer one page per concept/feature/decision.
- Use descriptive filenames with hyphens.
- Prefer explicit links between related pages.
- Keep summaries crisp and cumulative.
- Distinguish clearly between fact, inference, and proposal.
- When sources disagree, document the conflict explicitly.
- Preserve useful unknowns; do not flatten ambiguity.
- When discussing code behavior, reference the actual file paths.

## Frontmatter

Optional frontmatter is allowed when useful, especially for Dataview or filtering. Example:

```yaml
---
title: Card Drag and Drop
type: feature
status: active
updated: 2026-05-21
sources:
  - raw/docs/example.md
  - raw/designs/board-screenshot.png
tags:
  - kanban
  - drag-and-drop
---
```

Do not add frontmatter mechanically to every file unless it is consistently valuable.

## Citation Style

When making nontrivial claims, cite one or more of:

- wiki page links
- raw file paths
- screenshot/image paths
- ADR pages
- code file paths

Be concrete. Prefer path-based traceability over vague references.

## Behavioral Rules for the LLM

- Be conservative about deleting wiki content; prefer revising with clear justification.
- Do not silently overwrite prior conclusions when new sources conflict. Record the change.
- Keep the wiki navigable by maintaining links and index coverage.
- Treat screenshots and visual references as first-class sources when relevant to UX behavior.
- Separate inspiration from commitment: Azure DevOps patterns may inform the design, but they are not automatically requirements.
- Prefer durable project artifacts over ephemeral chat answers.
- Keep the wiki synchronized with the actual codebase, not just intentions or plans.
- Treat implementation history as first-class project knowledge.

## First Setup Tasks

When initializing this repo, perform these tasks in order:

1. Create the repository folder structure.
2. Create `index.md`.
3. Create `log.md`.
4. Create the canonical project pages listed above.
5. Add an initial `execution` page that records the setup of the wiki itself.
6. Add a repository map page that explains where code and wiki artifacts live.
7. Append an initial `execution` entry to `log.md`.

## Default Assumptions for This Wiki

- The project is a Kanban board product inspired by Azure DevOps Boards.
- The repo contains both the implementation and the wiki.
- The wiki supports both product design and software implementation.
- Mixed source types are expected.
- Visual references matter.
- Implementation rationale should be preserved as concise decision summaries and execution logs.
- Execution steps, flows, and file-level implementation history are part of the wiki's job.
- The wiki should become the primary working memory for the project over time.
