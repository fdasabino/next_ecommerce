import Order from "@/models/Order";
import styles from "@/styles/pages/OrderPage.module.scss";
import Head from "next/head";
import { MdPayment } from "react-icons/md";

const OrderPage = ({ order }) => {
  console.log(order);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <meta name="description" content="Complete your order" />
        <title>Complete order | {order?._id.substring(0, 10)}...</title>
      </Head>
      <div className={styles.order}>
        <div className={styles.order__header}>
          <h2>
            Complete your Order <MdPayment />
          </h2>
          <small>Order ID: {order?._id}</small>
        </div>
        <div className={styles.order__info}>
          <div
            style={order.isPaid ? { background: "green" } : { background: "orangeRed" }}
            className={`${styles.order__info__status} ${styles.payment_status}`}
          >
            <p>
              Payment Status: <span>{order.isPaid ? "PAID" : "NOT PAID"}</span>
            </p>
          </div>
          <div
            style={
              order.status === "Not Processed"
                ? { background: "lightBlue" }
                : order.status === "Processing"
                ? { background: "blue" }
                : order.status === "Dispatched"
                ? { background: "purple" }
                : order.status === "Cancelled"
                ? { background: "orangeRed" }
                : order.status === "Completed"
                ? { background: "green" }
                : ""
            }
            className={`${styles.order__info__status} ${styles.order_status}`}
          >
            <p>
              Order Status: <span>{order.status}</span>
            </p>
          </div>
        </div>
        <div className={styles.order__info__left}></div>
        <div className={styles.order__info__right}></div>
      </div>
    </>
  );
};

export default OrderPage;

// server side
export async function getServerSideProps(context) {
  const { query } = context;
  const id = query?.id;
  const order = await Order.findById(id).populate("user").lean().exec();

  return {
    props: { order: JSON.parse(JSON.stringify(order)) },
  };
}
