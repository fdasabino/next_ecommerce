import Link from "next/link";
import { MdOutlineArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import styles from "./CategoriesDropdown.module.scss";

const CategoriesDropdown = (props) => {
    // Get props
    const { setVisible } = props;

    const categories = useSelector((state) => state.categories);
    const categoriesArray = Object.values(categories);

    return (
        <div className={styles.categories_dropdown} onMouseLeave={() => setVisible(false)}>
            <ul>
                {categoriesArray.length > 0 ? (
                    <>
                        {categoriesArray
                            .filter((item) => item.name) // Filter out items without a name
                            .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
                            .map((item, i) => (
                                <li key={item._id || i} onClick={() => setVisible(false)}>
                                    <Link href={`/category/${item.slug}`}>
                                        <MdOutlineArrowRight /> {item.name}
                                    </Link>
                                </li>
                            ))}
                    </>
                ) : (
                    <li>
                        <p>No categories available</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default CategoriesDropdown;
