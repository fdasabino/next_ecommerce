import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../Button/Button";
import styles from "./UserMenu.module.scss";

const UserMenu = (props) => {
  // Get props
  const { setVisible } = props;

  // Get session
  const { data: session } = useSession();

  // Sign out
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <ul className={styles.user_menu} onMouseLeave={() => setVisible(false)}>
      {session ? (
        <div className={styles.user_menu__wrapper}>
          <Image
            src={session?.user.image}
            width={100}
            height={100}
            alt={session?.user.name}
            className={styles.user_menu__img}
          />
          <div className={styles.col}>
            <span>
              Welcome back, <br /> {session?.user.name}!
            </span>
            <Button onClick={handleSignOut} type="danger">
              Sign out
            </Button>
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
