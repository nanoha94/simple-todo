import React from "react";
import { TodoType } from "../types/Todo";
import styled from "@emotion/styled";
import TodoItem from "./TodoItem";
import { Divider } from "@mui/material";

interface Props {
  todos: TodoType[];
  deleteTodo: (id: number) => void;
  updateTodo: (todo: TodoType) => void;
}

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const List = styled.ul`
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TodoList: React.FC<Props> = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <Container>
      <Title>TODOリスト</Title>
      <List>
        {todos.map((todo) => (
          <>
          <TodoItem
            key={todo.title}  // TODO: 見直し
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
          <Divider variant="middle" />
          </>
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
