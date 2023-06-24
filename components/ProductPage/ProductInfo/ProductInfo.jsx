import { Rating } from "@mui/material";
import styles from "./ProductInfo.module.scss";

const ProductInfo = ({ product, setActiveImage }) => {
  return (
    <div className={styles.product_info}>
      <div className={styles.product_info__container}>
        {/* title */}
        <div className={styles.product_info__title}>
          <h1>{product.name}</h1>
        </div>

        {/* reviews */}
        <div className={styles.product_info__rating}>
          <Rating name="half-rating-read" defaultValue={product.rating} precision={0.5} readOnly />
          <p>
            {product.numReviews} {product.numReviews === 1 ? "/ review" : "/ reviews"}
          </p>
        </div>

        {/* price */}
        <div className={styles.product_info__price}>
          <p>{product.priceRange ? product.priceRange : Math.floor(product.price).toFixed(2)}</p>
        </div>

        {/* discount */}
        <div className={styles.product_info__discount}>
          {product.discount > 0 && (
            <>
              <small>{product.priceBeforeDiscount}$</small>
              <p>(-{product.discount}%)</p>
              <h2>{product.price}$</h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
