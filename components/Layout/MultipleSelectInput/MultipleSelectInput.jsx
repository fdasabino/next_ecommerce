import { Chip, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { useField } from "formik";
import React, { useEffect } from "react";
import styles from "./MultipleSelectInput.module.scss";

const MultipleSelectInput = ({ data, handleChange, value, name, placeholder, ...props }) => {
  const [field, meta] = useField(name);

  useEffect(() => {
    props.setSubs(data);
  }, [data, props]);

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
          name={field.name}
          select={field.select}
          label={placeholder}
          value={field.value}
          onChange={handleChange}
          className={`${styles.select} ${meta.touched && meta.error ? styles.error : ""}`}
          disabled={props.disabled}
          error={meta.touched && meta.error ? true : false}
          {...field}
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
