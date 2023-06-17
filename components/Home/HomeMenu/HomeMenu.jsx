import { menuArray } from "@/data/home_data";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { BsDashLg } from "react-icons/bs";
import styles from "./HomeMenu.module.scss";

const HomeMenu = () => {
  return (
    <div className={styles.home_menu}>
      <ul>
        <li>
          <a className={styles.home_menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.home_menu__list}>
          {menuArray.map((item, i) => (
            <li key={i}>
              <Link href={item.link}>
                <BsDashLg />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default HomeMenu;
