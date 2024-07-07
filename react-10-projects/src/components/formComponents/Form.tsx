import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import useTodos from "../../hooks/useTodos"; // Adjust the path accordingly
import Filter from "../filter/Filter";
import ButtonForm from "../todos/Button";
import Input from "../todos/Input";
import Label from "../todos/Label";
import Todolist from "../todos/Todolist";

export default function Form() {
  // 1. ***State***
  const [inputState, setInputState] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Toutes");

  const { todosState, addTask, handleCheck, handleDelete } = useTodos();

  // Clear error message after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 20000);
    return () => clearTimeout(timer);
  }, [error]);

  // 2. ***Behavior***
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error && inputState.trim() !== "" && inputState.length > 3) {
      addTask(inputState);
      setInputState("");
    } else {
      setError(
        "Impossible de soumettre le formulaire dû à une erreur de validation"
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    try {
      if (value.trim() === "") {
        throw new Error("Veuillez saisir une chaîne de caractères non vide !");
      }

      if (typeof value !== "string") {
        throw new Error("Veuillez saisir une chaîne de caractères");
      }

      setError(null);
      setInputState(value);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleFilter = (e: MouseEvent<HTMLButtonElement>) => {
    const value: string = e.currentTarget.value;
    setFilter(value);
  };

  const getFilteredTodos = () => {
    if (filter === "Complété") {
      return todosState.filter((todo) => todo.completed);
    } else if (filter === "Non complété") {
      return todosState.filter((todo) => !todo.completed);
    } else {
      return todosState;
    }
  };

  // 3. ***Render***
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-lg">
      <h1 className="text-4xl text-center mb-4">Encore une todo liste </h1>
      <form onSubmit={handleSubmit} className="mb-4">
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

      <Todolist
        todos={getFilteredTodos()}
        handleDelete={handleDelete}
        handleCheck={handleCheck}
      />

      <Filter handleFilter={handleFilter} />
    </div>
  );
}
