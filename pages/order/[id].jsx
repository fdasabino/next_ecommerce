import OrderAddress from "@/components/Order/OrderAddress/OrderAddress";
import OrderHeader from "@/components/Order/OrderHeader/OrderHeader";
import OrderInfo from "@/components/Order/OrderInfo/OrderInfo";
import OrderPayment from "@/components/Order/OrderPayment/OrderPayment";
import OrderSummary from "@/components/Order/OrderSummary/OrderSummary";
import Order from "@/models/Order";
import styles from "@/styles/pages/OrderPage.module.scss";
import db from "@/utils/db";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Head from "next/head";
import { useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "PAYMENT_REQUEST":
      return { ...state, loading: true };
    case "PAYMENT_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PAYMENT_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAYMENT_RESET":
      return { ...state, loading: false, success: false, error: null };
    default:
      return state;
  }
};

const OrderPage = ({ order, paypalClientID }) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [{ loading, success, error }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: null,
  });

  useEffect(() => {
    if (!order._id || success) {
      if (success) {
        dispatch({ type: "PAYMENT_RESET" });
      }
    } else {
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": paypalClientID,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    }
  }, [order, success, paypalClientID, paypalDispatch]);

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
          <div className={styles.order__main}>
            <OrderAddress order={order} />
            <OrderPayment
              order={order}
              isPending={isPending}
              paypalDispatch={paypalDispatch}
              paypalClientID={paypalClientID}
              dispatch={dispatch}
              loading={loading}
              success={success}
              error={error}
            />
          </div>
          <OrderSummary order={order} />

          <div className={styles.order__info__right}></div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

// server side
export async function getServerSideProps(context) {
  db.connectDB();
  const { query } = context;
  const id = query?.id;
  const order = await Order.findById(id).populate("user").lean().exec();
  let paypal_client_id = process.env.PAYPAL_CLIENT_ID;

  db.disconnectDB();
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
      paypalClientID: paypal_client_id,
    },
  };
}
