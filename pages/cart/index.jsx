import Path from "@/components/Layout/Path/Path";
import styles from "@/styles/pages/CartPage.module.scss";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  console.log();

  const path = [
    { id: 1, name: "Home" },
    { id: 2, name: "Cart" },
  ];
  return (
    <div className={styles.cart}>
      <Path path={path} />
      <div className={styles.cart__container}>
        {cart.length === 0 ? (
          <div className={styles.cart__empty}>
            <Image src={"/images/empty_cart.png"} width={500} height={500} alt="empty cart" />
            <p>Your cart is empty, but it doesn&#8217;t have to be... </p>
            <Link href="/browse">
              <AiOutlineArrowLeft /> Browse our shop
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CartPage;
