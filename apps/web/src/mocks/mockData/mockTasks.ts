import { Task } from "../../models/task";
import { categories } from "./mockCategories";
const date = new Date();

const yesterday = new Date(date.getDate() - 1).toISOString();
const tomorow = new Date(date.getDate() + 1).toISOString();
const inWeek = new Date(date.getDate() + 3).toISOString();
const inMonth = new Date(date.getDate() + 30).toISOString();

export const mockTasks: Task[] = [
  {
    id: "b1c4f1d2-5a3c-4d8e-b6f1-d8e6b5c3e4a1",
    title: "Complete project report",
    createdOn: "2023-02-01T09:00:00.000Z",
    updatedOn: "2024-05-01T10:30:00.000Z",
    description:
      "Prepare and finalize the project report for the last quarter.",
    priority: "high",
    deadline: tomorow,
    category: categories.work,
    color: "#ff1744",
    note: {
      id: "c3d4e1f2-6a7b-4d9f-8e1b-f4c3d2b1a6e7",
      title: "Project outline",
    },
  },
  {
    id: "d5e6c4b1-3f2e-4a5b-8e6d-f1b2c3d4e5a7",
    title: "Buy groceries",
    createdOn: "2023-12-15T12:00:00.000Z",
    updatedOn: "2024-03-10T14:30:00.000Z",
    description: "Purchase fruits, vegetables, and other household essentials.",
    priority: "medium",
    deadline: yesterday,
    color: "#64dd17",
    note: {
      id: "e6f5d4b3-2c1e-4a7d-9f2b-6d1e4b5f3c7a",
      title: "Grocery list",
    },
  },
  {
    id: "e7d6c5b4-1f3a-4d7e-9e6b-f4d3c2b1a5e8",
    title: "Finish reading book",
    createdOn: "2023-08-25T16:00:00.000Z",
    updatedOn: "2024-04-05T19:30:00.000Z",
    description: "Complete reading 'The Great Gatsby' and write a review.",
    priority: "low",
    deadline: inMonth,
    category: categories.personal,
    color: "#2962ff",
    note: {
      id: "f5e4d3c2-7a6b-4d9f-8e1b-d4c3b2a5f6e9",
      title: "Book review notes",
    },
  },
  {
    id: "f8e7d6c5-4b3e-4a6d-9e7b-f5d4c3b1a6e8",
    title: "Schedule dentist appointment",
    createdOn: "2023-11-10T08:00:00.000Z",
    updatedOn: "2024-01-20T09:45:00.000Z",
    description: "Book a check-up and cleaning appointment with the dentist.",
    priority: "medium",
    deadline: inMonth,
    category: categories.health,
    color: "#00bfa5",
    note: {
      id: "a6d5c4b3-1e2f-4a7d-9e2b-c5d4b3a1e6f7",
      title: "Dentist contact info",
    },
  },
  {
    id: "a9f8e7d6-2b1a-4d9e-8e7f-f3d2c1b4a5e6",
    title: "Plan birthday party",
    createdOn: "2023-10-05T14:00:00.000Z",
    updatedOn: "2024-02-28T16:30:00.000Z",
    description:
      "Organize a birthday party, including venue, invitations, and catering.",
    priority: "high",
    deadline: inWeek,
    color: "#ff4081",
    note: {
      id: "b5e4d3c2-3a7b-4d9f-8e1c-d2c1b4a6f5e9",
      title: "Birthday party ideas",
    },
  },
];
