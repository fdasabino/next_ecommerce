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
      </div>
    </div>
  );
};

export default ProductCard;
