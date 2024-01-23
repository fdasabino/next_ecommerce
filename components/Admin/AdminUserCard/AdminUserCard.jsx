import Image from "next/image";
import styles from "./AdminUserCard.module.scss";

const AdminUserCard = ({ user }) => {
    return (
        <div
            key={user._id}
            className={styles.user}>
            <div className={styles.user_image}>
                <Image
                    src={user.image}
                    alt={user.name}
                    width={50}
                    height={50}
                />
            </div>
            <div className={styles.user_details}>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
            </div>
        </div>
    );
};

export default AdminUserCard;
