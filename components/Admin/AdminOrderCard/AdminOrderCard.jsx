import Link from "next/link";
import styles from "./AdminOrderCard.module.scss";

const AdminOrderCard = ({ order }) => {
  return (
    <div key={order._id} className={styles.order}>
      <h4>{order.user.name}</h4>
      <p>{order.createdAt.substring(0, 10)}</p>
      <p>${order.total.toFixed(2)}</p>
      <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
      <div
        className={`${styles.status} ${
          order.status == "Not Processed"
            ? styles.not_processed
            : order.status == "Processing"
            ? styles.processing
            : order.status == "Dispatched"
            ? styles.dispatched
            : order.status == "Cancelled"
            ? styles.cancelled
            : order.status == "Completed"
            ? styles.completed
            : ""
        }`}
      >
        {order.status}
      </div>
      <div className={styles.details}>
        <Link href={`/order/${order._id}`}>Details</Link>
      </div>
    </div>
  );
};

export default AdminOrderCard;
