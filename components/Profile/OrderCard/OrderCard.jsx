import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineReadMore } from "react-icons/md";
import styles from "./OrderCard.module.scss";

const OrderCard = ({ order }) => {
    console.log(order);
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
    // enum: ["Not Processed", "Processing", "Dispatched", "Cancelled", "Completed"],

    const showOrderDetails = (id) => {
        router.push(`/order/${id}`);
    };

    return (
        <div
            className={styles.order__card}
            style={{
                borderLeft:
                    order.status === "Not Processed"
                        ? "5px solid #ed8f2acf"
                        : order.status === "Processing"
                        ? "5px solid #1567d2"
                        : order.status === "Dispatched"
                        ? "5px solid #aaffaa"
                        : order.status === "Cancelled"
                        ? "5px solid #ffaaaa"
                        : order.status === "Completed"
                        ? "5px solid #aaffaa"
                        : "5px solid #ed8f2acf",
                borderColor:
                    order.status === "Not Processed"
                        ? "#ed8f2acf"
                        : order.status === "Processing"
                        ? "#1567d2"
                        : order.status === "Dispatched"
                        ? "#aaffaa"
                        : order.status === "Cancelled"
                        ? "#ffaaaa"
                        : order.status === "Completed"
                        ? "#aaffaa"
                        : "#ed8f2acf",
            }}>
            <div className={styles.order__card__header}>
                <div className={styles.amount}>
                    <h2>{formattedTotal}</h2>
                    <IconButton onClick={() => showOrderDetails(order._id)}>
                        <MdOutlineReadMore />
                    </IconButton>
                </div>
            </div>
            <div className={styles.order__card__body}>
                <div className={styles.date}>
                    <h3>{formattedDate}</h3>
                </div>
                <div className={styles.status}>
                    <h4>{formattedStatus}</h4>
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
