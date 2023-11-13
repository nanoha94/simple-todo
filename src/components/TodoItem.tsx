import { useState } from "react";
import { Todo } from "../types/Todo";
import CustomSelect from "./CustomSelect";
import { TodoStatuses, statusColor } from "../constants/TodoStatus";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton, Tooltip, TextField, Divider, Button } from "@mui/material";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db, dbTimestamp } from "../firebase";

interface Props {
  todo: Todo;
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
  font-weight: bold;
  color: white;
  background-color: ${(props) => statusColor(props.status)};
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
  white-space: pre-wrap;
`;

const TodoItem = ({ todo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo>(todo);

  const updateChanges = () => {
    updateTodo(editTodo);
    setIsEdit(false);
  };

  const updateTodo = async (updateTodo: Todo) => {
    await updateDoc(doc(db, "todos", updateTodo.id), {
      ...updateTodo,
      updated_at: dbTimestamp.now(),
    });
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <Container>
      {isEdit ? (
        <ListItem>
          <CustomSelect
            options={TodoStatuses}
            value={editTodo.status}
            onChange={(status) => setEditTodo({ ...editTodo, status: status })}
          />
          <TextField
            sx={{ width: 1 }}
            type="text"
            label="タイトル"
            size="small"
            value={editTodo.title}
            onChange={(e) => {
              setEditTodo({ ...editTodo, title: e.target.value });
            }}
          />
          <TextField
            label="詳細"
            size="small"
            multiline
            rows={4}
            value={editTodo.detail}
            onChange={(e) => {
              setEditTodo({ ...editTodo, detail: e.target.value });
            }}
            onBlur={() => updateTodo(editTodo)}
          />
          <Button
            variant="contained"
            disabled={!todo.title ? true : false}
            onClick={updateChanges}
          >
            完了
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
                <IconButton onClick={() => deleteTodo(editTodo.id)}>
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
