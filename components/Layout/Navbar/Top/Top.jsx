import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsCart3, BsSuitHeart } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import { RiArrowDropDownFill, RiCustomerService2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Button from "../../Button/Button";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Top.module.scss";

const Top = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [visible, setVisible] = useState(false);

  // Get session
  const { data: session, status } = useSession();
  const user = session?.user.name.split(" ")[0];

  // extract country from redux store
  const country = useSelector((state) => state.country);
  const cart = useSelector((state) => state.cart);

  const handleMenuClick = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  // Sign in
  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div className={styles.top__cart}>
          <Link href="/cart">
            <BsCart3 />
            <span>{cart.cartItems && cart.cartItems.length}</span>
          </Link>
        </div>
        <ul className={styles.top__list}>
          <li className={styles.img}>
            <Image
              width={100}
              height={100}
              src={country?.flag?.wikimedia}
              alt={`Flag of ${country.name}`}
            />
            <span>{`${country.name} / USD`}</span>
          </li>
          {!isMobile && (
            <>
              <li>
                <Link href="/profile/wishlist">
                  <BsSuitHeart />
                  <span>Wishlist</span>
                </Link>
              </li>
              <li>
                <MdOutlineSecurity />
                <span>Buyer Protection</span>
              </li>
              <li>
                <RiCustomerService2Line />
                <span>Customer Service</span>
              </li>
              <li>
                <FiHelpCircle />
                <span>Help</span>
              </li>
            </>
          )}
          <div onClick={handleMenuClick}>
            {session && (
              <li>
                <Image
                  src={session?.user.image}
                  height={100}
                  width={100}
                  alt={user}
                />
                <span>
                  {user} <RiArrowDropDownFill />
                </span>
              </li>
            )}
            {visible && <UserMenu setVisible={setVisible} />}
          </div>
          {!session && (
            <li>
              <Button
                style="login"
                onClick={handleSignIn}>
                Sign in
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Top;
