import { useEffect, useState } from "react";
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

  return <div className={styles.product_card}>{product.name}</div>;
};

export default ProductCard;
