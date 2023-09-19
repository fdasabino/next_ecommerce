import { Chip, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { useField } from "formik";
import React, { useEffect } from "react";
import styles from "./MultipleSelectInput.module.scss";

const MultipleSelectInput = ({
  data,
  handleChange,
  setSubs,
  value,
  name,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(name);

  useEffect(() => {
    setSubs(data);
  }, [data, setSubs]);

  const result = data.length
    ? data.reduce((obj, { _id, name }) => ({ ...obj, [_id]: name }), {})
    : {};

  return (
    <>
      <FormControl fullWidth>
        <InputLabel style={{ fontFamily: "Mulish", fontSize: "0.9rem" }}>
          {meta.touched && meta.error ? meta.error : placeholder}
        </InputLabel>
        <Select
          style={{ fontFamily: "Mulish", fontSize: "0.9rem" }}
          multiple
          fullWidth
          variant="outlined"
          name={name}
          select={field.select}
          label={placeholder}
          value={field.value}
          onChange={handleChange}
          className={`${styles.select} ${meta.touched && meta.error ? styles.error : ""}`}
          disabled={props.disabled}
          error={meta.touched && meta.error ? true : false}
          renderValue={(selected) => (
            <div>
              {selected.map((value) => (
                <Chip key={value} label={result[value]} />
              ))}
            </div>
          )}
        >
          {result &&
            Object.keys(result).map((id) => {
              return (
                <MenuItem key={id} value={id}>
                  <ListItemText primary={result[id]} />
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </>
  );
};

export default MultipleSelectInput;
