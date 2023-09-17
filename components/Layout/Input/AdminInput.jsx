import { ErrorMessage, useField } from "formik";
import { AiOutlineBarcode } from "react-icons/ai";
import { BsCalendar3, BsFillChatRightDotsFill, BsPercent } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import { FaCertificate } from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { MdErrorOutline } from "react-icons/md";
import { PiTextAaThin } from "react-icons/pi";
import styles from "./FormInput.module.scss";

const iconMap = {
  name: <PiTextAaThin />,
  lastName: <PiTextAaThin />,
  phoneNumber: <GoNumber />,
  state: <PiTextAaThin />,
  city: <PiTextAaThin />,
  zipCode: <GoNumber />,
  address1: <PiTextAaThin />,
  address2: <PiTextAaThin />,
  country: <PiTextAaThin />,
  coupon: <CiDiscount1 />,
  date: <BsCalendar3 />,
  discount: <BsPercent />,
  barCode: <AiOutlineBarcode />,
  brand: <FaCertificate />,
  description: <BsFillChatRightDotsFill />,
};

const AdminInput = ({ icon, placeholder, ...props }) => {
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
          onChange={props.onChange}
        />
      </div>
    </>
  );
};

export default AdminInput;
