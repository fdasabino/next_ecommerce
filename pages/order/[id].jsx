import Order from "@/models/Order";
import styles from "@/styles/pages/OrderPage.module.scss";
import { GetColorName } from "hex-color-to-color-name";
import Head from "next/head";
import Image from "next/image";
import { MdPayment } from "react-icons/md";
import { PiClipboardTextThin } from "react-icons/pi";

const OrderPage = ({ order }) => {
  console.log(order);

  const getColorName = (color) => {
    const colorName = GetColorName(color);
    return colorName;
  };

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
          <span>Order ID: {order?._id}</span>
        </div>
        <div className={styles.order__wrapper}>
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
          <div className={styles.order__products}>
            <h2>
              Order Summary (
              {order.products.length === 1
                ? `${order?.products.length} item`
                : `${order?.products.length} items`}
              ) <PiClipboardTextThin />
            </h2>
            {order.products.map((product) => (
              <div key={product._id} className={styles.product}>
                <div className={styles.product__image}>
                  <Image src={product.image} alt={product.name} width={300} height={300} />
                </div>
                <div className={styles.product__info}>
                  <h2>
                    {product.name.length > 40
                      ? `${product.name.substring(0, 40)}...`
                      : product.name}
                  </h2>
                  <div className={styles.product__info__style}>
                    <p>
                      Color: <span>{product.color.color}</span>
                    </p>
                    <p>
                      Size: <span>{product.size}</span>
                    </p>
                    <p>
                      Price: <span>${(product.price * product.qty).toFixed(2)}</span>
                    </p>
                    <p>
                      Quantity: <span>{product.qty}x</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.order__info__right}></div>
        </div>
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
