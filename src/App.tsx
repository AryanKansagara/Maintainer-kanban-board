import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { ColumnView } from "./components/ColumnView";
import { TaskCard } from "./components/TaskCard";
import { initialColumns } from "./data";
import type { Column, Task } from "./types";

type ActiveDrag =
  | { type: "column"; column: Column }
  | { type: "task"; task: Task }
  | null;

const makeId = () =>
  `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function App() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const taskLookup = useMemo(() => {
    const pairs = columns.flatMap((column) =>
      column.tasks.map((task) => [task.id, { task, columnId: column.id }] as const),
    );
    return new Map(pairs);
  }, [columns]);

  const addColumn = () => {
    const title = newColumnTitle.trim();
    if (!title) return;

    setColumns((current) => [
      ...current,
      {
        id: makeId(),
        title,
        tasks: [],
      },
    ]);
    setNewColumnTitle("");
  };

  const renameColumn = (columnId: string, title: string) => {
    setColumns((current) =>
      current.map((column) =>
        column.id === columnId ? { ...column, title: title.trim() || column.title } : column,
      ),
    );
  };

  const deleteColumn = (columnId: string) => {
    setColumns((current) => current.filter((column) => column.id !== columnId));
  };

  const addTask = (columnId: string, title: string) => {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    setColumns((current) =>
      current.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: makeId(),
                  title: cleanTitle,
                  description: "New task ready for refinement.",
                  priority: "Medium",
                  assignee: "Unassigned",
                },
              ],
            }
          : column,
      ),
    );
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setColumns((current) =>
      current.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
      })),
    );
  };

  const deleteTask = (taskId: string) => {
    setColumns((current) =>
      current.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      })),
    );
  };

  const findColumnIndexById = (columnId: string) =>
    columns.findIndex((column) => column.id === columnId);

  const handleDragStart = (event: DragStartEvent) => {
    const id = String(event.active.id);

    if (id.startsWith("column:")) {
      const columnId = id.replace("column:", "");
      const column = columns.find((entry) => entry.id === columnId);
      if (column) {
        setActiveDrag({ type: "column", column });
      }
      return;
    }

    const taskId = id.replace("task:", "");
    const found = taskLookup.get(taskId);
    if (found) {
      setActiveDrag({ type: "task", task: found.task });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDrag(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith("column:") && overId.startsWith("column:")) {
      const activeColumnId = activeId.replace("column:", "");
      const overColumnId = overId.replace("column:", "");
      if (activeColumnId === overColumnId) return;

      const oldIndex = findColumnIndexById(activeColumnId);
      const newIndex = findColumnIndexById(overColumnId);
      if (oldIndex === -1 || newIndex === -1) return;

      setColumns((current) => arrayMove(current, oldIndex, newIndex));
      return;
    }

    if (!activeId.startsWith("task:")) return;

    const activeTaskId = activeId.replace("task:", "");
    const activeLookup = taskLookup.get(activeTaskId);
    if (!activeLookup) return;

    const sourceColumnId = activeLookup.columnId;
    const sourceColumn = columns.find((column) => column.id === sourceColumnId);
    if (!sourceColumn) return;

    const sourceIndex = sourceColumn.tasks.findIndex((task) => task.id === activeTaskId);
    if (sourceIndex === -1) return;

    let targetColumnId: string | null = null;
    let targetIndex = 0;

    if (overId.startsWith("column:")) {
      targetColumnId = overId.replace("column:", "");
      const targetColumn = columns.find((column) => column.id === targetColumnId);
      targetIndex = targetColumn ? targetColumn.tasks.length : 0;
    } else if (overId.startsWith("task:")) {
      const overTaskId = overId.replace("task:", "");
      const overLookup = taskLookup.get(overTaskId);
      if (!overLookup) return;
      targetColumnId = overLookup.columnId;
      const targetColumn = columns.find((column) => column.id === targetColumnId);
      targetIndex = targetColumn?.tasks.findIndex((task) => task.id === overTaskId) ?? 0;
    }

    if (!targetColumnId) return;

    setColumns((current) => {
      const next = structuredClone(current) as Column[];
      const fromColumn = next.find((column) => column.id === sourceColumnId);
      const toColumn = next.find((column) => column.id === targetColumnId);

      if (!fromColumn || !toColumn) return current;

      const [movedTask] = fromColumn.tasks.splice(sourceIndex, 1);
      if (!movedTask) return current;

      const adjustedIndex =
        sourceColumnId === targetColumnId && sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;

      toColumn.tasks.splice(adjustedIndex, 0, movedTask);
      return next;
    });
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <p className="eyebrow">Maintainer</p>
        <h1>Project Board</h1>
        <p className="lede">
          A lightweight Kanban board with editable columns, drag-and-drop movement,
          and a matching project wiki.
        </p>

        <div className="panel">
          <h2>Create a column</h2>
          <input
            value={newColumnTitle}
            onChange={(event) => setNewColumnTitle(event.target.value)}
            placeholder="Add a new lane"
          />
          <button onClick={addColumn}>Add column</button>
        </div>

        <div className="panel stats">
          <h2>Snapshot</h2>
          <div>
            <span>Columns</span>
            <strong>{columns.length}</strong>
          </div>
          <div>
            <span>Tasks</span>
            <strong>{columns.reduce((count, column) => count + column.tasks.length, 0)}</strong>
          </div>
        </div>
      </aside>

      <main className="board-wrap">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns.map((column) => `column:${column.id}`)}
            strategy={horizontalListSortingStrategy}
          >
            <section className="board">
              {columns.map((column) => (
                <ColumnView
                  key={column.id}
                  column={column}
                  onAddTask={addTask}
                  onDeleteColumn={deleteColumn}
                  onDeleteTask={deleteTask}
                  onRenameColumn={renameColumn}
                  onUpdateTask={updateTask}
                />
              ))}
            </section>
          </SortableContext>

          <DragOverlay>
            {activeDrag?.type === "column" ? (
              <ColumnView
                column={activeDrag.column}
                onAddTask={() => undefined}
                onDeleteColumn={() => undefined}
                onDeleteTask={() => undefined}
                onRenameColumn={() => undefined}
                onUpdateTask={() => undefined}
                isOverlay
              />
            ) : null}
            {activeDrag?.type === "task" ? <TaskCard task={activeDrag.task} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </main>
    </div>
  );
}

export default App;
