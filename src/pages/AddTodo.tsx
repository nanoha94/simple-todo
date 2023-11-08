import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import { NON_STARTED, TodoStatuses } from "../constants/TodoStatus";
import { Todo } from "../types/Todo";
import CustomSelect from "../components/CustomSelect";
import { dbTimestamp } from "../firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  text-align: left;
`;

const AddTodo = () => {
  const [todo, setTodo] = useState<Todo>({
    id: "",
    title: "",
    detail: "",
    status: NON_STARTED,
    created_at: dbTimestamp.now(),
    updated_at: dbTimestamp.now(),
  });

  const createTodo = () => {
    // addTodo(todo);
    // setTodo({ title: "", status: NON_STARTED, detail: "" });
  };

  return (
    <Container>
      <Title>新規追加</Title>
      <InputContainer>
        <CustomSelect
          options={TodoStatuses}
          value={todo.status}
          onChange={(status) => {
            setTodo({ ...todo, status: status });
          }}
        />
        <TextField
          sx={{ width: 1 }}
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
        <Button
          variant="contained"
          disabled={!todo.title ? true : false}
          onClick={createTodo}
        >
          追加
        </Button>
      </InputContainer>
    </Container>
  );
};

export default AddTodo;
