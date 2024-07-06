import { nanoid } from "nanoid";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import todoArray, { EnumtodoItem as EnumtypeItem } from "../todos/todoArray";
import TodoItem from "../todos/TodoItem";

export default function Form() {
  // 1. ***State***
  const [inputState, setInputState] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [todosState, setTodosState] = useState<EnumtypeItem[]>(todoArray);

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

    try {
      if (value.trim() === "") {
        throw new Error("Veuillez saisir une chaîne de caractères non vide !");
      }

      if (typeof value !== "string") {
        throw new Error("Veuillez saisir une chaîne de caractères");
      }

      if (value.length < 3) {
        throw new Error("Veuillez saisir une chaîne de 3 caractères minimum");
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

  const renderTodos = todosState.map((todo) => (
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="inputName">Nom de la tâche</label>
          <input
            type="text"
            name="inputName"
            id="inputName"
            placeholder="saisir le nom de la tâche"
            value={inputState}
            onChange={handleInputChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <button type="submit">Ajouter</button>
      </form>

      <ul>{renderTodos}</ul>
    </>
  );
}
