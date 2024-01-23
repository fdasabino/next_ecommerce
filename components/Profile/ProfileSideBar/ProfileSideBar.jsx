import { signOut } from "next-auth/react";
import Link from "next/link";
import { useLayoutEffect } from "react";
import { AiFillMessage, AiFillStar, AiOutlineClose } from "react-icons/ai";
import { BiMessageSquareDots } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { GoPackageDependents } from "react-icons/go";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { RiLogoutCircleFill, RiSettings2Fill } from "react-icons/ri";
import styles from "./ProfileSideBar.module.scss";

const ProfileSideBar = ({ isExpanded, toggleSidebar, path }) => {
    // disable page scrolling when menu is expanded
    useLayoutEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
            console.log("scrolling disabled");
        } else {
            document.body.style.overflow = "visible";
            console.log("scrolling enabled");
        }
    }, [isExpanded]);

    return (
        <div className={`${styles.profile_sidebar} ${isExpanded ? styles.expanded : ""}`}>
            <div className={styles.header}>
                <h3>User Options</h3>
                <AiOutlineClose onClick={toggleSidebar} />
            </div>
            <hr />
            <ul className={styles.nav_list}>
                <li className={`${styles.nav_item} ${path === "/profile" ? styles.active : ""}`}>
                    <Link
                        onClick={toggleSidebar}
                        href="/profile">
                        <CgProfile /> Profile
                    </Link>
                </li>
                <li
                    className={`${styles.nav_item} ${
                        path === "/profile/orders" ? styles.active : ""
                    }`}>
                    <Link
                        onClick={toggleSidebar}
                        href="/profile/orders">
                        <GoPackageDependents /> Orders
                    </Link>
                </li>
                <li
                    className={`${styles.nav_item} ${
                        path === "/profile/messages" ? styles.active : ""
                    }`}>
                    <Link
                        onClick={toggleSidebar}
                        href="/profile/messages">
                        <BiMessageSquareDots /> Messages
                    </Link>
                </li>
                <li
                    className={`${styles.nav_item} ${
                        path === "/profile/addresses" ? styles.active : ""
                    }`}>
                    <Link
                        onClick={toggleSidebar}
                        href="/profile/addresses">
                        <FaRegAddressCard /> Addresses
                    </Link>
                </li>
                <li
                    className={`${styles.nav_item} ${
                        path === "/profile/wishlist" ? styles.active : ""
                    }`}>
                    <Link
                        onClick={toggleSidebar}
                        href="/profile/wishlist">
                        <AiFillStar /> Wishlist
                    </Link>
                </li>
            </ul>
            <div className={styles.separator}></div>
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
                        <button
                            title="Click to sign out"
                            onClick={() => signOut()}>
                            <RiLogoutCircleFill />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default ProfileSideBar;
