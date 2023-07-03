import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./EmptyCart.module.scss";

const EmptyCart = () => {
  return (
    <div className={styles.empty__cart}>
      <Image src={"/images/empty_cart.png"} width={500} height={500} alt="empty cart" />
      <p>Your cart is empty, but it doesn&#8217;t have to be... </p>
      <Link href="/browse">
        <AiOutlineArrowLeft /> Browse our shop
      </Link>
    </div>
  );
};

export default EmptyCart;
