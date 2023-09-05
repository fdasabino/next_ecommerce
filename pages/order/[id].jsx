import OrderAddress from "@/components/Order/OrderAddress/OrderAddress";
import OrderHeader from "@/components/Order/OrderHeader/OrderHeader";
import OrderInfo from "@/components/Order/OrderInfo/OrderInfo";
import OrderPayment from "@/components/Order/OrderPayment/OrderPayment";
import OrderSummary from "@/components/Order/OrderSummary/OrderSummary";
import Order from "@/models/Order";
import styles from "@/styles/pages/OrderPage.module.scss";
import Head from "next/head";
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
        <OrderHeader order={order} />
        <div className={styles.order__wrapper}>
          <OrderInfo order={order} />
          <hr />
          <OrderAddress order={order} />
          <div className={styles.order__main}>
            <OrderSummary order={order} />
            <OrderPayment order={order} />
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
