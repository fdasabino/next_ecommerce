/* eslint-disable @next/next/no-img-element */
import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { BsChevronBarUp } from "react-icons/bs";
import styles from "./ColorsInput.module.scss";

const ColorsInput = ({ name, product, setProduct, colorImage, ...props }) => {
  const [colors, setColors] = useState([]);
  const [meta, field] = useField(name);
  const [toggle, setToggle] = useState(true);

  const renderSwatches = () => {
    return colors.map((color, index) => {
      return (
        <div
          className={styles.swatch}
          key={index}
          style={{ backgroundColor: color }}
          onClick={() => {
            setProduct({
              ...product,
              color: {
                color,
                image: product.color.image,
              },
            });
          }}
        />
      );
    });
  };

  return (
    <div className={styles.colors}>
      <div className={styles.header}>
        {colors.length > 0 && (
          <>
            <h2>Select one of the colors below</h2>
            <BsChevronBarUp
              style={toggle ? { transform: "rotate(180deg)" } : ""}
              onClick={() => setToggle((prev) => !prev)}
            />
          </>
        )}
        {meta.touched && meta.error && (
          <span className={styles.error_msg}>
            <span></span>
            <ErrorMessage name={name} />
          </span>
        )}
      </div>
      <ColorExtractor getColors={(colors) => setColors(colors)}>
        <img src={colorImage} style={{ display: "none" }} alt="color" />
      </ColorExtractor>
      <input type="text" value={product.color.color} name={name} hidden {...field} {...props} />
      {colors.length > 0 && toggle && (
        <div className={styles.colors_info}>
          <div className={styles.color_wheel}>{renderSwatches()}</div>
        </div>
      )}
    </div>
  );
};

export default ColorsInput;
