import React from "react";
import { TodoType } from "../types/Todo";
import styled from "@emotion/styled";
import TodoItem from "./TodoItem";

interface Props {
  todos: TodoType[];
  deleteTodo: (id: number) => void;
  updateTodo: (todo:TodoType) => void;
}

const List = styled.ul`
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TodoList: React.FC<Props> = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <>
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </List>
    </>
  );
};

export default TodoList;
