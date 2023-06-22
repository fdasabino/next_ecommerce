import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  return <div className={styles.product_card}>{product.name}</div>;
};

export default ProductCard;
