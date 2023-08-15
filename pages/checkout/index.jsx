import Shipping from "@/components/Checkout/Shipping/Shipping";
import Cart from "@/models/Cart";
import User from "@/models/User";
import styles from "@/styles/pages/CheckoutPage.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Checkout = ({ cart, user, activeAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState(activeAddress || null);

  return (
    <div className={styles.checkout}>
      <div className={styles.wrapper}>
        <div className={styles.checkout_left}>
          <Shipping
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            activeAddress={activeAddress}
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  db.connectDB();
  const session = await getSession(context);
  const user = await User.findById(session?.user?._id);
  const cart = await Cart.findOne({ user: user?._id });
  const activeAddress = user?.address.find((address) => address.active);

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
      user: JSON.parse(JSON.stringify(user)),
      activeAddress: JSON.parse(JSON.stringify(activeAddress)),
    },
  };
}
