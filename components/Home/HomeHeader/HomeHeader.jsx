import Link from "next/link";
import { useState } from "react";
import { BsDashLg } from "react-icons/bs";
import CategoriesMenu from "../CategoriesMenu/CategoriesMenu";
import styles from "./HomeHeader.module.scss";

const HomeHeader = () => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <header className={styles.home_header}>
      <ul>
        <a onClick={handleMenuClick}>
          <li>
            <BsDashLg /> Categories
          </li>
        </a>
        <Link href="/">
          <li>
            <BsDashLg /> Store
          </li>
        </Link>
        <Link href="/">
          <li>
            <BsDashLg /> Men
          </li>
        </Link>
        <Link href="/">
          <li>
            <BsDashLg /> Women
          </li>
        </Link>
        <Link href="/">
          <li>
            <BsDashLg /> Accessories
          </li>
        </Link>
      </ul>
      {visible && <CategoriesMenu setVisible={setVisible} />}
    </header>
  );
};

export default HomeHeader;
