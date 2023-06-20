import Link from "next/link";
import { useState } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
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
            <RiArrowDropDownFill /> Categories
          </li>
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
