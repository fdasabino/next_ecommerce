import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  return <div>{product.name}</div>;
};

export default ProductCard;
