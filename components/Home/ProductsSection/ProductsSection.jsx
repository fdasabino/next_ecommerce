import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsSection.module.scss";

const ProductsSection = ({ products }) => {
  return (
    <div className={styles.products_section}>
      {products && products?.map((product) => <ProductCard key={product._id} product={product} />)}
    </div>
  );
};

export default ProductsSection;
