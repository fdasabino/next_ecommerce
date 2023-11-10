import Notifications from "@/components/Layout/Notifications/Notifications";
import Hamburger from "hamburger-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AiFillMessage } from "react-icons/ai";
import { BsGraphUpArrow, BsPatchPlus } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { IoCogSharp } from "react-icons/io5";
import { MdOutlineCategory, MdSpaceDashboard } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import { SlHandbag } from "react-icons/sl";
import { useMediaQuery } from "react-responsive";
import styles from "./AdminHeader.module.scss";

const AdminHeader = ({ toggleSidebar, isExpanded, user, path }) => {
    const isSmall = useMediaQuery({ query: "(max-width: 480px)" });
    const isMedium = useMediaQuery({ query: "(max-width: 768px)" });
    const isLarge = useMediaQuery({ query: "(min-width: 800px)" });
    const { data: session } = useSession(); // backup session
    const splitPath = path.split("/")[path.split("/").length - 1];

    const renderTitle = () => {
        switch (splitPath) {
            case "dashboard":
                return (
                    <>
                        <MdSpaceDashboard />
                        <h2>Dashboard</h2>
                    </>
                );
            case "sales":
                return (
                    <>
                        <BsGraphUpArrow />
                        <h2>Sales</h2>
                    </>
                );
            case "orders":
                return (
                    <>
                        <SlHandbag />
                        <h2>Orders</h2>
                    </>
                );
            case "users":
                return (
                    <>
                        <ImUsers />
                        <h2>Users</h2>
                    </>
                );
            case "messages":
                return (
                    <>
                        <AiFillMessage />
                        <h2>Messages</h2>
                    </>
                );
            case "products":
                return (
                    <>
                        <FaThList />
                        <h2>Products</h2>
                    </>
                );
            case "create-product":
                return (
                    <>
                        <BsPatchPlus />
                        <h2>Create Product</h2>
                    </>
                );
            case "categories":
                return (
                    <>
                        <MdOutlineCategory />
                        <h2>Categories</h2>
                    </>
                );
            case "subCategories":
                return (
                    <>
                        <MdOutlineCategory style={{ transform: "rotate(90deg)" }} />
                        <h2>Sub Categories</h2>
                    </>
                );
            case "coupons":
                return (
                    <>
                        <RiCoupon3Fill />
                        <h2>Coupons</h2>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.admin_header}>
            <div className={styles.top}>
                <div className={styles.col}>
                    <div className={styles.user}>
                        <Image
                            src={user?.image || session?.user?.image}
                            width={300}
                            height={300}
                            alt={user?.name || session?.user?.name}
                        />
                        <div className={styles.user_info}>
                            <h4>
                                <span>
                                    Welcome back, <br />
                                </span>{" "}
                                {user?.name || session?.user?.name}
                            </h4>
                        </div>
                    </div>
                </div>
                {isLarge && <div className={styles.col}>{renderTitle()}</div>}
                <div className={styles.col}>
                    <Hamburger
                        toggled={isExpanded}
                        toggle={toggleSidebar}
                        size={isSmall ? 16 : isMedium ? 20 : 24}
                    />
                    <Notifications />
                </div>
            </div>
            <div className={styles.bottom}>
                <label htmlFor="admin_search">
                    <input id="admin_search" type="text" placeholder="Search here..." />
                </label>
            </div>
        </div>
    );
};

export default AdminHeader;
