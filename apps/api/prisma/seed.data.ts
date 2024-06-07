import { User, Role, Note, Task, Category } from "@prisma/client";

// salted hash of 123 password
const defaultPassword =
  "$2b$10$jH6oPt1FZx0VHkF6FrDBg.54Fb4LywuqLjQ/8vz5mbqmY8ARh5Gne";

export const admin: Omit<User, "createdAt" | "updatedAt"> = {
  id: "db0a7c48-b73d-49dd-bc67-d52fa91ea842",
  name: "admin",
  email: "admin@email.com",
  password: defaultPassword,
  role: Role.admin,
};

export const users: Omit<User, "createdAt" | "updatedAt" | "userId">[] = [
  {
    id: "45ee5f25-52bd-4f12-9512-e8ac0e42c76e",
    name: "User Userovic",
    email: "user@email.com",
    password: defaultPassword,
    role: Role.user,
  },
  {
    id: "c5a3e093-3797-4cb9-98a2-ba746a76e60c",
    name: "Ron",
    email: "ron@email.com",
    password: defaultPassword,
    role: Role.user,
  },
  {
    id: "52ae6737-e465-46a8-9556-a682cedab3f6",
    name: "Adam",
    email: "adam@email.com",
    password: defaultPassword,
    role: Role.user,
  },
];

const categories = {
  work: {
    id: "018fefc3-2c1c-7827-a3dd-b6407cadd833",
    name: "work",
    color: null,
    description: null,
  },
  home: {
    id: "018fefc3-aff4-7480-b598-8d3b77c7cb7a",
    name: "home",
    color: "#F597FF",
    description: null,
  },
  recipe: {
    id: "018fefc3-b0b0-7958-96dc-c992976a466e",
    name: "recipe",
    color: "#C7FF88",
    description: null,
  },
  personal: {
    id: "018fefc3-b15d-7438-be06-a63d1926dfef",
    name: "personal",
    color: null,
    description: null,
  },
  journal: {
    id: "018fefc3-b209-776e-8afa-f6f02a02f70e",
    name: "journal",
    color: '"#BFFFFB"',
    description: null,
  },
  health: {
    id: "018fefc3-b2af-72f6-9f86-cad359d7184c",
    name: "health",
    color: null,
    description: null,
  },
};

export const mockCategories: Omit<Category, "userId">[] = [
  categories.work,
  categories.home,
  categories.journal,
  categories.personal,
  categories.recipe,
];

export const mockNotes: Omit<Note, "userId">[] = [
  {
    id: "d75b94da-5c8e-4238-842d-b8438b91b565",
    title: "Meeting Notes",
    createdAt: new Date("2023-01-15T14:28:00.000Z"),
    updatedAt: new Date("2024-05-20T09:15:00.000Z"),
    content: "Discuss project milestones, deadlines, and responsibilities.",
    color: "#ffeb3b",
  },
  {
    id: "7d437a79-5b7d-4d52-9f42-f8b51e85b1a7",
    title: "Grocery List",
    createdAt: new Date("2023-12-01T10:00:00.000Z"),
    updatedAt: new Date("2024-02-10T11:30:00.000Z"),
    content: "Milk, Eggs, Bread, Butter, Chicken, Spinach, Apples.",
    color: "#8bc34a",
  },
  {
    id: "4e98c0bb-6e1f-4c1b-9e2b-446a8b9f92e3",
    title: "Daily Journal",
    createdAt: new Date("2023-06-10T07:15:00.000Z"),
    updatedAt: new Date("2024-01-15T08:45:00.000Z"),
    content:
      "Today was a productive day. Managed to complete the tasks on my to-do list and had a great workout session.",
    color: "#03a9f4",
  },
  {
    id: "f1e38b9a-dcf8-4f8e-bf84-11bcd5a2d50e",
    title: "Project Plan",
    createdAt: new Date("2023-11-05T15:30:00.000Z"),
    updatedAt: new Date("2024-03-25T12:00:00.000Z"),
    content:
      "Outline the project phases, deliverables, and timelines. Assign tasks to team members and set up regular check-in meetings.",
    color: "#ff9800",
  },
  {
    id: "e1b5d8f4-3d6f-4e2b-8f1c-1b3e2d4c5b6e",
    title: "Recipe: Chocolate Cake",
    createdAt: new Date("2023-08-20T14:00:00.000Z"),
    updatedAt: new Date("2024-04-10T16:15:00.000Z"),
    content:
      "Ingredients: Flour, Sugar, Cocoa powder, Baking powder, Eggs, Milk, Butter, Vanilla extract. Instructions: Mix dry ingredients, add wet ingredients, bake at 350°F for 30-35 minutes.",
    color: "#e91e63",
  },
];

const today = new Date();
today.setHours(22);
const yesterday = new Date(today);
today.setDate(today.getDate() - 1);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const nextMonth = new Date(today);
nextMonth.setDate(nextMonth.getDate() + 30);

export const mockTasks: Omit<Task, "userId">[] = [
  {
    id: "b1c4f1d2-5a3c-4d8e-b6f1-d8e6b5c3e4a1",
    title: "Complete project report",
    createdAt: new Date("2023-02-01T09:00:00.000Z"),
    updatedAt: new Date("2024-05-01T10:30:00.000Z"),
    description:
      "Prepare and finalize the project report for the last quarter.",
    state: "active",
    priority: "high",
    deadline: tomorrow,
  },
  {
    id: "d5e6c4b1-3f2e-4a5b-8e6d-f1b2c3d4e5a7",
    title: "Buy groceries",
    createdAt: new Date("2023-12-15T12:00:00.000Z"),
    updatedAt: new Date("2024-03-10T14:30:00.000Z"),
    description: "Purchase fruits, vegetables, and other household essentials.",
    state: "active",
    priority: "medium",
    deadline: yesterday,
  },
  {
    id: "e7d6c5b4-1f3a-4d7e-9e6b-f4d3c2b1a5e8",
    title: "Finish reading book",
    createdAt: new Date("2023-08-25T16:00:00.000Z"),
    updatedAt: new Date("2024-04-05T19:30:00.000Z"),
    description: "Complete reading 'The Great Gatsby' and write a review.",
    state: "active",
    priority: "low",
    deadline: nextMonth,
  },
  {
    id: "f8e7d6c5-4b3e-4a6d-9e7b-f5d4c3b1a6e8",
    title: "Schedule dentist appointment",
    createdAt: new Date("2023-11-10T08:00:00.000Z"),
    updatedAt: new Date("2024-01-20T09:45:00.000Z"),
    description: "Book a check-up and cleaning appointment with the dentist.",
    state: "active",
    priority: "medium",
    deadline: nextMonth,
  },
  {
    id: "a9f8e7d6-2b1a-4d9e-8e7f-f3d2c1b4a5e6",
    title: "Plan birthday party",
    createdAt: new Date("2023-10-05T14:00:00.000Z"),
    updatedAt: new Date("2024-02-28T16:30:00.000Z"),
    description:
      "Organize a birthday party, including venue, invitations, and catering.",
    state: "active",
    priority: "high",
    deadline: nextWeek,
  },
];
