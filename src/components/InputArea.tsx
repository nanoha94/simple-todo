import React from "react";
import { TextField, Button } from "@mui/material";
import styled from "@emotion/styled";

interface Props {
  addTodo: () => void;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const InputArea: React.FC<Props> = ({ addTodo, inputText, setInputText }) => {

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    addTodo();
  };


  return (
    <Container>
      <TextField
        sx={{ width: 320 }}
        type="text"
        label="追加するTODO"
        size="small"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyDown={onKeyDown}
      />
      <Button variant="contained" onClick={addTodo}>
        追加
      </Button>
    </Container>
  );
};

export default InputArea;
