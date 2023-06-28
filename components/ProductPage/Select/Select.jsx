import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import styles from "./Select.module.scss";

const Select = (props) => {
  const { property, text, data, handleChange } = props;
  const [visible, setVisible] = useState(false);

  console.log("data", data);
  console.log("property", property);
  return (
    <div className={styles.select}>
      <h2>{text}:</h2>
      <div className={styles.select__header} onClick={() => setVisible(!visible)}>
        <div>
          {text === "size" ? (
            <span>
              {property || `Select ${text}`} <AiOutlineArrowDown />
            </span>
          ) : text === "color" && property.image ? (
            <Image src={property.image} width={300} height={300} alt="color" />
          ) : (
            <span>
              Select {text} <AiOutlineArrowDown />
            </span>
          )}
        </div>
      </div>
      {visible && (
        <ul onMouseLeave={() => setVisible(false)} className={styles.select__menu}>
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
            if (text === "color")
              return (
                <li
                  style={{ backgroundColor: `${item.color}` }}
                  onClick={() => {
                    handleChange(item);
                    setVisible(false);
                  }}
                  key={i}
                  className={styles.select__menu__item}
                >
                  <span>
                    <Image src={item.image} width={300} height={300} alt="color" />
                  </span>
                </li>
              );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
