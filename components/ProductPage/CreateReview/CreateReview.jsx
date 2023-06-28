import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import Select from "../Select/Select";
import styles from "./CreateReview.module.scss";

const CreateReview = ({ product }) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

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

  const handleReview = (e) => {
    setReview(e.target.value);
    console.log(review);
  };

  const handleRating = (e) => {
    setRating(parseInt(e.target.value));
  };

  useEffect(() => {}, [rating]);

  return (
    <div className={styles.create_review}>
      <div className={styles.header}>
        <h3>Write a review</h3>
        <small>Let us know more so we can improve the quality of our products.</small>
        <hr />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.select_container}>
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
        <div className={styles.review_container}>
          <textarea
            name="review"
            value={review}
            onChange={handleReview}
            placeholder="Write your review here..."
          />
          <Rating
            name="half-rating-read"
            defaultValue={0}
            value={rating}
            onChange={handleRating}
            precision={1}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
