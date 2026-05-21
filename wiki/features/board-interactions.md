# Board Interactions

## Goal

Make the board feel like a direct manipulation surface rather than a form-heavy tracker.

## Interaction Model

- Columns are arranged horizontally.
- Cards are stacked vertically within each column.
- Users can drag columns to reorder the workflow.
- Users can drag cards between statuses.
- Users can edit content inline.

## Current Constraints

- The MVP is mouse/pointer-first.
- The MVP uses in-memory state only.
- There is no persisted undo or activity history yet.

## Notes

Azure DevOps is a reference for workflow clarity and lane-based task movement, but the current board intentionally stays lighter and more direct.
