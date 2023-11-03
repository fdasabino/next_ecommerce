import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "../StripeForm/StripeForm";
import styles from "./StripePayment.module.scss";

const StripePayment = ({ order, stripePublicKey }) => {
    const stripePromise = loadStripe(stripePublicKey);

    return (
        <div className={styles.stripe}>
            <Elements stripe={stripePromise}>
                <StripeForm order={order} />
            </Elements>
        </div>
    );
};

export default StripePayment;
