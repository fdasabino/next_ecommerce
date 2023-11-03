import Button from "@/components/Layout/Button/Button";
import DotLoader from "@/components/Layout/DotLoader/DotLoader";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import styles from "./ReviewTable.module.scss";

const ReviewTable = ({ reviews, productName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleReviews, setVisibleReviews] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [loadMoreCount, setLoadMoreCount] = useState(3);
    const [openIndex, setOpenIndex] = useState(null);

    const defaultImage =
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png";

    const handleVisible = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    useEffect(() => {
        setVisibleReviews(reviews.slice(0, currentPage * loadMoreCount));
    }, [currentPage, reviews, loadMoreCount]);

    const handleLoadMore = () => {
        setLoadMore(true);
        setTimeout(() => {
            setLoadMoreCount(loadMoreCount + 2);
            setCurrentPage(1);
            setLoadMore(false);
        }, 2000);
        return () => clearTimeout();
    };

    return (
        <div className={styles.review_table}>
            <div className={styles.review_table__header}>
                <h2>Reviews:</h2>
            </div>
            <div className={styles.review_table__body}>
                {visibleReviews
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((reviewItem, index) => {
                        const { createdAt, fit, images, rating, review, reviewBy, size, _id } =
                            reviewItem;
                        const name = reviewBy?.name;
                        const image = reviewBy?.image;
                        const isOpen = index === openIndex;

                        return (
                            <div key={_id} className={styles.table__user}>
                                <div
                                    onClick={() => handleVisible(index)}
                                    className={styles.user_wrapper}
                                >
                                    <div className={styles.user_wrapper_left}>
                                        <Image
                                            src={image ? image : defaultImage}
                                            width={400}
                                            height={400}
                                            alt={name ? name : "USER"}
                                        />
                                        <span>{name ? name.split(" ")[0] : "USER"}</span>
                                        <Rating name="read-only" value={rating} readOnly />
                                    </div>
                                    <div className={styles.user_wrapper_right}>
                                        {isOpen ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                                    </div>
                                </div>
                                {isOpen && (
                                    <div
                                        className={styles.table__body}
                                        onMouseLeave={() => setOpenIndex(null)}
                                    >
                                        <div className={styles.table__body__info}>
                                            <div className={styles.left}>
                                                <p>
                                                    Date:{" "}
                                                    <span>
                                                        {new Date(createdAt).toLocaleDateString()}
                                                    </span>
                                                </p>
                                                <p>
                                                    Fit: <span>{fit}</span>
                                                </p>
                                                <p>
                                                    Size: <span>{size}</span>
                                                </p>
                                            </div>
                                            <div className={styles.right}>
                                                {images.length > 0 &&
                                                    images.map((image, index) => (
                                                        <Image
                                                            key={index}
                                                            src={image.url}
                                                            width={400}
                                                            height={400}
                                                            alt={
                                                                productName
                                                                    ? productName
                                                                    : "PRODUCT"
                                                            }
                                                        />
                                                    ))}
                                            </div>
                                        </div>
                                        <hr />
                                        <div className={styles.table__body__review}>
                                            <p>{`"${review}"`}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>
            {visibleReviews.length < reviews.length && (
                <div className={styles.review_table__footer}>
                    {loadMore ? (
                        <DotLoader />
                    ) : (
                        <Button style="primary" onClick={handleLoadMore}>
                            Load More...
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReviewTable;
