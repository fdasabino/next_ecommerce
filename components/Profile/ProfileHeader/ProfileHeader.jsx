import Hamburger from "hamburger-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import styles from "./ProfileHeader.module.scss";
const ProfileHeader = ({ path, user }) => {
    const isSmall = useMediaQuery({ query: "(max-width: 480px)" });
    const isMedium = useMediaQuery({ query: "(max-width: 768px)" });
    const isLarge = useMediaQuery({ query: "(min-width: 800px)" });
    const { data: session } = useSession(); // backup session

    return (
        <div className={styles.profile_header}>
            <div className={styles.profile_header__left}>
                <div className={styles.profile_header__left__avatar}>
                    <Image
                        src={user.image || session.user.image}
                        width={150}
                        height={150}
                        alt={user.name}
                    />
                </div>
                <div className={styles.profile_header__left__wrapper}>
                    <div className={styles.profile_header__left__name}>
                        <p>{user.name || session.user.name}</p>
                    </div>
                    <div className={styles.profile_header__left__email}>
                        <p>{user.email || session.user.name}</p>
                    </div>
                </div>
            </div>
            <div className={styles.profile_header__center}>
                <p>{path.split("/")[1]}</p>
            </div>
            <div className={styles.profile_header__right}>
                <Hamburger size={24} />
            </div>
        </div>
    );
};

export default ProfileHeader;
