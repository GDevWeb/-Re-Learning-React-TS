import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import Input from "../todos/Input";
import Label from "../todos/Label";
import todoArray, { EnumtodoItem as EnumtypeItem } from "../todos/todoArray";
import TodoItem from "../todos/TodoItem";

export default function Form() {
  // 1. ***State***
  const [inputState, setInputState] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [todosState, setTodosState] = useState<EnumtypeItem[]>(todoArray);
  const [filter, setFilter] = useState<string>("Toutes");

  // LocalStorage :

  // ClearErrorMessage  after 20 secondes:
  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 20000);
  }, [error]);

  // 2. ***Behavior***
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error && inputState.trim() !== "" && inputState.length > 3) {
      addTask(inputState);
      setInputState("");
    } else {
      console.error(
        "Impossible de soumettre le formulaire dû à une erreur de validation"
      );
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
      console.error(error.message);
    }
  };

  // CRUD :

  // Create:
  const addTask = (newTask: string) => {
    console.log("Nouvelle tâche :", newTask);
    setTodosState((prevArray) => [
      ...prevArray,
      { id: nanoid(), name: newTask, completed: false },
    ]);
  };

  // Update:

  // update checked:
  const handleCheck = (id: string) => {
    setTodosState((prevArray) =>
      prevArray.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete:
  const handleDelete = (id: string) => {
    const updatedTodos = todosState.filter((todo) => todo.id !== id);
    setTodosState(updatedTodos);
  };

  // filter :
  /**
   * handleFilter filtered by state completed || !completed
   *
   */
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

  const renderTodos = getFilteredTodos().map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      name={todo.name}
      completed={todo.completed}
      handleDelete={() => handleDelete(todo.id)}
      handleCheck={() => handleCheck(todo.id)}
    />
  ));

  // 3. ***Render***
  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-lg">
      <h1 className="text-4xl text-center mb-4">Encore une todo liste </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="formGroup mb-2">
          <Label name={"inputName"} title={"Saisir nom de la tâche"} />
          <Input
            type={"text"}
            inputState={inputState}
            handleInputChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Ajouter
        </button>
      </form>

      <ul className="mb-4">{renderTodos}</ul>

      <div id="filter" className="flex justify-around">
        <button
          onClick={handleFilter}
          type="button"
          value="Complété"
          className="px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-500"
        >
          Terminées
        </button>
        <button
          onClick={handleFilter}
          type="button"
          value="Non complété"
          className="px-3 py-1 bg-yellow-700 text-white rounded-md hover:bg-yellow-500"
        >
          Non complétées
        </button>
        <button
          onClick={handleFilter}
          type="button"
          value="Toutes"
          className="px-3 py-1 bg-gray-700 text-white rounded-md 
          hover:bg-gray-500
          "
        >
          Toutes
        </button>
      </div>
    </div>
  );
}
