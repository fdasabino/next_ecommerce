import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CartItem from "@/components/Cart/CartItem/CartItem";
import CartSwiper from "@/components/Cart/CartSwiper/CartSwiper";
import EmptyCart from "@/components/Cart/EmptyCart/EmptyCart";
import Panel from "@/components/Cart/Panel/Panel";
import Path from "@/components/Layout/Path/Path";
import styles from "@/styles/pages/CartPage.module.scss";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);

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
            <div className={styles.mx_4}>
              <div className={styles.cart__wrapper}>
                <div className={styles.left}>
                  {cart &&
                    cart.cartItems.length > 0 &&
                    cart.cartItems.map((item) => <CartItem key={item._uid} product={item} />)}
                </div>
                <div className={styles.right}>
                  <Panel />
                </div>
              </div>
            </div>
          )}
          <div className={styles.cart__swiper}>
            <CartSwiper />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
