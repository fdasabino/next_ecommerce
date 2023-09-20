import Button from "@/components/Layout/Button/Button";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineStop } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import styles from "./SubCategoriesList.module.scss";

const SubCategoriesList = ({
  subData: subCategories,
  setSubData: setSubCategories,
  categories,
}) => {
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  // edit category by id
  const editSubCategoryHandler = (id) => {
    setEditSubCategoryId(id === editSubCategoryId ? null : id);
    setParent("");
  };

  // handle input change
  const handleChange = (e) => {
    if (e.target.name === "name") setName(e.target.value);
    if (e.target.name === "parent") setParent(e.target.value);
  };

  // handle delete sub category
  const handleDeleteSubCategory = async (id) => {
    try {
      const res = await axios.put("/api/admin/subCategory", { data: { id } });
      setSubCategories(res.data.subCategories);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // handle update sub category
  const handleUpdateSubCategory = async (id) => {
    try {
      const res = await axios.patch("/api/admin/subCategory", { data: { id, name, parent } });
      setSubCategories(res.data.subCategories);
      toast.success(res.data.message);
      setEditSubCategoryId(null);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={styles.subcategories_list}>
      <div className={styles.header}>
        <h2>
          {subCategories?.length > 0 ? "Current sub categories" : "No sub categories to show"}
        </h2>
      </div>

      {subCategories.length &&
        subCategories
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((sub) => (
            <div className={styles.subcategory} key={sub._id}>
              {/* category edit */}
              <div className={styles.subcategory_name}>
                {editSubCategoryId === sub._id && (
                  <div className={styles.edit_header}>
                    <div className={styles.title}>
                      <p>Edit {`"${sub.name}"`} sub category </p>
                    </div>
                    <div className={styles.subtitle}>
                      <small>
                        <span>Current Name:</span> {sub.name}
                      </small>
                      {sub.parent && (
                        <small>
                          <span>Parent Category:</span> {sub.parent.name}
                        </small>
                      )}
                    </div>
                  </div>
                )}
                {editSubCategoryId !== sub._id && (
                  <div className={styles.item_label}>
                    <h3>{sub.name}</h3>
                    <small>Category: {sub.parent.name}</small>
                  </div>
                )}
                {editSubCategoryId === sub._id && (
                  <div className={styles.edit}>
                    <input
                      type="text"
                      className={styles.edit_input}
                      name="name"
                      value={name ? name : sub.name || ""}
                      onChange={handleChange}
                      placeholder="Enter new name"
                      autoFocus
                    />
                    <select
                      name="parent"
                      value={parent ? parent : sub.parent ? sub.parent._id : ""}
                      onChange={handleChange}
                      disabled={!editSubCategoryId}
                      className={styles.select}
                    >
                      {categories?.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <div className={styles.buttons}>
                      <Button
                        style="primary"
                        onClick={() => handleUpdateSubCategory(sub._id)}
                        disabled={!name && !parent}
                      >
                        <AiOutlineCheck />
                      </Button>
                      <Button style="danger" onClick={() => editSubCategoryHandler(sub._id)}>
                        <AiOutlineStop />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              {/* category actions */}
              <div className={styles.subcategory_actions}>
                {editSubCategoryId !== sub._id && (
                  <>
                    <Button style="primary" onClick={() => editSubCategoryHandler(sub._id)}>
                      <FiEdit />
                    </Button>
                    <Button style="danger" onClick={() => handleDeleteSubCategory(sub._id)}>
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

export default SubCategoriesList;
