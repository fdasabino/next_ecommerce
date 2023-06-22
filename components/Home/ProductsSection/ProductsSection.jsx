import { BsFillBagHeartFill } from "react-icons/bs";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsSection.module.scss";

const ProductsSection = ({ products }) => {
  return (
    <section className={styles.products_section}>
      <div className={styles.products_section__header}>
        <h2>Featured Products</h2>
        <BsFillBagHeartFill />
      </div>
      <div className={styles.products_section__swiper_wrapper}>
        {products &&
          products?.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
};

export default ProductsSection;
