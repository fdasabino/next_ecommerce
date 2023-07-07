import Button from "@/components/Layout/Button/Button";
import { useSession } from "next-auth/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { useSelector } from "react-redux";
import styles from "./Panel.module.scss";

const Panel = () => {
  const { data: session } = useSession();
  const cart = useSelector((state) => state.cart);

  const calculateTotalShipping = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.shipping, 0);
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    console.log("Checkout");
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2>
          Overview <BsClipboardCheck />
        </h2>
      </div>
      <hr />
      <div className={styles.body}>
        <div className={styles.promo}>
          <h3>Do you have a promo code?</h3>
          <div className={styles.input}>
            <input type="text" placeholder="Enter your code" />
            <Button style="secondary">Apply</Button>
          </div>
        </div>
        <div className={styles.subtotal}>
          <div className={styles.row1}>
            <h3>
              Subtotal:
              <span>${calculateTotalPrice(cart.cartItems).toFixed(2)}</span>
            </h3>
            <h3>
              Shipping:
              <span>${calculateTotalShipping(cart.cartItems).toFixed(2)}</span>
            </h3>
            <h3>
              Sales Tax:
              <span>TBD</span>
            </h3>
          </div>
          <div className={styles.row2}>
            <h3>
              Estimated Total:
              <span>
                $
                {(
                  calculateTotalPrice(cart.cartItems) + calculateTotalShipping(cart.cartItems)
                ).toFixed(2)}
              </span>
            </h3>
          </div>
          <div className={styles.row3}>
            <Button disabled={!session} onClick={handleCheckout} style="secondary">
              Checkout <AiOutlineArrowRight />
            </Button>
            <small>
              Need help? <a href="mailto: shoppyflowsweden@gmail.com">Send a message</a>{" "}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
