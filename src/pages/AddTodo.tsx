import { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
import { NON_STARTED, TodoStatuses } from "../constants/TodoStatus";
import CustomSelect from "../components/CustomSelect";
import { db, dbTimestamp } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const [status, setStatus] = useState(NON_STARTED);
  const titleRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLTextAreaElement>(null);
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  // タイトルが入力されていたら、追加ボタンを有効化する
  const varidateTitle = () => {
    if (titleRef.current?.value) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  };

  const createTodo = async () => {
    const docRef = doc(collection(db, "todos"));
    await setDoc(docRef, {
      id: docRef.id,
      title: titleRef.current!.value,
      detail: detailRef.current!.value,
      status: status,
      created_at: dbTimestamp.now(),
      updated_at: dbTimestamp.now(),
    });

    // ホームに戻る
    navigate("/");
  };

  return (
    <Container>
      <Title>新規追加</Title>
      <InputContainer>
        <CustomSelect
          options={TodoStatuses}
          value={status}
          onChange={(status) => {
            setStatus(status);
          }}
        />
        <TextField
          inputRef={titleRef}
          sx={{ width: 1 }}
          type="text"
          label="タイトル（必須）"
          size="small"
          onChange={varidateTitle}
        />

        <TextField
          inputRef={detailRef}
          label="詳細"
          size="small"
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          disabled={isDisabledButton}
          onClick={createTodo}
        >
          追加
        </Button>
      </InputContainer>
    </Container>
  );
};

export default AddTodo;
