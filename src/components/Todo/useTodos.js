import { useState, useRef, useEffect } from "react";
import useInput from "./useInput";

function writeTodosLocalStorage(todos) {
  window.localStorage.setItem("todos-react", JSON.stringify(todos));
}

export default function useTodos() {
  const id = useRef(1);
  const { value, setValue, handleInputChange } = useInput();

  const [todos, setTodos] = useState(() => {

    let todoData = window.localStorage.getItem("todos-react") || "";

    if (todoData.length !== 0) {
      todoData = JSON.parse(todoData);
      id.current = todoData[0].id + 1;
    } 

    return todoData;
  });

  useEffect(() => {
    writeTodosLocalStorage(todos);
  }, [todos]);

  const handleButtonClick = () => {
    setTodos([
      {
        id: id.current,
        content: value,
        isDone: false,
      },
      ...todos,
    ]);
    id.current++;
    setValue("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return { ...todo };
      })
    );
  };

  return {
    id: id.current,
    todos,
    setTodos,
    handleButtonClick,
    handleDeleteTodo,
    handleToggleIsDone,
    value,
    setValue,
    handleInputChange,
  };
}
