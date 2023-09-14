import Button from "@/components/Layout/Button/Button";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineStop } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import styles from "./CategoriesList.module.scss";

const CategoriesList = ({ data: categories, setData: setCategories }) => {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [name, setName] = useState("");

  // edit category by id
  const editCategoryHandler = (id) => {
    setEditCategoryId(id === editCategoryId ? null : id);
  };

  // handle input change
  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
  };

  // handle delete category
  const handleDeleteCategory = async (id) => {
    try {
      const res = await axios.put("/api/admin/category", { data: { id } });
      console.log(res.data); // Add this line to check the response
      setCategories(res.data.categories);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error); // Add this line to log the error
      toast.error(error.response.data.error);
    }
  };

  // handle update category
  const handleUpdateCategory = async (id) => {
    console.log(id);
    setEditCategoryId(null);
  };

  return (
    <div className={styles.categories_list}>
      <div className={styles.header}>
        <h2>{categories.length > 0 ? "Current categories" : "No categories to show"}</h2>
      </div>

      {categories?.map((category) => (
        <div className={styles.category} key={category._id}>
          <div className={styles.category_name}>
            {editCategoryId !== category._id && <h3>{category.name}</h3>}
            {editCategoryId === category._id && (
              <div className={styles.edit}>
                <input
                  type="text"
                  className={styles.edit_input}
                  value={name ? name : category.name}
                  onChange={handleChange}
                  autoFocus
                />
                <Button style="primary" onClick={() => handleUpdateCategory(category._id)}>
                  <AiOutlineCheck />
                </Button>
                <Button style="danger" onClick={() => editCategoryHandler(category._id)}>
                  <AiOutlineStop />
                </Button>
              </div>
            )}
          </div>
          {/* category actions */}
          <div className={styles.category_actions}>
            {editCategoryId !== category._id && (
              <>
                <Button style="primary" onClick={() => editCategoryHandler(category._id)}>
                  <FiEdit />
                </Button>
                <Button style="danger" onClick={() => handleDeleteCategory(category._id)}>
                  <BsTrash />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
