import { BiUser } from "react-icons/bi";
import { IoKeyOutline } from "react-icons/io5";
import { SiMinutemailer } from "react-icons/si";
import styles from "./FormInput.module.scss";

const FormInput = ({ icon, placeholder }) => {
  return (
    <div className={styles.form_input}>
      {icon === "user" ? (
        <BiUser />
      ) : icon === "email" ? (
        <SiMinutemailer />
      ) : icon === "password" ? (
        <IoKeyOutline />
      ) : null}
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default FormInput;
