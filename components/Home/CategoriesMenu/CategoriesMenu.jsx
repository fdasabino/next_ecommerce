import { menuArray } from "@/data/home_data";
import Link from "next/link";
import styles from "./CategoriesMenu.module.scss";

const CategoriesMenu = (props) => {
  // Get props
  const { setVisible } = props;

  return (
    <div className={styles.categories_menu} onMouseLeave={() => setVisible(false)}>
      <ul>
        {menuArray.map((item, i) => (
          <li key={i}>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesMenu;
