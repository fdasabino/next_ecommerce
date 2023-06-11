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
    case "danger":
      buttonClass = styles.btnDanger;
      break;
    default:
      buttonClass = styles.btnPrimary;
      break;
  }

  return (
    <button className={`${buttonClass} ${className}`} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["primary", "secondary", "tertiary", "danger"]),
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "primary",
  className: "",
};

export default Button;
