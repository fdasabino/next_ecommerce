import { ErrorMessage, useField } from "formik";
import { AiOutlinePhone } from "react-icons/ai";
import { BiMap, BiUser } from "react-icons/bi";
import { GoNumber } from "react-icons/go";
import { IoKeyOutline } from "react-icons/io5";
import { MdAlternateEmail, MdErrorOutline } from "react-icons/md";
import styles from "./FormInput.module.scss";

const iconMap = {
  firstName: <BiUser />,
  lastName: <BiUser />,
  phoneNumber: <AiOutlinePhone />,
  state: <BiMap />,
  city: <BiMap />,
  zipCode: <GoNumber />,
  address1: <BiMap />,
  address2: <BiMap />,
  country: <BiMap />,
};

const ShippingInput = ({ icon, placeholder, ...props }) => {
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

export default ShippingInput;
