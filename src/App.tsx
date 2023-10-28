import "./App.css";
import { useState } from "react";
import { TodoType } from "./types/Todo";
import TodoList from "./components/TodoList";
import { NON_STARTED } from "./constants/TodoStatus";
import InputArea from "./components/InputArea";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [nextId, setNextId] = useState<number>(0);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: nextId, title: newTodoTitle, status: NON_STARTED },
    ]);
    setNextId(nextId + 1);
    setNewTodoTitle("");
  };

  const updateTodo = (updateTodo:TodoType) => {
    const newTodos = todos.filter((todo) => todo.id !== updateTodo.id);
    setTodos([...newTodos, updateTodo]);
  }

  const deleteTodo = (id:number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <>
      <InputArea addTodo={addTodo} inputText={newTodoTitle} setInputText={setNewTodoTitle}/>
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
    </>
  );
}

export default App;
