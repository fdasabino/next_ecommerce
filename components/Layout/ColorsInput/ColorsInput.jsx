import { useState } from "react";
import { BlockPicker } from "react-color";
import { MdColorize } from "react-icons/md";
import Button from "../Button/Button";
import styles from "./ColorsInput.module.scss";

const ColorsInput = ({ name, product, setProduct }) => {
  const [pickerVisible, setPickerVisible] = useState(false);

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

  return (
    <div className={styles.color_picker}>
      <input
        type="text"
        value={product.color.color}
        name={name}
        onChange={handleInputChange}
        hidden
      />
      <Button onClick={() => setPickerVisible(!pickerVisible)}>
        Color Picker <MdColorize />
      </Button>
      {pickerVisible && (
        <div className={styles.picker}>
          <BlockPicker
            color={product.color.color}
            onChange={(newColor) => {
              setProduct({
                ...product,
                color: {
                  color: newColor.hex,
                  image: product.color.image,
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ColorsInput;
