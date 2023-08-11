import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Calculator() {
  const [row, setRow] = useState([
    {
      value: "",
      operator: "+",
      isDisabled: false,
    },
  ]);
  const [value, setValue] = useState();

  const onAddRow = (index, value) => {
    setRow([...row, { value: "", operator: "+", isDisabled: false }]);
  };

  const onChangeValue = (index, value) => {
    setRow(
      row.map((item, i) => (i === index ? { ...item, value: value } : item))
    );
  };
  const onChangeOperator = (index, operator) => {
    setRow(
      row.map((item, i) =>
        i === index ? { ...item, operator: operator } : item
      )
    );
  };
  const onDisable = (index, isDisabled) => {
    setRow(
      row.map((item, i) =>
        i === index ? { ...item, isDisabled: isDisabled } : item
      )
    );
  };
  const onDelete = (index) => {
    setRow(row.filter((item, i) => index !== i));
  };

  useEffect(() => {
    let sum = 0;
    for (const obj of row) {
      if (obj.value && !obj.isDisabled) {
        const expression = `${sum} ${obj.operator} ${obj.value}`;
        const result = eval(expression);
        sum = result;
      }
    }

    setValue(sum);
  }, [row]);

  return (
    <div style={{ backgroundColor: "white", padding: 50, borderRadius: 10 }}>
      <div>
        <Button variant="contained" onClick={onAddRow}>
          Add row
        </Button>
      </div>
      <ul>
        {row.map((item, index) => (
          <li>
            <div style={{ margin: 20 }}>
              <select
                onChange={(e) => {
                  onChangeOperator(index, e.target.value);
                }}
              >
                <option selected={item.operator === "+"}>+</option>
                <option selected={item.operator === "-"}>-</option>
              </select>
              <TextField
                style={{ marginLeft: 10, marginRight: 10 }}
                onChange={(e) => {
                  onChangeValue(index, e.target.value);
                }}
                id="outlined-required"
                defaultValue="100"
                value={item.value}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  onDelete(index);
                }}
              >
                Delete
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                variant="outlined"
                onClick={() => {
                  onDisable(index, !item.isDisabled);
                }}
              >
                {item.isDisabled ? "UnDisable" : "Disable"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ color: "black" }}>Result: {value}</div>
    </div>
  );
}
