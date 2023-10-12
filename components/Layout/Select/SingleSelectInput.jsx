import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ErrorMessage, useField } from "formik";
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
      <FormControl fullWidth>
        <InputLabel style={{ fontFamily: "Mulish", fontSize: "0.9rem" }}>
          {meta.touched && meta.error ? meta.error : placeholder}
        </InputLabel>
        <Select
          style={{ fontFamily: "Mulish", fontSize: "0.9rem" }}
          fullWidth
          variant="outlined"
          name={field.name}
          select={field.select}
          label={placeholder}
          value={field.value}
          onChange={onChange}
          className={`${styles.select} ${meta.touched && meta.error ? styles.error : ""}`}
          disabled={props.disabled}
          error={meta.touched && meta.error ? true : false}
        >
          <MenuItem style={{ fontFamily: "Mulish", fontSize: "0.9rem" }} key="" value="">
            {placeholder}
          </MenuItem>
          {data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((option) => (
              <MenuItem
                style={{ fontFamily: "Mulish", fontSize: "0.9rem" }}
                key={option._id}
                value={option._id || option.name}
              >
                {option.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SingleSelectInput;
