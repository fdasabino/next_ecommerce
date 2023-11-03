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
        setName(value);
    };

    // handle delete category
    const handleDeleteCategory = async (id) => {
        try {
            const res = await axios.put("/api/admin/category", { data: { id } });
            setCategories(res.data.categories);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    // handle update category
    const handleUpdateCategory = async (id) => {
        try {
            const res = await axios.patch("/api/admin/category", { data: { id, name } });
            setCategories(res.data.categories);
            toast.success(res.data.message);
            setEditCategoryId(null);
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className={styles.categories_list}>
            <div className={styles.header}>
                <h2>{categories?.length > 0 ? "Current categories" : "No categories to show"}</h2>
            </div>

            {categories.length &&
                categories
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((category) => (
                        <div className={styles.category} key={category._id}>
                            {/* category edit */}
                            <div className={styles.category_name}>
                                {editCategoryId === category._id && (
                                    <p>{`Edit "${category.name}" category`}</p>
                                )}
                                {editCategoryId !== category._id && <h3>{category.name}</h3>}
                                {editCategoryId === category._id && (
                                    <div className={styles.edit}>
                                        <input
                                            type="text"
                                            className={styles.edit_input}
                                            onChange={handleChange}
                                            placeholder="Enter new category name"
                                            autoFocus
                                        />
                                        <div className={styles.buttons}>
                                            <Button
                                                style="primary"
                                                onClick={() => handleUpdateCategory(category._id)}
                                                disabled={!name}
                                            >
                                                <AiOutlineCheck />
                                            </Button>
                                            <Button
                                                style="danger"
                                                onClick={() => editCategoryHandler(category._id)}
                                            >
                                                <AiOutlineStop />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* category actions */}
                            <div className={styles.category_actions}>
                                {editCategoryId !== category._id && (
                                    <>
                                        <Button
                                            style="primary"
                                            onClick={() => editCategoryHandler(category._id)}
                                        >
                                            <FiEdit />
                                        </Button>
                                        <Button
                                            style="danger"
                                            onClick={() => handleDeleteCategory(category._id)}
                                        >
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
