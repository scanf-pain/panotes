import FormNote from "../components/forms/FormPost";
import { SubmitHandler } from "react-hook-form";
import { FormInputNote } from "../types";

function CreateNotePage() {
  const handleCreateNote: SubmitHandler<FormInputNote> = (data) => {
    console.log(data);
  };
  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold text-center">Add new Note</h1>
      <FormNote action="create" onSubmit={handleCreateNote} />
    </div>
  );
}

export default CreateNotePage;
