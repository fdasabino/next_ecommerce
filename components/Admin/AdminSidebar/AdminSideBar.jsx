import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./AdminSideBar.module.scss";

const AdminSideBar = ({ isExpanded, toggleSidebar }) => {
  return (
    <div className={`${styles.adminSidebar} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.header}>
        <span>Admin Panel</span>
        <AiOutlineClose onClick={toggleSidebar} />
      </div>
      <hr />
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link onClick={toggleSidebar} href="/admin/dashboard">
            Dashboard
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link onClick={toggleSidebar} href="/admin/users">
            Users
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link onClick={toggleSidebar} href="/admin/products">
            Products
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link onClick={toggleSidebar} href="/admin/settings">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
