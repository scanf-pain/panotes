import { BaseModelId, BaseModelTimestamps } from "./base";
import { Category } from "./categories";

export type TaskBasic = BaseModelId & {
  title: string;
};

export type Task = (TaskBasic & BaseModelTimestamps) & {
  description: string;
  priority: TaskPriority;
  deadline: string;
  category?: Category;
  color?: string;
  note?: TaskBasic;
};

export type TaskPriority = "low" | "medium" | "high";

export type TaskEdit = Omit<Task, "id" | "createdOn" | "updatedOn">;
