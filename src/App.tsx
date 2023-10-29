import "./App.css";
import { useState } from "react";
import { TodoType } from "./types/Todo";
import TodoList from "./components/TodoList";
import InputArea from "./components/InputArea";
import { Divider } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 400px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (newTodo: TodoType) => {
    console.log(newTodo);
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
    <Container>
      <InputArea
        addTodo={addTodo}
      />
      <Divider variant="middle" />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </Container>
  );
}

export default App;
