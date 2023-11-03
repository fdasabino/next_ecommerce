import Button from "@/components/Layout/Button/Button";
import DotLoader from "@/components/Layout/DotLoader/DotLoader";
import { clearCart } from "@/redux-store/cartSlice";
import { stripePayment } from "@/utils/stripePayment";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./StripeForm.module.scss";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#187fd3",
            color: "#000",
            fontWeight: 500,
            fontSmoothing: "antialiased",
            fontSize: "14px",
            "::placeholder": {
                color: "#000000",
                textTransform: "uppercase",
                ":-webkit-autofill": { color: "#1072f3" },
            },
            invalid: {
                iconColor: "#e4260d",
                color: "#e4260d",
            },
        },
    },
};

const StripeForm = ({ order }) => {
    const orderId = order._id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await stripePayment(order.total, orderId, id);

                if (response.ok) {
                    toast.success(response.message);
                    setLoading(false);
                    window.location.reload(false);

                    dispatch(clearCart());
                }
            } catch (error) {
                console.log(error);
                setError(error);
                setLoading(false);
            }
        } else {
            console.log(error);
            toast.error(error.message);
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className={styles.stripe__form}>
            <form onSubmit={handleSubmit}>
                <CardElement options={CARD_OPTIONS} />
                <Button disabled={loading} type="submit">
                    Pay now <BsCashCoin />
                </Button>
                {loading && <DotLoader />}
            </form>
        </div>
    );
};

export default StripeForm;
