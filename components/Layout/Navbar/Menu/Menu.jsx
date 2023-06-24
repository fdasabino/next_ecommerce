import Link from "next/link";
import { useState } from "react";
import { AiOutlineHome, AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
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
          <Link href="/">
            <li>
              <AiOutlineHome /> Home
            </li>
          </Link>
          <Link href="/">
            <li>
              <AiOutlineMan /> Men
            </li>
          </Link>
          <Link href="/">
            <li>
              <AiOutlineWoman /> Women
            </li>
          </Link>
          <a onClick={handleMenuClick}>
            <li>
              <RiArrowDropDownFill /> Categories
            </li>
          </a>
        </ul>
        {visible && <CategoriesDropdown setVisible={setVisible} />}
      </div>
    </header>
  );
};

export default Menu;
