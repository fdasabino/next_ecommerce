import { useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductsList.module.scss";

const ProductsList = ({ products }) => {
  const [openId, setOpenId] = useState(null);
  const toggleDetailsById = (id) => {
    setOpenId((prevOpenId) => (prevOpenId === id ? null : id));
  };

  return (
    <div className={styles.product_list}>
      <div className={styles.header}>
        <h2>
          {products.length === 0
            ? "No products in your database"
            : products.length === 1
            ? `Current products ${products.length} item`
            : `Current products ${products.length} items`}
        </h2>
      </div>

      <div className={styles.products_container}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            product={product}
            openId={openId}
            toggleDetailsById={toggleDetailsById}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
