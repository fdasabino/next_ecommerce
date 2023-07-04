import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import EmptyCart from "@/components/Cart/EmptyCart/EmptyCart";
import Path from "@/components/Layout/Path/Path";
import styles from "@/styles/pages/CartPage.module.scss";
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
        <CartHeader />
        <hr />
        {cart.cartItems.length > 0 ? (
          <div className={styles.cart__wrapper}>
            <div className={styles.left}>Right</div>
            <div className={styles.right}>Left</div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default CartPage;
