import Link from "next/link";
import { AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { BsGraphUpArrow, BsPatchPlus } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { IoListCircleSharp, IoNotificationsCircleSharp } from "react-icons/io5";
import { MdOutlineCategory, MdSpaceDashboard } from "react-icons/md";
import { RiCoupon3Fill, RiLogoutCircleFill, RiSettings2Fill } from "react-icons/ri";
import styles from "./AdminSideBar.module.scss";

const AdminSideBar = ({ isExpanded, toggleSidebar, path }) => {
  return (
    <div
      onMouseLeave={toggleSidebar}
      className={`${styles.admin_sidebar} ${isExpanded ? styles.expanded : ""}`}
    >
      <div className={styles.header}>
        <span>Admin Panel</span>
        <AiOutlineClose onClick={toggleSidebar} />
      </div>
      <hr />

      {/* Links */}
      <ul className={styles.nav_list}>
        <li className={`${styles.nav_item} ${path === "/admin/dashboard" ? styles.active : ""}`}>
          <Link onClick={toggleSidebar} href="/admin/dashboard">
            <MdSpaceDashboard /> Dashboard
          </Link>
        </li>
        <li className={`${styles.nav_item} ${path === "/sales" ? styles.active : ""}`}>
          <Link onClick={toggleSidebar} href="/admin/dashboard/sales">
            <BsGraphUpArrow /> Sales
          </Link>
        </li>
        <li className={`${styles.nav_item} ${path === "/orders" ? styles.active : ""}`}>
          <Link onClick={toggleSidebar} href="/admin/dashboard/orders">
            <IoListCircleSharp /> Orders
          </Link>
        </li>
        <li className={`${styles.nav_item} ${path === "/users" ? styles.active : ""}`}>
          <Link onClick={toggleSidebar} href="/admin/dashboard/users">
            <ImUsers /> Users
          </Link>
        </li>
        <li className={`${styles.nav_item} ${path === "/messages" ? styles.active : ""}`}>
          <Link onClick={toggleSidebar} href="/admin/dashboard/messages">
            <AiFillMessage /> Messages
          </Link>
        </li>
      </ul>

      {/* dropdown */}
      <div className={styles.admin_sidebar__dropdown}>
        <hr />
        <div className={styles.header}>
          <span>Products</span>
        </div>
        <ul className={styles.nav_list}>
          <li className={`${styles.nav_item} ${path === "/products" ? styles.active : ""}`}>
            <Link onClick={toggleSidebar} href="/admin/dashboard/products">
              <FaThList /> Products
            </Link>
          </li>
          <li className={`${styles.nav_item} ${path === "/create-product" ? styles.active : ""}`}>
            <Link onClick={toggleSidebar} href="/admin/dashboard/create-product">
              <BsPatchPlus /> Create Product
            </Link>
          </li>
        </ul>
      </div>

      {/* dropdown */}
      <div className={styles.admin_sidebar__dropdown}>
        <hr />
        <div className={styles.header}>
          <span>Categories</span>
        </div>
        <ul className={styles.nav_list}>
          <li className={`${styles.nav_item} ${path === "/categories" ? styles.active : ""}`}>
            <Link onClick={toggleSidebar} href="/admin/dashboard/categories">
              <MdOutlineCategory /> Categories
            </Link>
          </li>
          <li className={`${styles.nav_item} ${path === "/subCategories" ? styles.active : ""}`}>
            <Link onClick={toggleSidebar} href="/admin/dashboard/subCategories">
              <MdOutlineCategory style={{ transform: "rotate(90deg)" }} /> Sub Categories
            </Link>
          </li>
        </ul>
      </div>

      {/* dropdown */}
      <div className={styles.admin_sidebar__dropdown}>
        <hr />
        <div className={styles.header}>
          <span>Coupons</span>
        </div>
        <ul className={styles.nav_list}>
          <li className={`${styles.nav_item} ${path === "/coupons" ? styles.active : ""}`}>
            <Link onClick={toggleSidebar} href="/admin/dashboard/coupons">
              <RiCoupon3Fill /> Coupons
            </Link>
          </li>
        </ul>
      </div>

      <hr />
      {/* Bottom nav */}
      <nav className={styles.admin_sidebar__bottom_nav}>
        <ul className={styles.bottom_item}>
          <li>
            <Link href="/">
              <RiSettings2Fill />
            </Link>
          </li>
          <li>
            <Link href="/">
              <IoNotificationsCircleSharp />
            </Link>
          </li>
          <li>
            <Link href="/">
              <AiFillMessage />
            </Link>
          </li>
          <li>
            <Link href="/">
              <RiLogoutCircleFill />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSideBar;
