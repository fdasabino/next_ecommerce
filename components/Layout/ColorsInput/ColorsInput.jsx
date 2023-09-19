/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import styles from "./ColorsInput.module.scss";

const ColorsInput = ({ name, product, setProduct, colorImage }) => {
  const [colors, setColors] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    const newColor = e.target.value;
    setProduct({
      ...product,
      color: {
        color: newColor,
        image: product.color.image,
      },
    });
  };

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
        <h2>Select one of the colors below</h2>
      </div>
      <ColorExtractor getColors={(colors) => setColors(colors)}>
        <img src={colorImage} style={{ display: "none" }} alt="color" />
      </ColorExtractor>
      <input
        type="text"
        value={product.color.color}
        name={name}
        onChange={handleInputChange}
        hidden
      />
      {colors.length > 0 && (
        <div className={styles.colors_info}>
          <div className={styles.color_wheel}>{renderSwatches()}</div>
        </div>
      )}
    </div>
  );
};

export default ColorsInput;
