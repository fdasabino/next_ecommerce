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
                style={{
                    color:
                        order.status == "Not Processed"
                            ? "#fff"
                            : order.status == "Processing"
                            ? "#000"
                            : order.status == "Dispatched"
                            ? "#fff"
                            : order.status == "Cancelled"
                            ? "#000"
                            : order.status == "Completed"
                            ? "#000"
                            : "",
                    backgroundColor:
                        order.status == "Not Processed"
                            ? "#ed4337"
                            : order.status == "Processing"
                            ? "#54b7d3"
                            : order.status == "Dispatched"
                            ? "#1e91cf"
                            : order.status == "Cancelled"
                            ? "#fac80f"
                            : order.status == "Completed"
                            ? "#6cc070"
                            : "",
                }}
                className={styles.status}
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
