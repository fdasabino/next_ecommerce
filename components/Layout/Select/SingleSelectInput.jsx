import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import React from "react";
import { MdErrorOutline } from "react-icons/md";
import styles from "./SingleSelectInput.module.scss";

const SingleSelectInput = ({ data, onChange, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>{meta.touched && meta.error ? "Country is required" : placeholder}</InputLabel>
        <Select
          fullWidth
          variant="outlined"
          name={field.name}
          select
          error={meta.touched && meta.error}
          label={meta.touched && meta.error ? "Country is required" : placeholder}
          value={field.value}
          onChange={onChange}
          className={`${styles.select} ${meta.touched && meta.error ? styles.error : ""}`}
        >
          <MenuItem key="" value="">
            {placeholder}
          </MenuItem>
          {data.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SingleSelectInput;
