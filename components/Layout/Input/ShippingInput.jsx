import { ErrorMessage, useField } from "formik";
import { CiDiscount1 } from "react-icons/ci";
import { GoNumber } from "react-icons/go";
import { MdErrorOutline } from "react-icons/md";
import { PiTextAaThin } from "react-icons/pi";
import styles from "./FormInput.module.scss";

const iconMap = {
  firstName: <PiTextAaThin />,
  lastName: <PiTextAaThin />,
  phoneNumber: <GoNumber />,
  state: <PiTextAaThin />,
  city: <PiTextAaThin />,
  zipCode: <GoNumber />,
  address1: <PiTextAaThin />,
  address2: <PiTextAaThin />,
  country: <PiTextAaThin />,
  coupon: <CiDiscount1 />,
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
        className={`${styles.form_input} ${
          meta.touched && meta.error ? styles.wrapper_error : ""
        }`}>
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
