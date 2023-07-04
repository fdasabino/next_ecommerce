import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CartItem from "@/components/Cart/CartItem/CartItem";
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
      {cart.cartItems.length === 0 ? (
        <div className={styles.cart__empty}>
          <EmptyCart />
        </div>
      ) : (
        <div className={styles.cart__container}>
          <Path path={path} />
          <CartHeader />
          <hr />
          {cart.cartItems.length > 0 && (
            <div className={styles.cart__wrapper}>
              <div className={styles.left}>
                {cart &&
                  cart.cartItems.length > 0 &&
                  cart.cartItems.map((item) => <CartItem key={item._uid} product={item} />)}
              </div>
              <div className={styles.right}>Left</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
