import { Rating } from "@mui/material";
import styles from "./Reviews.module.scss";

const Reviews = ({ reviews, numReviews }) => {
  console.log(reviews);

  const arrayOfRatings = reviews.map((review) => review.rating);
  const averageRating =
    arrayOfRatings.reduce((acc, curr) => acc + curr, 0) / arrayOfRatings.length || 0;

  console.log(averageRating);

  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__title}>
        <h2>Customer Reviews ({numReviews || reviews.length})</h2>
      </div>
      <div className={styles.reviews__stats}>
        <div className={styles.reviews__stats__overview}>
          <span>Average Rating</span>
          <div className={styles.reviews__stats__overview_rating}>
            <Rating
              name="half-rating-read"
              defaultValue={averageRating}
              value={averageRating}
              precision={0.5}
              readOnly
            />
            <span>{averageRating === 0 ? "No reviews yet" : `${averageRating} stars`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
