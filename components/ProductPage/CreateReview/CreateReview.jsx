import { useState } from "react";
import Select from "../Select/Select";
import styles from "./CreateReview.module.scss";

const CreateReview = ({ product }) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [fit, setFit] = useState("");

  const fits = ["small", "perfect", "large"];

  const handleSize = (size) => {
    setSize(size);
    console.log(size);
  };

  const handleColor = (color) => {
    setColor(color);
    console.log(color);
  };

  const handleFit = (fit) => {
    setFit(fit);
    console.log(fit);
  };

  console.log("color", color);
  console.log(product);

  return (
    <div className={styles.create_review}>
      <div className={styles.header}>
        <h3>Write a review</h3>
        <small>Let us know more so we can improve the quality of our products.</small>
        <hr />
      </div>
      <div className={styles.container}>
        <Select
          property={size}
          text="size"
          data={product.allSizes.filter((x) => x.size !== size)}
          handleChange={handleSize}
        />
        <Select
          property={color}
          text="color"
          data={product.colors.filter((x) => x !== color)}
          handleChange={handleColor}
        />
        <Select
          property={fit}
          text="fit"
          data={fits.filter((x) => x !== fit)}
          handleChange={handleFit}
        />
      </div>
    </div>
  );
};

export default CreateReview;
