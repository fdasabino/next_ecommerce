import Link from "next/link";
import { BsDashLg } from "react-icons/bs";
import styles from "./HomeHeader.module.scss";

const HomeHeader = () => {
  return (
    <header className={styles.home_header}>
      <ul>
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
        <Link href="/">
          <li>
            <BsDashLg /> Electronics
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default HomeHeader;
