import Image from "next/image";
import Link from "next/link";
import Button from "../../Button/Button";
import styles from "./UserMenu.module.scss";

const UserMenu = (props) => {
  const { isLoggedIn, user, setVisible } = props;
  return (
    <ul className={styles.user_menu} onMouseLeave={() => setVisible(false)}>
      {isLoggedIn ? (
        <div className={styles.user_menu__wrapper}>
          <Image
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width={100}
            height={100}
            alt={user}
            className={styles.user_menu__img}
          />
          <div className={styles.col}>
            <span>
              Welcome back, <br /> {user}!
            </span>
            <Button type="danger">Sign out</Button>
          </div>
        </div>
      ) : (
        <div className={styles.user_menu__wrapper}>
          <Link href="/register">Register</Link>
          <Button type="primary">Sign in</Button>
        </div>
      )}
      <Link href="/profile">
        <li>Account</li>
      </Link>
      <Link href="/profile/orders">
        <li>My Orders</li>
      </Link>
      <Link href="/profile/messages">
        <li>Message Center</li>
      </Link>
      <Link href="/profile/address">
        <li>Addresses</li>
      </Link>
      <Link href="/profile/wishlist">
        <li>Wishlist</li>
      </Link>
    </ul>
  );
};

export default UserMenu;
