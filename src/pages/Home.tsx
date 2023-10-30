import React from "react";
import { useState } from "react";
import { Divider } from "@mui/material";
import { TodoType } from "../types/Todo";
import InputArea from "../components/InputArea";
import TodoList from "../components/TodoList";

const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (newTodo: TodoType) => {
    setTodos([...todos, newTodo]);
  };

  const updateTodo = (updateTodo: TodoType) => {
    const newTodos = todos.map((todo) =>
      todo.id === updateTodo.id ? updateTodo : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <InputArea addTodo={addTodo} />
      <Divider variant="middle" />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </>
  );
};

export default Home;
