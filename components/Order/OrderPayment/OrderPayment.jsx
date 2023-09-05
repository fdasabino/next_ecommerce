import React from "react";
import styles from "./OrderPayment.module.scss";

const OrderPayment = ({ order }) => {
  return (
    <div className={styles.order_payment}>
      {order.paymentMethod === "Credit Card" ? (
        <div>Credit Card</div>
      ) : order.paymentMethod === "Paypal" ? (
        <div>Paypal</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderPayment;
