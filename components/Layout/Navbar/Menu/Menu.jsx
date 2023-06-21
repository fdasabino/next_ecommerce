import Link from "next/link";
import { useState } from "react";
import { RiArrowDropDownFill } from "react-icons/ri";
import CategoriesDropdown from "../CategoriesDropdown/CategoriesDropdown";
import styles from "./Menu.module.scss";

const Menu = () => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <header className={styles.menu}>
      <div className={styles.wrapper}>
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
        {visible && <CategoriesDropdown setVisible={setVisible} />}
      </div>
    </header>
  );
};

export default Menu;
