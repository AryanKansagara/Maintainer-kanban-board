import type { Column } from "./types";

export const initialColumns: Column[] = [
  {
    id: "col-backlog",
    title: "Backlog",
    tasks: [
      {
        id: "task-auth",
        title: "Map board authentication",
        description: "Define sign-in constraints and board access boundaries.",
        priority: "High",
        assignee: "Aryan",
      },
      {
        id: "task-ux-audit",
        title: "Audit Azure board patterns",
        description: "Extract the useful interaction patterns without cloning the whole product.",
        priority: "Medium",
        assignee: "Research",
      },
    ],
  },
  {
    id: "col-active",
    title: "In Progress",
    tasks: [
      {
        id: "task-dnd",
        title: "Implement column and card drag",
        description: "Support fluid movement across status lanes.",
        priority: "High",
        assignee: "Frontend",
      },
    ],
  },
  {
    id: "col-review",
    title: "Review",
    tasks: [
      {
        id: "task-model",
        title: "Review board data model",
        description: "Validate the relationship between boards, columns, and tasks.",
        priority: "Low",
        assignee: "Design",
      },
    ],
  },
  {
    id: "col-done",
    title: "Done",
    tasks: [
      {
        id: "task-wiki",
        title: "Write wiki schema",
        description: "Define how the project and the embedded wiki stay synchronized.",
        priority: "Medium",
        assignee: "LLM",
      },
    ],
  },
];
