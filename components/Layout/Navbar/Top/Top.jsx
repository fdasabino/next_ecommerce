import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import {
  RiAccountPinCircleLine,
  RiArrowDropDownFill,
  RiCustomerService2Line,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Top.module.scss";

const Top = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [visible, setVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = "John Doe";

  // extract country from redux store
  const { country } = useSelector((state) => ({ ...state }));

  const handleMenuClick = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div />
        <ul className={styles.top__list}>
          <li>
            <Image
              width={100}
              height={100}
              src={country.flag.wikimedia}
              alt={`Flag of ${country.name}`}
            />
            <span>Sweden / usd</span>
          </li>
          <li>
            <Link href="/profile/wishlist">
              <BsSuitHeart />
              <span>Wishlist</span>
            </Link>
          </li>
          {!isMobile && (
            <>
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
            {isLoggedIn ? (
              <li>
                <Image
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  height={100}
                  width={100}
                  alt={user}
                />
                <span>
                  {user} <RiArrowDropDownFill />
                </span>
              </li>
            ) : (
              <li>
                <RiAccountPinCircleLine />
                <span>
                  Account <RiArrowDropDownFill />
                </span>
              </li>
            )}
            {visible && <UserMenu isLoggedIn={isLoggedIn} user={user} setVisible={setVisible} />}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Top;
