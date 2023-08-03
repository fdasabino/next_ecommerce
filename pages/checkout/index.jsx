import Cart from "@/models/Cart";
import User from "@/models/User";
import styles from "@/styles/pages/CheckoutPage.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import React from "react";

const Checkout = ({ cart }) => {
  console.log("cart from props", cart);
  return <div className={styles.checkout}>Checkout</div>;
};

export default Checkout;

export async function getServerSideProps(context) {
  db.connectDB();
  const session = await getSession(context);
  const user = await User.findById(session?.user?._id);
  const cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    return {
      redirect: {
        destination: "/cart",
        permanent: false,
      },
    };
  }

  db.disconnectDB();
  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
    },
  };
}
