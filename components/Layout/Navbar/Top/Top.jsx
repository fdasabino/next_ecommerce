import Image from "next/image";
import Link from "next/link";
import { BsSuitHeart } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { MdOutlineSecurity } from "react-icons/md";
import {
  RiAccountPinCircleLine,
  RiArrowDropDownFill,
  RiCustomerService2Line,
} from "react-icons/ri";
import { useMediaQuery } from "react-responsive";

import styles from "./Top.module.scss";
const Top = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div />
        <ul className={styles.top__list}>
          <li>
            <Image
              width={100}
              height={100}
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Sweden_%28pre-1906%29.svg"
              alt="placeholder"
            />
            <span>Sweden / usd</span>
          </li>
          <li>
            <RiAccountPinCircleLine />
            <span>
              Account <RiArrowDropDownFill />
            </span>
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
        </ul>
      </div>
    </div>
  );
};

export default Top;
