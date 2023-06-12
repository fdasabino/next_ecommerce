import { useSession } from "next-auth/react";
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

  // Get session
  const { data: session, status } = useSession();
  const user = session?.user.name.split(" ")[0];

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
            <span>{`${country.name} / USD`}</span>
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
            {session ? (
              <li>
                <Image src={session?.user.image} height={100} width={100} alt={user} />
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
            {visible && <UserMenu setVisible={setVisible} />}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Top;
