// Define the props interface
interface TodoItemProps {
  id: string; //nanoid
  name: string;
  completed: boolean;
  handleDelete: () => void;
  handleCheck: () => void;
}

// Define the TodoItem component
const TodoItem = ({
  id,
  name,
  completed,
  handleDelete,
  handleCheck,
}: TodoItemProps) => {
  //   // 1. ***State***

  //   // 2. ***Behavior***

  //   // 3. ***Render***

  return (
    <li key={id}>
      <label htmlFor={name}>
        {name}
        <input
          type="checkbox"
          name={name}
          id={id.toString()}
          checked={completed}
          onChange={handleCheck}
        />
      </label>
      <p>Status : {completed ? "Complété" : "Non complété"}</p>
      <button type="button" onClick={handleDelete}>
        ❌
      </button>
    </li>
  );
};

export default TodoItem;
