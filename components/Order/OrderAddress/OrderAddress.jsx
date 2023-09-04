import { BsPinMap } from "react-icons/bs";
import styles from "./OrderAddress.module.scss";

const OrderAddress = ({ order }) => {
  const { shippingAddress } = order;

  return (
    <div className={styles.order__address}>
      <div className={styles.order__address__header}>
        <h2>
          Shipping Address <BsPinMap />
        </h2>
      </div>
      <summary className={styles.order__address__body}>
        <p>
          {shippingAddress.firstName} {shippingAddress.lastName}
        </p>
        <p>{shippingAddress.phoneNumber}</p>
        <p>
          {shippingAddress.address1}, {shippingAddress.zipCode}
        </p>
        {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
        <p>
          {shippingAddress.city}, {shippingAddress.country}
        </p>
      </summary>
    </div>
  );
};

export default OrderAddress;
