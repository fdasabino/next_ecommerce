import Rating from "@mui/material/Rating";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./ProductInfo.module.scss";

const ProductInfo = ({ product, setActiveImage }) => {
  const router = useRouter();
  const { color, size } = router.query;
  const [selectedSize, setSelectedSize] = useState(parseInt(size));
  const [selectedColor, setSelectedColor] = useState(parseInt(color));

  const {
    name,
    rating,
    numReviews,
    discount,
    priceBeforeDiscount,
    price,
    priceRange,
    shipping,
    colors,
    slug,
    sizes,
    quantity,
  } = product;

  const selectedSizeValue = selectedSize || size;
  const selectedColorValue = selectedColor || color;
  const isColorSelected = selectedColorValue === 0;

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
          <h1>{name}</h1>
        </div>

        {/* reviews */}
        <div className={styles.product_info__rating}>
          <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />
          <p>
            {numReviews} {numReviews === 1 ? "/ review" : "/ reviews"}
          </p>
        </div>

        {/* discount */}
        {selectedSizeValue && (
          <div className={styles.product_info__discount}>
            {discount > 0 && (
              <>
                <small>{priceBeforeDiscount}$</small>
                <p>(-{discount}%)</p>
              </>
            )}
          </div>
        )}

        {/* price */}
        <div className={styles.product_info__price}>
          {!selectedSizeValue && priceRange ? (
            <p>{priceRange}</p>
          ) : (
            <h2>{Math.floor(price).toFixed(2)}$</h2>
          )}
        </div>

        {/* Shipping */}
        <div className={styles.product_info__shipping}>
          {shipping ? <small> {`+${shipping}$ shipping fee`}</small> : <span>Free Shipping</span>}
        </div>

        {/* colors */}
        <div className={styles.product_info__colors}>
          {!selectedColorValue || (isColorSelected && <h4>Select a color:</h4>)}
          <div className={styles.wrapper}>
            {colors.length > 0 &&
              colors.map((c, i) => (
                <Link
                  key={i}
                  href={`/product/${slug}?color=${i}`}
                  onClick={() => setSelectedColor(i)}
                >
                  <div className={`${+color === i && styles.activeColor}`}>
                    <Image src={c.image} width={50} height={50} alt="current color" />
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* quantity available */}
        <div className={styles.product_info__quantity}>
          {selectedSizeValue ? (
            <span>Availability: {quantity} items available</span>
          ) : (
            <small>{`Availability: ${sizes.reduce(
              (acc, curr) => acc + curr.qty,
              0
            )} items for all sizes`}</small>
          )}
        </div>

        {/* sizes */}
        <div className={styles.product_info__sizes}>
          {!selectedSizeValue && <h4>Select a size:</h4>}
          <div className={styles.wrapper}>
            {sizes &&
              sizes.map((s, i) => (
                <Link
                  onClick={() => setSelectedSize(i)}
                  key={i}
                  href={`/product/${slug}?color=${color}&size=${i}`}
                >
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
