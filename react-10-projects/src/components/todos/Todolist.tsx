import todoArray from "./todoArray";
import TodoItem from "./TodoItem";

const Todolist = () => {
  // Render the todo items
  const renderTodoArray = todoArray.map((todo) => {
    const { id, name, completed } = todo;
    return <TodoItem key={id} id={id} name={name} completed={completed} />;
  });

  // Render the component
  return (
    <>
      <h2>Liste des tâches</h2>
      <ul>{renderTodoArray}</ul>
    </>
  );
};

export default Todolist;
