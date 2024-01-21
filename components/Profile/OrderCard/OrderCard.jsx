import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineReadMore } from "react-icons/md";
import styles from "./OrderCard.module.scss";

const OrderCard = ({ order }) => {
    const router = useRouter();

    const formattedDate = new Date(order.createdAt).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const formattedId = order._id.substring(10, 24).toUpperCase();

    const formattedTotal = order.total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });

    const formattedStatus = order.status.charAt(0).toUpperCase() + order.status.slice(1);

    const showOrderDetails = (id) => {
        router.push(`/order/${id}`);
    };

    return (
        <div className={styles.order__card}>
            <div className={styles.order__card__header}>
                <div className={styles.amount}>
                    <h2>{formattedTotal}</h2>
                    <Tooltip title="View order details">
                        <IconButton onClick={() => showOrderDetails(order._id)}>
                            <MdOutlineReadMore />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className={styles.order__card__body}>
                <div className={styles.date}>
                    <h3>{formattedDate}</h3>
                </div>
                <div className={styles.status}>
                    <h4
                        style={{
                            color:
                                order.status === "Not Processed"
                                    ? "black"
                                    : order.status === "Processing"
                                    ? "blue"
                                    : order.status === "Dispatched"
                                    ? "purple"
                                    : order.status === "Cancelled"
                                    ? "red"
                                    : order.status === "Completed"
                                    ? "darkGreen"
                                    : "black",
                        }}>
                        {formattedStatus}
                    </h4>
                </div>
            </div>
            <div className={styles.order__card__footer}>
                <div className={styles.id}>
                    <span>Order ID:</span>
                    <h4> {formattedId}</h4>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
