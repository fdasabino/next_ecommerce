import { Rating } from "@mui/material";
import styles from "./Reviews.module.scss";

const Reviews = ({ reviews, numReviews }) => {
    let arrayOfRatings = [];
    let averageRating = 0;
    if (Array.isArray(reviews) && reviews.length > 0) {
        arrayOfRatings = reviews.map((review) => review.rating);
        averageRating = (
            arrayOfRatings.reduce((acc, curr) => acc + curr, 0) / arrayOfRatings.length
        ).toFixed(1);
    }

    const countReviews = (ratings) => {
        const reviewCount = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        ratings.forEach((rating) => {
            reviewCount[rating]++;
        });

        return reviewCount;
    };

    const calculateRatingPercentage = (ratings) => {
        const ratingCount = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        ratings.forEach((rating) => {
            ratingCount[rating]++;
        });

        const totalCount = ratings.length;
        const ratingPercentage = {};

        for (const key in ratingCount) {
            const count = ratingCount[key];
            const percentage = (count / totalCount) * 100;
            ratingPercentage[key] = percentage.toFixed(0);
        }

        return ratingPercentage;
    };

    const reviewCount = countReviews(arrayOfRatings);
    const ratingPercentage = calculateRatingPercentage(arrayOfRatings);

    return (
        <div className={styles.reviews}>
            <div className={styles.reviews__title}>
                <h2>Customer Reviews ({numReviews})</h2>
            </div>
            <div className={styles.reviews__stats}>
                <div className={styles.stats_overview}>
                    {reviews && reviews.length > 0 && <span>Average Rating</span>}
                    <div className={styles.overview_rating}>
                        {averageRating > 0 && (
                            <Rating
                                precision={0.5}
                                name="half-rating-read"
                                defaultValue={Number(averageRating)}
                                value={Number(averageRating)}
                                readOnly
                            />
                        )}
                        <span>
                            {averageRating === 0 ? "No reviews yet" : `${averageRating} stars`}
                        </span>
                    </div>
                </div>
                {/* Breakdown of reviews by star rating */}
                {reviews && reviews.length > 0 && (
                    <div className={styles.reviews__stats_breakdown}>
                        <div className={styles.breakdown_left}>
                            {Object.entries(reviewCount)
                                .sort((a, b) => a[1] - b[1]) // Sort by review count in descending order
                                .map(([key, value]) => {
                                    const starRating = parseInt(key);
                                    if (value > 0) {
                                        return (
                                            <div
                                                key={key}
                                                className={styles.rating_stats}>
                                                <small>{`${value} ${
                                                    value === 1 ? "review" : "reviews"
                                                }`}</small>
                                                <Rating
                                                    name="half-rating-read"
                                                    defaultValue={starRating}
                                                    value={starRating}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                            </div>
                                        );
                                    }
                                    return null; // Exclude entries with review count 0
                                })}
                        </div>
                        <div className={styles.breakdown_right}>
                            {Object.entries(ratingPercentage).map(([key, value]) => {
                                if (value === "0") return null; // Exclude entries with review count 0
                                return (
                                    <div
                                        key={key}
                                        className={styles.rating_bar_wrapper}>
                                        <div
                                            key={key}
                                            className={styles.rating_bar}>
                                            <div
                                                className={styles.rating_bar_fill}
                                                style={{
                                                    width: `${value}%`,
                                                    background:
                                                        value < 20
                                                            ? "red"
                                                            : value < 40
                                                            ? "orangeRed"
                                                            : value < 60
                                                            ? "blue"
                                                            : value <= 100
                                                            ? "green"
                                                            : "",
                                                }}
                                            />
                                        </div>
                                        <span>{value}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Reviews;
