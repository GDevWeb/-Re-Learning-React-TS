import { nanoid } from "nanoid";
import { useState } from "react";
import todoArray, {
  EnumtodoItem as EnumtypeItem,
} from "../components/todos/todoArray";

export default function useTodos(initialTodos = todoArray) {
  const [todosState, setTodosState] = useState<EnumtypeItem[]>(initialTodos);

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
