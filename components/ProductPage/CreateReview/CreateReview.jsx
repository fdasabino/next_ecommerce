import { useState } from "react";
import Select from "../Select/Select";
import styles from "./CreateReview.module.scss";

const CreateReview = ({ product }) => {
  const [size, setSize] = useState("");
  const handleSize = (size) => {
    setSize(size);
    console.log(size);
  };

  console.log(product);

  return (
    <div className={styles.create_review}>
      <div className={styles.header}>
        <h3>Write a review</h3>
        <hr />
      </div>
      <div className={styles.container}>
        <Select property={size} text="size" data={product.allSizes} handleChange={handleSize} />
      </div>
    </div>
  );
};

export default CreateReview;
