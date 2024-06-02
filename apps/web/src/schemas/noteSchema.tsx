import { z } from "zod";

export const formNoteInputSchema = z.object({
  title: z.string(),
  content: z.string(),
  tag: z.string(),
});
