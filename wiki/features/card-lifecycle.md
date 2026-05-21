# Card Lifecycle

## Goal

Support the movement of work items from idea to completion while keeping the card editable in place.

## Functional Requirements

- Add a card into a specific column.
- Edit title, description, assignee, and priority directly on the card.
- Move a card within a column or across columns.
- Delete a card.

## Current Implementation

Cards are stored inside their parent column and can be dragged between lanes. Edits are applied directly to local state.

## Open Issues

- No due dates or tags yet.
- No persistence layer yet.
- No keyboard interaction pattern for task movement yet.

## Related Pages

- [Board Interactions](board-interactions.md)
- [Drag and Drop](../engineering/drag-and-drop.md)
