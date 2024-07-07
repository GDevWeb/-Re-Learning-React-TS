import { useEffect, useState } from "react";
import useTodos from "../../hooks/useTodos";
import Form from "../formComponents/Form";
import ToDoList from "../todos/Todolist";

export default function TodosContainer() {
  const { todosState, addTask, handleCheck, handleDelete } = useTodos();

  const [filter, setFilter] = useState<string>("Toutes");

  useEffect(() => {
    document.title = "To do list en TS";
  }, []);

  const getFilteredTodos = () => {
    if (filter === "Complété") {
      return todosState.filter((todo) => todo.completed);
    } else if (filter === "Non complété") {
      return todosState.filter((todo) => !todo.completed);
    } else {
      return todosState;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow-lg">
      <Form />
      <ToDoList
        todos={getFilteredTodos()}
        handleDelete={handleDelete}
        handleCheck={handleCheck}
      />
    </div>
  );
}
