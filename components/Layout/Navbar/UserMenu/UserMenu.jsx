import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { toast } from "react-toastify";
import Button from "../../Button/Button";
import styles from "./UserMenu.module.scss";
const UserMenu = (props) => {
  // Get props
  const { setVisible } = props;

  // Get session
  const { data: session } = useSession();
  const user = session?.user;

  // Sign out
  const handleSignOut = async () => {
    setTimeout(async () => {
      await signOut();
    }, 2000);
    toast.success("Signing out...");
  };

  return (
    <ul
      className={styles.user_menu}
      onMouseLeave={() => setVisible(false)}>
      {session && (
        <div className={styles.user_menu__wrapper}>
          <div className={styles.user_menu__img}>
            {user.role === "admin" && <MdAdminPanelSettings />}
            <Image
              src={session?.user.image}
              width={300}
              height={300}
              alt={session?.user.name}
            />
          </div>
          <div className={styles.col}>
            <span>
              {user?.role === "user" && ` Welcome back, \n ${user?.name}!`}
              {user?.role === "admin" && (
                <>
                  <Link href="/admin/dashboard">Admin Panel</Link>
                </>
              )}
            </span>
            <small>{session?.user.email}</small>
            <Button
              onClick={handleSignOut}
              style="danger">
              Sign out
            </Button>
          </div>
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
        </div>
      )}
    </ul>
  );
};

export default UserMenu;
