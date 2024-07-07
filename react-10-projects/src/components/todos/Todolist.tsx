import { EnumtodoItem as EnumtypeItem } from "../todos/todoArray";
import TodoItem from "./TodoItem";

interface ToDoListProps {
  todos: EnumtypeItem[];
  handleDelete: (id: string) => void;
  handleCheck: (id: string) => void;
}

export default function ToDoList({
  todos,
  handleDelete,
  handleCheck,
}: ToDoListProps) {
  return (
    <ul className="mb-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          name={todo.name}
          completed={todo.completed}
          handleDelete={() => handleDelete(todo.id)}
          handleCheck={() => handleCheck(todo.id)}
        />
      ))}
    </ul>
  );
}
