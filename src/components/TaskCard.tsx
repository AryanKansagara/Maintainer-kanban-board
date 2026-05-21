import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types";

type TaskCardProps = {
  task: Task;
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask?: (taskId: string) => void;
  isOverlay?: boolean;
};

export function TaskCard({
  task,
  onDeleteTask,
  onUpdateTask,
  isOverlay = false,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `task:${task.id}`,
    data: { type: "task" },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`task-card ${isDragging ? "dragging" : ""} ${isOverlay ? "overlay" : ""}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="task-topline">
        <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        {!isOverlay && onDeleteTask ? (
          <button className="icon-button" onClick={() => onDeleteTask(task.id)}>
            x
          </button>
        ) : null}
      </div>

      <input
        className="task-title"
        value={task.title}
        onChange={(event) => onUpdateTask?.(task.id, { title: event.target.value })}
        readOnly={isOverlay}
      />

      <textarea
        className="task-description"
        value={task.description}
        onChange={(event) => onUpdateTask?.(task.id, { description: event.target.value })}
        readOnly={isOverlay}
      />

      <div className="task-meta">
        <input
          value={task.assignee}
          onChange={(event) => onUpdateTask?.(task.id, { assignee: event.target.value })}
          placeholder="Assignee"
          readOnly={isOverlay}
        />
        <select
          value={task.priority}
          onChange={(event) =>
            onUpdateTask?.(task.id, { priority: event.target.value as Task["priority"] })
          }
          disabled={isOverlay}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
    </div>
  );
}
