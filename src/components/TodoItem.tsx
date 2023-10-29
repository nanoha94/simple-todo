import React, { useState } from "react";
import { TodoType } from "../types/Todo";
import CustomSelect from "./CustomSelect";
import { TodoStatuses } from "../constants/TodoStatus";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";

interface Props {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  updateTodo: (todo: TodoType) => void;
}

const EditableInput = styled.input`
  height: calc(100% - 8px);
  padding: 4px 8px;
  font-size: 1rem;
  background-color: transparent;
  border: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 20px;
`;

const LeftItem = styled.div`
  font-size: inherit;
`;

const RightItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const TodoItem: React.FC<Props> = ({ todo, deleteTodo, updateTodo }) => {
  const [editTodo, setEditTodo] = useState<TodoType>(todo);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    e.currentTarget.blur();
  };

  const updateStatus = (status:string) => {
    setEditTodo({...editTodo, status:status});
    updateTodo({...editTodo, status:status});
  }

  return (
    <>
      <ListItem>
        <LeftItem>
          <EditableInput
            type="text"
            value={editTodo.title}
            onChange={(e) => {
              setEditTodo({...todo, title: e.target.value});
            }}
             onBlur={() => updateTodo(editTodo)}
            onKeyDown={onKeyDown}
          />
        </LeftItem>
        <RightItem>
          <CustomSelect options={TodoStatuses} value={editTodo.status} onChange={updateStatus}/>
          <Tooltip title="削除">
            <IconButton onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </RightItem>
      </ListItem>
    </>
  );
};

export default TodoItem;
