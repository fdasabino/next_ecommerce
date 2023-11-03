import Button from "@/components/Layout/Button/Button";
import { useSession } from "next-auth/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsClipboardCheck } from "react-icons/bs";
import { FaCcAmex, FaCcDinersClub, FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import styles from "./Panel.module.scss";

const Panel = ({ saveCartToDbHandler }) => {
    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);

    // calculate total price if there is a discount on the items or based on the original price
    const calculateTotalPrice = () => {
        let totalPrice = 0;

        for (const item of cart.cartItems) {
            if (item.discount > 0) {
                const productDiscount = item.discount;
                const discountPrice =
                    item.priceBeforeDiscount - (item.priceBeforeDiscount * productDiscount) / 100;
                totalPrice += discountPrice * item.addedQuantity;
            } else {
                totalPrice += item.priceBeforeDiscount * item.addedQuantity;
            }
        }

        return totalPrice;
    };

    const calculateTotalShipping = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.shipping, 0);
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
                <div className={styles.subtotal}>
                    <div className={styles.row1}>
                        <h3>
                            Subtotal:
                            <span>${calculateTotalPrice().toFixed(2)}</span>
                        </h3>
                        <h3>
                            Shipping:
                            {/* <span>${calculateTotalShipping(cart.cartItems).toFixed(2)}</span> */}
                            <span>TBD</span>
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
                                {/* ${(calculateTotalPrice() + calculateTotalShipping(cart.cartItems)).toFixed(2)} */}
                                ${calculateTotalPrice().toFixed(2)}
                            </span>
                        </h3>
                    </div>
                    <div className={styles.row3}>
                        <Button disabled={!session} onClick={saveCartToDbHandler} style="secondary">
                            Checkout <AiOutlineArrowRight />
                        </Button>
                        <small>
                            Need help?{" "}
                            <a href="mailto: shoppyflowsweden@gmail.com">Send a message</a>{" "}
                        </small>
                    </div>
                    <div className={styles.row4}>
                        <div className={styles.payment_methods}>
                            <FaCcVisa />
                            <FaCcMastercard />
                            <FaCcAmex />
                            <FaCcDinersClub />
                            <FaCcPaypal />
                        </div>
                        <div className={styles.disclaimer}>
                            <IoShieldCheckmarkSharp />
                            <p>We make sure shopping is always safe & secure</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Panel;
