import DotLoader from "@/components/Layout/DotLoader/DotLoader";
import { clearCart } from "@/redux-store/cartSlice";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { MdPayments } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import StripePayment from "../StripePayment/StripePayment";
import styles from "./OrderPayment.module.scss";

const OrderPayment = ({ order, isPending, stripePublicKey, dispatch }) => {
    const reduxDispatch = useDispatch();

    const orderId = order._id;
    const createOrderHandler = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: order.total,
                        },
                    },
                ],
            })
            .then((id) => {
                return id;
            });
    };
    const onApproveHandler = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            try {
                dispatch({ type: "PAYMENT_REQUEST" });
                const { data } = await axios.put(`/api/order/${orderId}/paypalPay`, {
                    details,
                    orderId,
                });
                dispatch({ type: "PAYMENT_SUCCESS", payload: data });
                reduxDispatch(clearCart());
                toast.success("Payment successful");
                window.location.reload(false);
            } catch (error) {
                dispatch({ type: "PAYMENT_FAIL", payload: error });
                toast.error(error.message);
            }
        });
    };

    const onErrorHandler = (err) => {
        dispatch({ type: "PAYMENT_FAIL", payload: err });
        console.log(err);
        toast.error(err.message);
    };

    return (
        <div className={styles.order_payment}>
            <div className={styles.header}>
                <h2>
                    Pay with {order.paymentMethod} <MdPayments />
                </h2>
            </div>

            <div className={styles.wrapper}>
                {order.paymentMethod === "Paypal" && (
                    <>
                        {isPending ? (
                            <DotLoader />
                        ) : (
                            <PayPalButtons
                                style={{
                                    layout: "vertical",
                                    color: "silver",
                                    shape: "rect",
                                    label: "pay",
                                }}
                                createOrder={createOrderHandler}
                                onApprove={onApproveHandler}
                                onError={onErrorHandler}
                            />
                        )}
                    </>
                )}

                {order.paymentMethod === "Credit Card" && (
                    <StripePayment
                        order={order}
                        stripePublicKey={stripePublicKey}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderPayment;
