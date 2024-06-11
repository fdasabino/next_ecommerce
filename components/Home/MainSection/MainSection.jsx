import MainSwiper from "../MainSwiper/MainSwiper";
import ProductsSection from "../ProductsSection/ProductsSection";
import styles from "./MainSection.module.scss";

const MainSection = ({ products }) => {
  // sort products by category
  const sortedProducts = products.reduce((acc, product) => {
    const category = product.category.name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  const productsByCategory = Object.keys(sortedProducts).map((category) => {
    return {
      category,
      products: sortedProducts[category],
    };
  });

  return (
    <section className={styles.main_section}>
      <MainSwiper />
      {productsByCategory.map((category) => {
        if (category.category !== "Men's Fashion" && category.category !== "Women's Fashion")
          return;

        return (
          <ProductsSection
            key={category.category}
            category={category.category}
            products={category.products}
          />
        );
      })}
    </section>
  );
};

export default MainSection;
