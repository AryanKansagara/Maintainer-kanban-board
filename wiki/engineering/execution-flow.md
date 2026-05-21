# Execution Flow

## Setup Sequence

1. Define the repo schema in `copilot.md`.
2. Scaffold the frontend stack for a local board MVP.
3. Implement the board UI and local state interactions.
4. Add drag-and-drop for columns and tasks.
5. Create wiki pages that reflect the implementation and rationale.
6. Verify the build and record any changes required by compilation.

## Current Build Flow

- `src/data.ts` seeds the board state.
- `src/App.tsx` owns top-level board state and drag logic.
- `src/components/ColumnView.tsx` renders a sortable lane and its card creation affordance.
- `src/components/TaskCard.tsx` renders an editable task card.

## Validation Status

- Dependencies installed successfully.
- Production build completed successfully with `pnpm build`.
- One TypeScript cleanup was required during verification: removal of an unused sortable import.
- In this environment, the Vite build needed to run outside the sandbox because config resolution attempted parent-directory access.

## Current Gaps

- No persistence
- No server API
- No tests
- No accessibility pass yet
