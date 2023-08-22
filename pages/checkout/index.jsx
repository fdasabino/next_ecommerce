import CheckoutCart from "@/components/Checkout/CheckoutCart/CheckoutCart";
import PaymentMethod from "@/components/Checkout/PaymentMethod/PaymentMethod";
import Shipping from "@/components/Checkout/Shipping/Shipping";
import Cart from "@/models/Cart";
import User from "@/models/User";
import styles from "@/styles/pages/CheckoutPage.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Checkout = ({ cart, user, activeAddress }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const [selectedAddress, setSelectedAddress] = useState(activeAddress ? activeAddress : null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    let checkedActiveAddress = null;

    checkedActiveAddress = addresses.find(
      (address) => activeAddress && address.active === true && address._id === activeAddress._id
    );
    // console.log("checkedActiveAddress", checkedActiveAddress);
    // console.log("activeAddress", activeAddress);
    if (checkedActiveAddress) {
      setSelectedAddress(checkedActiveAddress);
    }
  }, [addresses, activeAddress]);

  return (
    <div className={styles.checkout}>
      <div className={styles.wrapper}>
        <div className={styles.checkout_top}>
          <Shipping
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setAddresses={setAddresses}
            addresses={addresses}
            activeAddress={activeAddress}
            user={user}
          />
        </div>
        <div className={styles.checkout_bottom}>
          <div className={styles.checkout_bottom_left}>
            <CheckoutCart cart={cart} user={user} />
          </div>
          <div className={styles.checkout_bottom_right}>
            <PaymentMethod
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              user={user}
              cart={cart}
            />
          </div>
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
  const activeAddress = user?.address.find((address) => address.active === true);

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
      activeAddress: activeAddress ? JSON.parse(JSON.stringify(activeAddress)) : null,
    },
  };
}
