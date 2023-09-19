import Button from "@/components/Layout/Button/Button";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import ImageUpload from "../ImageUpload/ImageUpload";
import Select from "../Select/Select";
import styles from "./CreateReview.module.scss";

const CreateReview = ({ product }) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const fits = ["small", "perfect", "large"];

  const handleSize = (size) => {
    setSize(size);
  };

  const handleColor = (color) => {
    setColor(color);
  };

  const handleFit = (fit) => {
    setFit(fit);
  };

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  const handleRating = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 1024 * 1024 * 5; // 5MB
    const acceptedTypes = ["image/jpeg", "image/png", "image/webp"];

    const maxErrorMessage = "You can upload up to 3 images";
    const formatErrorMessage =
      "is not supported. Please make sure your image files are in jpg, jpeg, png, or webp format";
    const sizeErrorMessage = "is too large. Images size should be less than 5MB";

    if (files.length > 3) {
      toast.error(maxErrorMessage);
      return;
    }

    files.forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        toast.error(`${file.name} ${formatErrorMessage}`);
        return;
      } else if (file.size > maxSize) {
        toast.error(`${file.name} ${sizeErrorMessage}`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((images) => [...images, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (image) => {
    setImages(images.filter((x) => x !== image));
  };

  useEffect(() => {}, [rating]);

  return (
    <div className={styles.create_review}>
      <div className={styles.header}>
        <h3>Write a review</h3>
        <small>Let us know more so we can improve the quality of our products.</small>
        <hr />
      </div>
      <ImageUpload handleChange={handleImages} images={images} handleRemove={handleRemoveImage} />
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
          <div className={styles.inner_wrapper}>
            <Rating
              name="half-rating-read"
              defaultValue={0}
              value={rating}
              onChange={handleRating}
              precision={1}
            />
            <Button disabled={!review || !rating || !color || !fit || !size} style="tertiary">
              Submit review <AiOutlineArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
