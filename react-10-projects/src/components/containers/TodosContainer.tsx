import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useTodos from "../../hooks/useTodos";
import Filter from "../filter/Filter";
import Form from "../formComponents/Form";
import ToDoList from "../todos/Todolist";

export default function TodosContainer() {
  const { todosState, addTask, handleCheck, handleDelete } = useTodos();

  // 1.***State*** :
  const [inputState, setInputState] = useState<string>("Hello");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("Toutes");

  useEffect(() => {
    document.title = "To do list en TS";
  }, []);

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
      if (value.trim() === "" || typeof value !== "string") {
        throw new Error("Veuillez saisir une chaîne de caractères non vide !");
      }

      setError(null);
      setInputState(value);
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Filter :
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

  // 3. ***Render*** :
  return (
    <div className="max-w-max mx-auto mt-10 p-4 bg-white rounded shadow-lg">
      <Form
        handleSubmit={handleSubmit}
        inputState={inputState}
        handleInputChange={handleInputChange}
        error={error}
      />
      <ToDoList
        todos={getFilteredTodos()}
        handleDelete={handleDelete}
        handleCheck={handleCheck}
      />
      <Filter handleFilter={handleFilter} />
    </div>
  );
}
