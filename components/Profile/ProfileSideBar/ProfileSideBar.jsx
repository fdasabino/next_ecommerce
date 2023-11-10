import Link from "next/link";
import { AiFillMessage, AiOutlineClose } from "react-icons/ai";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
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
                        <MdSpaceDashboard /> Dashboard
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
