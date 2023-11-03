import { MdPayment } from "react-icons/md";
import styles from "./OrderHeader.module.scss";

const OrderHeader = ({ order }) => {
    const formattedDate = new Date(order?.createdAt)?.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className={styles.order__header}>
            <h2>
                {order.isPaid === true ? "Order completed" : "Complete your Order"} <MdPayment />
            </h2>

            <div>
                <p>
                    Created on: <span>{formattedDate}</span>
                </p>
                {order.isPaid === true && (
                    <p>
                        Paid on:{" "}
                        <span>
                            {new Date(order?.paidAt)?.toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </p>
                )}
                <p>
                    Order ID: <span>{order?._id}</span>
                </p>
            </div>
        </div>
    );
};

export default OrderHeader;
