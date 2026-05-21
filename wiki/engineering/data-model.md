# Data Model

## Current Structures

### Column

- `id`
- `title`
- `tasks`

### Task

- `id`
- `title`
- `description`
- `priority`
- `assignee`

## Current Tradeoff

Tasks are nested under columns for implementation speed in the MVP. This makes rendering and moves straightforward, but it may become limiting when persistence, analytics, or cross-board references are introduced.

## Likely Evolution

A normalized structure may later separate:

- board metadata
- ordered column ids
- task entities
- task-to-column placement
