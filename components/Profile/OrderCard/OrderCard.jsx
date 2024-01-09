import Link from "next/link";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import styles from "./OrderCard.module.scss";
const OrderCard = ({ order }) => {
    console.log(order);

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

    return (
        <div className={styles.order__card}>
            <div className={styles.order__card__top}>
                <h2>{formattedDate}</h2>
                <p>{formattedId}</p>
            </div>
            <div className={styles.order__card__bottom}>
                <h3>Total: {formattedTotal}</h3>
                <h3>Status: {order.status}</h3>
                <h3>Payment: {order.paymentMethod}</h3>
                <div className={styles.order__card__bottom__details}>
                    <Link href={`/order/${order._id}`}>
                        View Details
                        <IoIosArrowDropright />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
