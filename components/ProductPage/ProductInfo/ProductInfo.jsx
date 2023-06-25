import { Rating } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./ProductInfo.module.scss";

const ProductInfo = ({ product, setActiveImage }) => {
  const router = useRouter();
  const { color, size } = router.query;
  const [selectedSize, setSelectedSize] = useState(+size);

  useEffect(() => {
    if (!selectedSize) {
      setSelectedSize(size);
    }
  }, [selectedSize, size]);

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

        {/* discount */}
        {selectedSize && (
          <div className={styles.product_info__discount}>
            {product.discount > 0 && (
              <>
                <small>{product.priceBeforeDiscount}$</small>
                <p>(-{product.discount}%)</p>
              </>
            )}
          </div>
        )}

        {/* price */}
        <div className={styles.product_info__price}>
          {!selectedSize && product.priceRange ? (
            <p>{product.priceRange}</p>
          ) : (
            <h2>{Math.floor(product.price).toFixed(2)}$</h2>
          )}
        </div>

        {/* Shipping */}
        <div className={styles.product_info__shipping}>
          {product.shipping ? (
            <small> {`+${product.shipping}$ shipping fee`}</small>
          ) : (
            <span>Free Shipping</span>
          )}
        </div>

        {/* quantity available */}
        <div className={styles.product_info__quantity}>
          {selectedSize ? (
            <span>
              Availability: {product.quantity} items available for size {product.sizes[size].size}
            </span>
          ) : (
            <small>{`Availability: ${product.sizes.reduce(
              (acc, curr) => acc + curr.qty,
              0
            )} items for all sizes`}</small>
          )}
        </div>

        {/* sizes */}
        <div className={styles.product_info__sizes}>
          {!selectedSize && <h4>Select a size:</h4>}
          <div className={styles.wrapper}>
            {product.sizes.map((s, i) => (
              <Link
                onClick={() => setSelectedSize(i)}
                key={i}
                href={`/product/${product.slug}?color=${color}&size=${i}`}
              >
                {console.log(+size, i)}
                <div
                  className={`${styles.product_info__sizes_size} ${
                    +size === i && styles.activeSize
                  }`}
                >
                  {s.size}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
