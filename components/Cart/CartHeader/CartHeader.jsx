import Button from "@/components/Layout/Button/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "./CartHeader.module.scss";

const CartHeader = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className={styles.cart_header}>
      <div className={styles.left}>
        <h2>
          My shopping cart {cart.cartItems.length > 0 && <span>({cart.cartItems.length})</span>}
        </h2>
      </div>
      <div className={styles.right}>
        <Button style="secondary">
          Proceed to checkout <AiOutlineArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CartHeader;
