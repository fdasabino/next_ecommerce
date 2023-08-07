import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import React from "react";
import { MdErrorOutline } from "react-icons/md";
import styles from "./SingleSelectInput.module.scss";

const SingleSelectInput = ({ data, onChange, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {meta.error && meta.touched && (
        <div className={styles.error_message}>
          <span></span>
          <p>
            <ErrorMessage name={field.name} />
          </p>
          <MdErrorOutline />
        </div>
      )}
      <div>
        <FormControl fullWidth>
          <Select
            fullWidth
            variant="standard"
            name={field.name}
            select
            label={placeholder}
            value={field.value}
            onChange={onChange}
            className={`${styles.select} ${meta.touched && meta.error && styles.error_select}`}
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
    </>
  );
};

export default SingleSelectInput;
