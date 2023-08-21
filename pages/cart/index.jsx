import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CartItem from "@/components/Cart/CartItem/CartItem";
import CartSwiper from "@/components/Cart/CartSwiper/CartSwiper";
import EmptyCart from "@/components/Cart/EmptyCart/EmptyCart";
import Panel from "@/components/Cart/Panel/Panel";
import Path from "@/components/Layout/Path/Path";
import styles from "@/styles/pages/CartPage.module.scss";
import { addCartToDb } from "@/utils/addCartTodb";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const { data: session } = useSession();
  const router = useRouter();

  const saveCartToDbHandler = async () => {
    if (session) {
      const response = await addCartToDb(cart.cartItems, session?.user._id);
      if (response.ok === true) {
        router.push("/checkout");
      }
    } else {
      signIn();
    }
  };

  const path = [
    { id: 1, name: "Home" },
    { id: 2, name: "Cart" },
  ];
  return (
    <>
      <Head>
        <title> ShoppyFlow | Cart</title>
      </Head>
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
                      cart.cartItems.map((item) => (
                        <CartItem key={item._uid} cartProducts={item} />
                      ))}
                  </div>
                  <div className={styles.right}>
                    <Panel saveCartToDbHandler={saveCartToDbHandler} />
                  </div>
                </div>
              </div>
            )}
            <div className={styles.cart__swiper}>
              <h2>You might also like</h2>
              <CartSwiper />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
