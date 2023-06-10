import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ children, type, className, ...rest }) => {
  let buttonClass;

  switch (type) {
    case "primary":
      buttonClass = styles.btnPrimary;
      break;
    case "secondary":
      buttonClass = styles.btnSecondary;
      break;
    case "tertiary":
      buttonClass = styles.btnTertiary;
      break;
    default:
      buttonClass = styles.btnPrimary;
      break;
  }

  return (
    <button className={`${styles.button} ${buttonClass} ${className}`} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "primary",
  className: "",
};

export default Button;
