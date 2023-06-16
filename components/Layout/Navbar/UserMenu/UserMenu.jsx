import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
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

  // Sign in
  const handleSignIn = async () => {
    await signIn();
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
            <small>{session?.user.email}</small>
            <Button onClick={handleSignOut} style="danger">
              Sign out
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.user_menu__wrapper}>
          <h3>Welcome to ShoppyFlow</h3>
          <Button onClick={handleSignIn} style="primary">
            Sign in <AiOutlineArrowRight />
          </Button>
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
