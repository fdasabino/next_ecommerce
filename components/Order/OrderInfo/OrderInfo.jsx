import styles from "./OrderInfo.module.scss";

const OrderInfo = ({ order }) => {
  return (
    <div className={styles.order__info}>
      <div
        style={order.isPaid ? { background: "lightGreen" } : { background: "orangeRed" }}
        className={`${styles.order__info__status} ${styles.payment_status}`}
      >
        <p>
          Payment Status: <span>{order.isPaid ? "PAID" : "NOT PAID"}</span>
        </p>
      </div>
      <div
        style={
          order.status === "Not Processed"
            ? { background: "gold" }
            : order.status === "Processing"
            ? { background: "lightBlue" }
            : order.status === "Dispatched"
            ? { background: "purple" }
            : order.status === "Cancelled"
            ? { background: "orangeRed" }
            : order.status === "Completed"
            ? { background: "lightGreen" }
            : ""
        }
        className={`${styles.order__info__status} ${styles.order_status}`}
      >
        <p>
          Order Status: <span>{order.status}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
