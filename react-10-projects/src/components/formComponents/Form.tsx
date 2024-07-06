import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import todoArray, { EnumtodoItem as EnumtypeItem } from "../todos/todoArray";
import TodoItem from "../todos/TodoItem"; // Correct import path

export default function Form() {
  // 1. ***State***
  const [inputState, setInputState] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [todosState, setTodosState] = useState<EnumtypeItem[]>(todoArray);
  const [filter, setFilter] = useState<string>("Toutes");

  useEffect(() => {
    console.log(todosState);
  }, [todosState]);

  // 2. ***Behavior***
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error && inputState.trim() !== "") {
      addTask(inputState);
      setInputState("");
    } else {
      console.error(
        "Impossible de soumettre le formulaire dû à une erreur de validation"
      );
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // try {
    //   if (value.trim() === "") {
    //     throw new Error("Veuillez saisir une chaîne de caractères non vide !");
    //   }

    //   if (typeof value !== "string") {
    //     throw new Error("Veuillez saisir une chaîne de caractères");
    //   }

    //   if (value.length < 3) {
    //     throw new Error("Veuillez saisir une chaîne de 3 caractères minimum");
    //   }

    //   setError(null);
    //   setInputState(value);
    // } catch (error: any) {
    //   setError(error.message);
    //   console.error(error.message);
    // }

    setInputState(value);
    setError(null);
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
      <h1 className="text-xl text-center">Encore une todo liste </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="formGroup mb-2">
          <label
            htmlFor="inputName"
            className="block text-sm font-medium text-gray-700"
          >
            Nom de la tâche
          </label>
          <input
            type="text"
            name="inputName"
            id="inputName"
            placeholder="Saisir le nom de la tâche"
            value={inputState}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
          className="px-3 py-1 bg-green-500 text-white rounded-md"
        >
          Terminées
        </button>
        <button
          onClick={handleFilter}
          type="button"
          value="Non complété"
          className="px-3 py-1 bg-yellow-500 text-white rounded-md"
        >
          Non complétées
        </button>
        <button
          onClick={handleFilter}
          type="button"
          value="Toutes"
          className="px-3 py-1 bg-gray-500 text-white rounded-md"
        >
          Toutes
        </button>
      </div>
    </div>
  );
}
