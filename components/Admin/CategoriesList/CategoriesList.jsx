import Button from "@/components/Layout/Button/Button";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import styles from "./CategoriesList.module.scss";

const CategoriesList = ({ data: categories, setData: setCategories }) => {
  console.log(categories);
  return (
    <div className={styles.categories_list}>
      <div className={styles.header}>
        <h2>Current categories</h2>
      </div>

      {categories?.map((category) => (
        <div className={styles.category} key={category._id}>
          <div className={styles.category_name}>
            <h3>{category.name}</h3>
          </div>
          <div className={styles.category_actions}>
            <Button style="primary">
              <FiEdit />
            </Button>
            <Button style="danger">
              <BsTrash />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
