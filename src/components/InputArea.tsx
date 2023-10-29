import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import { NON_STARTED, TodoStatuses } from "../constants/TodoStatus";
import CustomSelect from "./CustomSelect";
import { TodoType } from "../types/Todo";

interface Props {
  addTodo: (todo: TodoType) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputArea: React.FC<Props> = ({ addTodo}) => {
  const [todo, setTodo] = useState<TodoType>({
    id: 0,
    title: "",
    status: NON_STARTED,
    detail: "",
  });

  const createTodo = () => {
    addTodo(todo);
    setTodo({id: todo.id + 1, title: '', status: NON_STARTED, detail: ''});
  }


  return (
    <Container>
      <TextField
        type="text"
        label="タイトル（必須）"
        size="small"
        value={todo.title}
        onChange={(e) => {
          setTodo({ ...todo, title: e.target.value });
        }}
      />
      <TextField
        label="詳細"
        size="small"
        value={todo.detail}
        multiline
        rows={4}
        onChange={(e) => {
          setTodo({ ...todo, detail: e.target.value });
        }}
      />
      <CustomSelect
        options={TodoStatuses}
        value={todo.status}
        onChange={(status) => {
          setTodo({ ...todo, status: status });
        }}
      />
      <Button variant="contained" disabled={!todo.title ? true: false} onClick={createTodo}>
        追加
      </Button>
    </Container>
  );
};

export default InputArea;
