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

const HorizontalLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const InputArea: React.FC<Props> = ({ addTodo }) => {
  const [todo, setTodo] = useState<TodoType>({
    title: "",
    detail: "",
    status: NON_STARTED,    
  });

  const createTodo = () => {
    addTodo(todo);
    setTodo({ title: "", status: NON_STARTED, detail: "" });
  };

  return (
    <Container>
      <Title>新規追加</Title>
      <InputContainer>
        <HorizontalLayout>
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
          <CustomSelect
            options={TodoStatuses}
            value={todo.status}
            onChange={(status) => {
              setTodo({ ...todo, status: status });
            }}
          />
        </HorizontalLayout>
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

export default InputArea;
