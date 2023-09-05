import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { MdPayments } from "react-icons/md";
import styles from "./OrderPayment.module.scss";

const OrderPayment = ({
  order,
  isPending,
  paypalDispatch,
  paypalClientID,
  dispatch,
  loading,
  success,
  error,
}) => {
  const createOrderHandler = (data, actions) => {};
  const onApproveHandler = (data, actions) => {};
  const onErrorHandler = (err) => {};

  return (
    <div className={styles.order_payment}>
      <div className={styles.header}>
        <h2>
          Pay with {order.paymentMethod} <MdPayments />
        </h2>
      </div>

      <div className={styles.wrapper}>
        {order.paymentMethod === "Paypal" && (
          <>
            {isPending ? (
              <span>Loading...</span>
            ) : (
              <PayPalButtons
                style={{ layout: "vertical", color: "silver", shape: "rect", label: "pay" }}
                createOrder={createOrderHandler}
                onApprove={onApproveHandler}
                onError={onErrorHandler}
              />
            )}
          </>
        )}

        {order.paymentMethod === "Credit Card" && (
          <>
            <span>Pay with Credit Card</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderPayment;
