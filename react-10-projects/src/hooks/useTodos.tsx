import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import todoArray, {
  EnumtodoItem as EnumtypeItem,
} from "../components/todos/todoArray";

export default function useTodos(initialTodos = todoArray) {
  const [todosState, setTodosState] = useState<EnumtypeItem[]>(() => {
    // Load from localStorage if available, otherwise use initialTodos
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });

  // Save todos to localStorage whenever todoSate changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosState));
  }, [todosState]);

  // 2. ***Behavior*** :
  // CRUD :

  // Create:
  const addTask = (newTask: string) => {
    setTodosState((prevArray) => [
      ...prevArray,
      { id: nanoid(), name: newTask, completed: false },
    ]);
  };

  // Update:

  // Update checked:
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

  return {
    todosState,
    addTask,
    handleCheck,
    handleDelete,
  };
}
