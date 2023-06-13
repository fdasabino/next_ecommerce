import { ErrorMessage, useField } from "formik";
import { BiUser } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import { MdAlternateEmail, MdErrorOutline } from "react-icons/md";
import styles from "./FormInput.module.scss";

const iconMap = {
  user: <BiUser />,
  email: <MdAlternateEmail />,
  password: <IoKeyOutline />,
};

const FormInput = ({ icon, placeholder, ...props }) => {
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
      <div
        className={`${styles.form_input} ${meta.touched && meta.error ? styles.wrapper_error : ""}`}
      >
        {icon && iconMap[icon]}
        <input
          className={`${meta.touched && meta.error ? styles.input_error : ""}`}
          {...field}
          {...props}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default FormInput;
