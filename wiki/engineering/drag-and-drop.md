# Drag and Drop

## Current Approach

The current implementation uses `@dnd-kit` for both column and task drag behavior.

## Supported Moves

- Column to column reorder
- Task reorder within a column
- Task move across columns

## State Flow

1. Drag start identifies whether the active item is a column or a task.
2. The UI stores a lightweight active drag payload for overlay rendering.
3. Drag end resolves the drop target.
4. State is updated by reordering columns or removing/inserting the moved task in the appropriate lane.

## Risks

- Inline form controls inside draggable items can conflict with pointer interactions.
- Empty-column drop targeting may need refinement after the first real test pass.
