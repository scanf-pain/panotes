import { BaseModelId, BaseModelTimestamps } from "./base";
import { Category } from "./categories";

export type NoteBasic = BaseModelId & {
  title: string;
};

export type Note = (NoteBasic & BaseModelTimestamps) & {
  content: string;
  color?: string;
  category?: Category[];
};

export type NoteEdit = Omit<Note, "id" | "createdOn" | "updatedOn">;
