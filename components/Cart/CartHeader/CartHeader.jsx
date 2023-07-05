import Button from "@/components/Layout/Button/Button";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "./CartHeader.module.scss";

const CartHeader = () => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);

  const handleSignIn = () => {
    signIn();
  };

  const handleCheckout = () => {
    console.log("Checkout");
  };

  return (
    <div className={styles.cart_header}>
      <div className={styles.left}>
        <h2>
          My shopping cart {cart.cartItems.length > 0 && <span>({cart.cartItems.length})</span>}
        </h2>
      </div>
      <div className={styles.right}>
        {!session && (
          <Button onClick={handleSignIn} style="secondary">
            Sign in to checkout <AiOutlineArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CartHeader;
