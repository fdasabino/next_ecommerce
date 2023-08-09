import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useField } from "formik";
import React from "react";
import styles from "./SingleSelectInput.module.scss";

const SingleSelectInput = ({ data, onChange, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel style={{ fontFamily: "Mulish", fontSize: "0.9rem" }}>{placeholder}</InputLabel>
        <Select
          style={{ fontFamily: "Mulish", fontSize: "0.9rem" }}
          fullWidth
          variant="outlined"
          name={field.name}
          select={field.select}
          error={meta.touched && meta.error}
          label={placeholder}
          value={field.value}
          onChange={onChange}
          className={`${styles.select} ${meta.touched && meta.error ? styles.error : ""}`}
        >
          <MenuItem style={{ fontFamily: "Mulish", fontSize: "0.9rem" }} key="" value="">
            {placeholder}
          </MenuItem>
          {data.map((option) => (
            <MenuItem
              style={{ fontFamily: "Mulish", fontSize: "0.9rem" }}
              key={option.name}
              value={option.name}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SingleSelectInput;
