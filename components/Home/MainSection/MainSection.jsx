import MainSwiper from "../MainSwiper/MainSwiper";
import ProductsSection from "../ProductsSection/ProductsSection";
import styles from "./MainSection.module.scss";

const MainSection = ({ products }) => {
  return (
    <section className={styles.main_section}>
      <MainSwiper />
      <ProductsSection products={products} />
    </section>
  );
};

export default MainSection;
