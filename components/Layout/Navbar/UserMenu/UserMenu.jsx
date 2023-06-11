import Image from "next/image";
import Link from "next/link";
import Button from "../../Button/Button";
import styles from "./UserMenu.module.scss";

const UserMenu = (props) => {
  const { isLoggedIn, user } = props;
  return (
    <ul className={styles.user_menu}>
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
            <span>Welcome back {user}!</span>
            <Button type="danger">Sign out</Button>
          </div>
        </div>
      ) : (
        <div className={styles.user_menu__wrapper}>
          <Link href="/register">Register</Link>
          <Button type="primary">Sign in</Button>
        </div>
      )}
      <li>
        <Link href="/profile">Account</Link>
      </li>
      <li>
        <Link href="/profile/orders">My Orders</Link>
      </li>
      <li>
        <Link href="/profile/messages">Message Center</Link>
      </li>
      <li>
        <Link href="/profile/address">Addresses</Link>
      </li>
      <li>
        <Link href="/profile/wishlist">Wishlist</Link>
      </li>
    </ul>
  );
};

export default UserMenu;
