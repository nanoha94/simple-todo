import React from "react";
import { useState } from "react";
import { Divider } from "@mui/material";
import { DbTodoType, TodoType } from "../types/Todo";
import InputArea from "../components/InputArea";
import TodoList from "../components/TodoList";
import { saveTodo } from "../firebase";

const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (newTodo: TodoType) => {
    saveTodo(newTodo);
  };

  const updateTodo = (updateTodo: TodoType) => {
    // const newTodos = todos.map((todo) =>
    //   todo.id === updateTodo.id ? updateTodo : todo
    // );
    // setTodos(newTodos);
    const newTodos = updateTodo;
  };

  const deleteTodo = (id: number) => {
    // const newTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(newTodos);
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
