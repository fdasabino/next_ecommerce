import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ children, style, className, ...rest }) => {
  let buttonClass;

  switch (style) {
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
    case "google":
      buttonClass = styles.btnGoogle;
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
  style: PropTypes.oneOf(["primary", "secondary", "tertiary", "danger", "google"]),
  className: PropTypes.string,
};

Button.defaultProps = {
  style: "primary",
  className: "",
};

export default Button;
