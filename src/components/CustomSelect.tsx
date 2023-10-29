import { Select, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";

interface Props {
  options: string[];
  value: string;
  onChange: (status: string) => void;
}

const CustomSelect: React.FC<Props> = ({ options, value, onChange }) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <>
      <Select
        sx={{ width: 100 }}
        value={selected}
        label="Status"
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
    </>
  );
};

export default CustomSelect;
