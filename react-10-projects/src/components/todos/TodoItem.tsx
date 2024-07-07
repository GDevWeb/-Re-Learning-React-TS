import React, { memo } from "react";

interface TodoItemProps {
  id: string; // nanoid()
  name: string;
  completed: boolean;
  handleDelete: () => void;
  handleCheck: () => void;
}

const TodoItem: React.FC<TodoItemProps> = memo(
  ({ id, name, completed, handleDelete, handleCheck }) => {
    return (
      <li
        key={id}
        className="flex items-center justify-between gap-1 bg-gray-100 p-4 rounded mb-2 shadow-sm"
      >
        {" "}
        <span id={`label-${id}`}>{name}</span>
        <label htmlFor={name}></label>
        {completed ? "Terminé" : "En cours"}
        <input
          type="checkbox"
          name={name}
          id={id}
          checked={completed}
          onChange={handleCheck}
          aria-labelledby={`label-${id}`}
        />
        <button type="button" onClick={handleDelete}>
          ❌
        </button>
      </li>
    );
  }
);

export default TodoItem;
