import Order from "@/models/Order";
import styles from "@/styles/pages/OrderPage.module.scss";
import Head from "next/head";
import Image from "next/image";
import { MdPayment } from "react-icons/md";
import { PiClipboardTextThin } from "react-icons/pi";

const OrderPage = ({ order }) => {
  console.log(order);

  const formattedDate = new Date(order?.createdAt)?.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

          <div>
            <p>
              Ordered on: <span>{formattedDate}</span>
            </p>
            <p>
              Order ID: <span>{order?._id}</span>
            </p>
          </div>
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
                      Quantity: <span>{product.qty}x</span>
                    </p>
                    <p>
                      Price: <span>${(product.price * product.qty).toFixed(2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.order__products__total}>
              <div className={styles.wrapper}>
                {order.taxPrice > 0 && (
                  <div className={styles.tax}>
                    <p>Sales tax: +{order.taxPrice}</p>
                  </div>
                )}
                <div className={styles.totals}>
                  {order.couponApplied ? (
                    <>
                      <p>SubTotal: {order.totalBeforeDiscount}</p>
                      <p>
                        {order.couponApplied !== "No coupon applied" &&
                          `Discount: -${order.couponApplied}%`}
                      </p>
                      <p
                        style={
                          order.total < order.totalBeforeDiscount
                            ? { color: "#6CC082" }
                            : { color: "black" }
                        }
                      >
                        Order total: {order.total}
                      </p>
                    </>
                  ) : (
                    <p>Order Total: {order.totalBeforeDiscount}</p>
                  )}
                </div>
              </div>
              {order.couponApplied !== "No coupon applied" && (
                <small>
                  Well done! You saved a total of{" "}
                  <span>{(order.totalBeforeDiscount - order.total).toFixed(2)}$</span> in this order
                </small>
              )}
            </div>
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
