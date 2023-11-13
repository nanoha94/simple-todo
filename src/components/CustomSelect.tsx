import styled from "@emotion/styled";
import { Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";

interface Props {
  options: string[];
  value: string;
  onChange: (status: string) => void;
}

const Container = styled.div`
  margin-left: 0;
  margin-right: auto;
`;

const CustomSelect: React.FC<Props> = ({ options, value, onChange }) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <Container>
      <Select
        value={selected}
        size="small"
        onChange={(e) => {
          onChange(e.target.value);
          setSelected(e.target.value);
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
};

export default CustomSelect;
