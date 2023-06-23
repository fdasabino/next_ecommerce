import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductSwiper from "../ProductSwiper/ProductSwiper";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [colors, setColors] = useState(product.subProducts.map((subProduct) => subProduct.color));
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes.map((size) => size.price)
  ).sort((a, b) => a - b);

  useEffect(() => {
    setImages(product.subProducts[active]?.images);
    setPrices(product.subProducts[active]?.sizes.map((size) => size.price).sort((a, b) => a - b));
    setColors(product.subProducts.map((subProduct) => subProduct.color));
  }, [active, product.subProducts, setPrices]);

  console.log("Images ==>", images);
  console.log("Prices ==>", prices);
  console.log("Colors ==>", colors);

  return (
    <div className={styles.product_card}>
      <div className={styles.product_card__container}>
        <Link href={`/product/${product.slug}?color=${active}`}>
          <ProductSwiper images={images} />
        </Link>

        {product.subProducts[active].discount ? (
          <div className={styles.product_card__discount}>
            <span>-{product.subProducts[active].discount}%</span>
          </div>
        ) : (
          ""
        )}

        <div className={styles.product_card__info}>
          <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
          <span>
            {prices.length === 1
              ? prices[0].toLocaleString() + "$"
              : `from ${prices[0].toLocaleString()}$ to  ${prices[
                  prices.length - 1
                ].toLocaleString()}$`}
          </span>

          <div className={styles.product_card__colors}>
            {colors &&
              colors.map((color, index) =>
                color.image ? (
                  <Image
                    key={index}
                    className={index === active && styles.active}
                    onMouseOver={() => {
                      setImages(product.subProducts[index].images);
                      setActive(index);
                    }}
                    src={color.image}
                    width={300}
                    height={300}
                    alt="color"
                  />
                ) : (
                  <span
                    key={index}
                    style={{ backgroundColor: `${color.color}` }}
                    onMouseOver={() => {
                      setImages(product.subProducts[index].images);
                      setActive(index);
                    }}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
