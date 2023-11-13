import Hamburger from "hamburger-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { BiMessageSquareDots } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { GoPackageDependents } from "react-icons/go";
import { useMediaQuery } from "react-responsive";
import styles from "./ProfileHeader.module.scss";

const ProfileHeader = ({ toggleSidebar, isExpanded, user, path }) => {
    const isSmall = useMediaQuery({ query: "(max-width: 480px)" });
    const isMedium = useMediaQuery({ query: "(max-width: 768px)" });
    const isLarge = useMediaQuery({ query: "(min-width: 800px)" });
    const { data: session } = useSession(); // backup session
    const splitPath = path.split("/")[path.split("/").length - 1];

    const renderTitle = () => {
        switch (splitPath) {
            case "profile":
                return (
                    <>
                        <CgProfile />
                        <h2>Profile</h2>
                    </>
                );
            case "orders":
                return (
                    <>
                        <GoPackageDependents />
                        <h2>Orders</h2>
                    </>
                );
            case "messages":
                return (
                    <>
                        <BiMessageSquareDots />
                        <h2>Messages</h2>
                    </>
                );
            case "addresses":
                return (
                    <>
                        <FaRegAddressCard />
                        <h2>Addresses</h2>
                    </>
                );
            case "wishlist":
                return (
                    <>
                        <AiFillStar />
                        <h2>Wishlist</h2>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.profile_header}>
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
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
