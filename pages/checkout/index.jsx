import CheckoutCart from "@/components/Checkout/CheckoutCart/CheckoutCart";
import PaymentMethod from "@/components/Checkout/PaymentMethod/PaymentMethod";
import Shipping from "@/components/Checkout/Shipping/Shipping";
import Cart from "@/models/Cart";
import User from "@/models/User";
import styles from "@/styles/pages/CheckoutPage.module.scss";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CheckoutPage = ({ cart, user, totalWithDiscountApplied }) => {
  const [addresses, setAddresses] = useState(user?.address || []);
  const activeAddress = addresses.find((address) => address.active === true);
  const [selectedAddress, setSelectedAddress] = useState(activeAddress ? activeAddress : null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [totalAfterCoupon, setTotalAfterCoupon] = useState(0);

  useEffect(() => {
    let checkedActiveAddress = null;

    if (totalWithDiscountApplied && totalWithDiscountApplied > 0) {
      setTotalAfterCoupon(totalWithDiscountApplied);
    }

    checkedActiveAddress = addresses.find(
      (address) => activeAddress && address.active === true && address._id === activeAddress._id
    );

    if (checkedActiveAddress) {
      setSelectedAddress(checkedActiveAddress);
    }
  }, [addresses, activeAddress, totalWithDiscountApplied]);

  return (
    <div className={styles.checkout}>
      <div className={styles.wrapper}>
        <div className={styles.checkout_top}>
          <Shipping
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            setAddresses={setAddresses}
            addresses={addresses}
            user={user}
          />
        </div>
        <div className={styles.checkout_bottom}>
          <div className={styles.checkout_bottom_left}>
            <CheckoutCart
              cart={cart}
              user={user}
            />
          </div>
          <div className={styles.checkout_bottom_right}>
            <PaymentMethod
              totalAfterCoupon={totalAfterCoupon}
              setTotalAfterCoupon={setTotalAfterCoupon}
              activeAddress={activeAddress}
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

export default CheckoutPage;

export async function getServerSideProps(context) {
  db.connectDB();
  const session = await getSession(context);
  const user = await User.findById(session?.user?._id);
  const cart = await Cart.findOne({ user: user?._id });

  const totalAfterDiscount = cart?.totalAfterDiscount || null;

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
      totalWithDiscountApplied: totalAfterDiscount ? totalAfterDiscount : null,
      cart: JSON.parse(JSON.stringify(cart)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
