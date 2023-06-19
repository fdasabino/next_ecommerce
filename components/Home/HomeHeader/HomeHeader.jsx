import Link from "next/link";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";
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
          <li>Categories</li>
        </a>
        <Link href="/">
          <li>Store</li>
        </Link>
        <Link href="/">
          <li>Men</li>
        </Link>
        <Link href="/">
          <li>Women</li>
        </Link>
      </ul>
      {visible && <CategoriesMenu setVisible={setVisible} />}
    </header>
  );
};

export default HomeHeader;
