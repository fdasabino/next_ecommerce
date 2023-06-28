import { Rating } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import styles from "./ReviewTable.module.scss";

const ReviewTable = ({ reviews }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleVisible = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className={styles.review_table}>
      <div className={styles.review_table__header}>header</div>
      <div className={styles.review_table__body}>
        {reviews
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((reviewItem, index) => {
            const { createdAt, fit, images, rating, review, reviewBy, size, style, _id } =
              reviewItem;
            console.log(images);
            const { name, image } = reviewBy;
            const isOpen = index === openIndex;

            return (
              <div key={_id} className={styles.table__user}>
                <div onClick={() => handleVisible(index)} className={styles.user_wrapper}>
                  <div className={styles.user_wrapper_left}>
                    <Image src={image} width={400} height={400} alt={name} />
                    <span>{name.split(" ")[0]}</span>
                    <span>{new Date(createdAt).toLocaleDateString()}</span>
                    <Rating name="read-only" value={rating} readOnly />
                  </div>
                  <div className={style.user_wrapper_right}>
                    {isOpen ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
                  </div>
                </div>
                {isOpen && (
                  <div className={styles.table__body} onMouseLeave={() => setOpenIndex(null)}>
                    <div className={styles.table__body__info}>
                      <div className={styles.left}>
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
                              alt={name}
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
    </div>
  );
};

export default ReviewTable;
