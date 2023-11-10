import Link from "next/link";
import { AiFillMessage, AiFillStar, AiOutlineClose } from "react-icons/ai";
import { BiMessageSquareDots } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { GoPackageDependents } from "react-icons/go";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { RiLogoutCircleFill, RiSettings2Fill } from "react-icons/ri";
import styles from "./ProfileSideBar.module.scss";

const ProfileSideBar = ({ isExpanded, toggleSidebar, path }) => {
    return (
        <div className={`${styles.profile_sidebar} ${isExpanded ? styles.expanded : ""}`}>
            <div className={styles.header}>
                <span>User Panel</span>
                <AiOutlineClose onClick={toggleSidebar} />
            </div>
            <hr />
            <ul className={styles.nav_list}>
                <li className={`${styles.nav_item} ${path === "/profile" ? styles.active : ""}`}>
                    <Link onClick={toggleSidebar} href="/profile">
                        <CgProfile /> Profile
                    </Link>
                </li>
                <li
                    className={`${styles.nav_item} ${
                        path === "/profile/orders" ? styles.active : ""
                    }`}>
                    <Link onClick={toggleSidebar} href="/profile/orders">
                        <GoPackageDependents /> Orders
                    </Link>
                </li>
                <li
                    className={`${styles.nav_item} ${
                        path === "/profile/messages" ? styles.active : ""
                    }`}>
                    <Link onClick={toggleSidebar} href="/profile/messages">
                        <BiMessageSquareDots /> Messages
                    </Link>
                </li>
                <li
                    className={`${styles.nav_item} ${
                        path === "/profile/addresses" ? styles.active : ""
                    }`}>
                    <Link onClick={toggleSidebar} href="/profile/addresses">
                        <FaRegAddressCard /> Addresses
                    </Link>
                </li>
                <li
                    className={`${styles.nav_item} ${
                        path === "/profile/wishlist" ? styles.active : ""
                    }`}>
                    <Link onClick={toggleSidebar} href="/profile/wishlist">
                        <AiFillStar /> Wishlist
                    </Link>
                </li>
            </ul>
            <hr />
            {/* Bottom nav */}
            <nav className={styles.profile_sidebar__bottom_nav}>
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

export default ProfileSideBar;
