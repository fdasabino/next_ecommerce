import styles from "./OrderInfo.module.scss";

const OrderInfo = ({ order }) => {
  return (
    <div className={styles.order__info}>
      <div className={`${styles.order__info__status} ${styles.payment_status}`}>
        <p>
          Payment Status:{" "}
          <span style={order.isPaid ? { color: "lightGreen" } : { color: "orangeRed" }}>
            {order.isPaid ? "PAID" : "NOT PAID"}
          </span>
        </p>
      </div>
      <div className={`${styles.order__info__status} ${styles.order_status}`}>
        <p>
          Order Status:{" "}
          <span
            style={
              order.status === "Not Processed"
                ? { color: "orangered" }
                : order.status === "Processing"
                ? { color: "lightBlue" }
                : order.status === "Dispatched"
                ? { color: "purple" }
                : order.status === "Cancelled"
                ? { color: "orangeRed" }
                : order.status === "Completed"
                ? { color: "lightGreen" }
                : ""
            }>
            {order.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
