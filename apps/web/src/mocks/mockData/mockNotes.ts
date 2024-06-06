import { Note } from "../../models/note";
import { categories } from "./mockCategories";

export const mockNotes: Note[] = [
  {
    id: "d75b94da-5c8e-4238-842d-b8438b91b565",
    title: "Meeting Notes",
    createdOn: "2023-01-15T14:28:00.000Z",
    updatedOn: "2024-05-20T09:15:00.000Z",
    content: "Discuss project milestones, deadlines, and responsibilities.",
    color: "#ffeb3b",
    category: [categories.work],
  },
  {
    id: "7d437a79-5b7d-4d52-9f42-f8b51e85b1a7",
    title: "Grocery List",
    createdOn: "2023-12-01T10:00:00.000Z",
    updatedOn: "2024-02-10T11:30:00.000Z",
    content: "Milk, Eggs, Bread, Butter, Chicken, Spinach, Apples.",
    color: "#8bc34a",
  },
  {
    id: "4e98c0bb-6e1f-4c1b-9e2b-446a8b9f92e3",
    title: "Daily Journal",
    createdOn: "2023-06-10T07:15:00.000Z",
    updatedOn: "2024-01-15T08:45:00.000Z",
    content:
      "Today was a productive day. Managed to complete the tasks on my to-do list and had a great workout session.",
    color: "#03a9f4",
    category: [categories.personal, categories.journal],
  },
  {
    id: "f1e38b9a-dcf8-4f8e-bf84-11bcd5a2d50e",
    title: "Project Plan",
    createdOn: "2023-11-05T15:30:00.000Z",
    updatedOn: "2024-03-25T12:00:00.000Z",
    content:
      "Outline the project phases, deliverables, and timelines. Assign tasks to team members and set up regular check-in meetings.",
    color: "#ff9800",
    category: [categories.work],
  },
  {
    id: "e1b5d8f4-3d6f-4e2b-8f1c-1b3e2d4c5b6e",
    title: "Recipe: Chocolate Cake",
    createdOn: "2023-08-20T14:00:00.000Z",
    updatedOn: "2024-04-10T16:15:00.000Z",
    content:
      "Ingredients: Flour, Sugar, Cocoa powder, Baking powder, Eggs, Milk, Butter, Vanilla extract. Instructions: Mix dry ingredients, add wet ingredients, bake at 350°F for 30-35 minutes.",
    color: "#e91e63",
  },
];
