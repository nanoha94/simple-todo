import React, { useState } from "react";
import { TodoType } from "../types/Todo";
import CustomSelect from "./CustomSelect";
import { COMPLETED, PROGRESS, TodoStatuses } from "../constants/TodoStatus";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton, Tooltip, TextField, Divider, Button } from "@mui/material";
import { gray, green, orange } from "../constants/Color";

interface Props {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: TodoType) => void;
}

const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.div`
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

const Status = styled.span<{ status: string }>`
  padding: 2px 8px;
  color: white;
  background-color: ${(props) =>
    props.status === PROGRESS
      ? orange
      : props.status === COMPLETED
      ? green
      : gray};
  border-radius: 8px;
`;

const Title = styled.p`
  margin: 0;
  text-align: left;
  font-weight: bold;
`;

const Detail = styled.p`
  margin: 0;
  text-align: left;
  font-size: 0.8rem;
`;

const TodoItem: React.FC<Props> = ({ todo, deleteTodo, updateTodo }) => {
  const [isEdit, setIsEdit] = useState(false);
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
      {isEdit ? (
        <ListItem>
          <CustomSelect
            options={TodoStatuses}
            value={editTodo.status}
            onChange={updateStatus}
          />
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
          <Button
            variant="contained"
            disabled={!todo.title ? true : false}
            onClick={() => setIsEdit(false)}
          >
            追加
          </Button>
        </ListItem>
      ) : (
        <ListItem>
          <HorizontalLayout>
            <Status status={editTodo.status}>{editTodo.status}</Status>
            <HorizontalLayout>
              <Tooltip title="編集">
                <IconButton onClick={() => setIsEdit(true)}>
                  <ModeEditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="削除">
                <IconButton onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </HorizontalLayout>
          </HorizontalLayout>
          <Title>{editTodo.title}</Title>
          {editTodo.detail && <Detail>{editTodo.detail}</Detail>}
        </ListItem>
      )}
      <Divider variant="middle" />
    </Container>
  );
};

export default TodoItem;
