import React, { useState } from "react";
import { TodoType } from "../types/Todo";
import CustomSelect from "./CustomSelect";
import { TodoStatuses } from "../constants/TodoStatus";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip, TextField } from "@mui/material";

interface Props {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: TodoType) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HorizontalLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const TodoItem: React.FC<Props> = ({ todo, deleteTodo, updateTodo }) => {
  const [editTodo, setEditTodo] = useState<TodoType>(todo);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    e.currentTarget.blur();
  };

  const updateStatus = (status: string) => {
    setEditTodo({ ...editTodo, status: status });
    updateTodo({ ...editTodo, status: status });
  };

  return (
    <Container>
      <ListItem>
        <HorizontalLayout>
          <TextField
            sx={{ width: 1 }}
            type="text"
            label="タイトル"
            size="small"
            value={editTodo.title}
            onChange={(e) => {
              setEditTodo({ ...todo, title: e.target.value });
            }}
            onBlur={() => updateTodo(editTodo)}
            onKeyDown={onKeyDown}
          />
          <HorizontalLayout>
            <CustomSelect
              options={TodoStatuses}
              value={editTodo.status}
              onChange={updateStatus}
            />
            <Tooltip title="削除">
              <IconButton onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </HorizontalLayout>
        </HorizontalLayout>
        <TextField
          label="詳細"
          size="small"
          multiline
          rows={4}
          value={editTodo.detail}
          onChange={(e) => {
            setEditTodo({ ...todo, detail: e.target.value });
          }}
          onBlur={() => updateTodo(editTodo)}
        />
      </ListItem>
    </Container>
  );
};

export default TodoItem;
