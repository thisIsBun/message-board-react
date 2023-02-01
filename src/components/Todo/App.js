import TodoItem from "./TodoItem";
import Input from "./Input";
import useTodos from "./useTodos";

function App() {
  const {
    todos,
    handleButtonClick,
    handleDeleteTodo,
    handleToggleIsDone,
    value,
    handleInputChange,
  } = useTodos();

  return (
    <div className="App">
      <Input
        type="text"
        placeholder="todo"
        value={value}
        handleInputChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Add Todo</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleIsDone={handleToggleIsDone}
        />
      ))}
    </div>
  );
}

export default App;
