import React from "react";
import styles from "./OrderCard.module.scss";
const OrderCard = ({ order }) => {
    console.log(order);

    const formattedDate = new Date(order.createdAt).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const formattedId = order._id.substring(10, 24).toUpperCase();

    return (
        <div className={styles.order__card}>
            <div className={styles.order__card__header}>
                <h2>{formattedDate}</h2>
                <p>{formattedId}</p>
            </div>
            <div className={styles.order__card__body}></div>
        </div>
    );
};

export default OrderCard;
