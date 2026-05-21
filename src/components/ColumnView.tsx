import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { TaskCard } from "./TaskCard";
import type { Column, Task } from "../types";

type ColumnViewProps = {
  column: Column;
  onRenameColumn: (columnId: string, title: string) => void;
  onDeleteColumn: (columnId: string) => void;
  onAddTask: (columnId: string, title: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  isOverlay?: boolean;
};

export function ColumnView({
  column,
  onRenameColumn,
  onDeleteColumn,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  isOverlay = false,
}: ColumnViewProps) {
  const [draftTask, setDraftTask] = useState("");
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `column:${column.id}`,
    data: { type: "column" },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      className={`column ${isDragging ? "dragging" : ""} ${isOverlay ? "overlay" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <header className="column-header" {...attributes} {...listeners}>
        <input
          className="column-title"
          value={column.title}
          onChange={(event) => onRenameColumn(column.id, event.target.value)}
        />
        {!isOverlay ? (
          <button className="ghost-button" onClick={() => onDeleteColumn(column.id)}>
            Delete
          </button>
        ) : null}
      </header>

      <SortableContext
        items={column.tasks.map((task) => `task:${task.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="task-list">
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </div>
      </SortableContext>

      {!isOverlay ? (
        <div className="task-creator">
          <input
            value={draftTask}
            onChange={(event) => setDraftTask(event.target.value)}
            placeholder="Add a task"
          />
          <button
            onClick={() => {
              onAddTask(column.id, draftTask);
              setDraftTask("");
            }}
          >
            Add card
          </button>
        </div>
      ) : null}
    </article>
  );
}
