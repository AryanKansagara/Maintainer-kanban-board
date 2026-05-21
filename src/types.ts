export type Task = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  assignee: string;
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
};
