import React from "react";
import { useState } from "react";
import { Divider } from "@mui/material";
import { DbTodoType, TodoType } from "../types/Todo";
import InputArea from "../components/InputArea";
import TodoList from "../components/TodoList";
import { saveTodo } from "../fireabase";

const Home = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (newTodo: TodoType) => {
    // // setTodos([...todos, newTodo]);
    saveTodo(newTodo);

    // const timestamp = dbTimestamp.now();
    // const id = dbTodosRef.id;
    // const data: DbTodoType = {
    //   id,
    //   title: newTodo.title,
    //   detail: newTodo.detail,
    //   status: newTodo.status,
    //   created_at: timestamp,
    //   updated_at: timestamp,
    // };
    // console.log(data);

    // console.log(id);

    // dbTodosRef.doc(id).set(data);
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
