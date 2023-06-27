import styles from "./Reviews.module.scss";

const Reviews = ({ reviews, numReviews }) => {
  console.log(reviews);
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__title}>
        <h2>Customer Reviews ({numReviews})</h2>
      </div>
    </div>
  );
};

export default Reviews;
