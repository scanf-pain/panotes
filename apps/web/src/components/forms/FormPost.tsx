import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@repo/ui/select";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  FormField,
} from "@repo/ui/form";
import { Textarea } from "@repo/ui/textarea";

import { type SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formNoteInputSchema } from "../../schemas/noteSchema";
import { FormInputNote } from "../../types";
import { create } from "domain";

export interface FormNoteProps {
  onSubmit: SubmitHandler<FormInputNote>;
  action: "edit" | "create";
}

function FormNote({ onSubmit, action }: FormNoteProps) {
  const form = useForm({
    resolver:
      zodResolver<z.infer<typeof formNoteInputSchema>>(formNoteInputSchema),
    defaultValues: {
      title: "",
      content: "",
      tag: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="note's title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="note's content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  className="max-w-md"
                  align="center"
                  position="item-aligned"
                >
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          {action === "create" ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
}

export default FormNote;
