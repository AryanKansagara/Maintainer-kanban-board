# Column Management

## Goal

Allow users to shape the workflow itself by adding, renaming, reordering, and removing columns.

## Functional Requirements

- Add a new column from the sidebar.
- Rename a column inline.
- Reorder columns with drag-and-drop.
- Delete a column when it is no longer needed.

## Current Implementation

The board keeps columns in React state and renders them horizontally. Column order is rearranged with sortable drag behavior.

## Risks

- Deleting a populated column currently removes its tasks along with it.
- There is no confirmation flow or soft-delete behavior yet.

## Related Pages

- [Board Interactions](board-interactions.md)
- [Data Model](../engineering/data-model.md)
- [Drag and Drop](../engineering/drag-and-drop.md)
