import { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import styles from "./Select.module.scss";

const Select = (props) => {
  const { property, text, data, handleChange } = props;
  const [visible, setVisible] = useState(false);

  console.log("data", data);
  return (
    <div className={styles.select}>
      <h2>{text}:</h2>
      <div className={styles.select__header} onClick={() => setVisible(!visible)}>
        <div>
          {property ? (
            <span>{property}</span>
          ) : (
            <span>
              Select {text} <AiOutlineArrowDown />{" "}
            </span>
          )}
        </div>
      </div>
      {visible && (
        <ul className={styles.select__menu}>
          {data.map((item, i) => {
            if (text === "size")
              return (
                <li
                  onClick={() => {
                    handleChange(item.size);
                    setVisible(false);
                  }}
                  key={i}
                  className={styles.select__menu__item}
                >
                  <span>{item.size}</span>
                </li>
              );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
