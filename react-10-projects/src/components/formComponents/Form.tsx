import { ChangeEvent, FormEvent } from "react";
import ButtonForm from "../todos/Button";
import Input from "../todos/Input";
import Label from "../todos/Label";

interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputState: string;
  error: string | null;
}

export default function Form({
  handleSubmit,
  inputState,
  handleInputChange,
  error,
}: FormProps) {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-lg">
      <h1 className="text-4xl text-center mb-4">Ma to do liste</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-white rounded shadow-lg mb-4"
      >
        <div className="formGroup mb-2">
          <Label name="inputName" title="Saisir nom de la tâche" />
          <Input
            type="text"
            inputState={inputState}
            handleInputChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <ButtonForm type="submit" textButton="Ajouter" />
      </form>
    </div>
  );
}
