import { ErrorMessage, useField } from "formik";
import { useState } from "react"; // Import React and useState
import { BiUser } from "react-icons/bi";
import { IoEyeOffOutline, IoEyeOutline, IoKeyOutline } from "react-icons/io5";
import { MdAlternateEmail, MdErrorOutline } from "react-icons/md";
import styles from "./FormInput.module.scss";

const iconMap = {
    user: <BiUser />,
    email: <MdAlternateEmail />,
    password: <IoKeyOutline />,
};

const FormInput = ({ icon, placeholder, ...props }) => {
    const [field, meta] = useField(props);

    // Use state to manage password visibility
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

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
                }`}
            >
                {icon && iconMap[icon]}
                <input
                    className={`${meta.touched && meta.error ? styles.input_error : ""}`}
                    {...field}
                    {...props}
                    placeholder={placeholder}
                    type={icon === "password" ? (isPasswordVisible ? "text" : "password") : "text"} // Adjust type based on password visibility
                />
                {icon === "password" && (
                    <div className={styles.password_icon} onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </div>
                )}
            </div>
        </>
    );
};

export default FormInput;
