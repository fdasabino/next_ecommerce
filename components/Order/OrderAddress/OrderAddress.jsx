import Image from "next/image";
import { BsPinMap } from "react-icons/bs";
import styles from "./OrderAddress.module.scss";

const OrderAddress = ({ order }) => {
  const { shippingAddress, user } = order;

  return (
    <div className={styles.order__address}>
      <div className={styles.order__address__header}>
        <h2>
          Shipping Address <BsPinMap />
        </h2>
      </div>
      <summary className={styles.order__address__body}>
        <Image src={user.image} width={200} height={200} alt={user.name} />
        <div className={styles.body__text}>
          <p>
            {shippingAddress.firstName} {shippingAddress.lastName}
          </p>
          <p>{user.email}</p>
          <p>{shippingAddress.phoneNumber}</p>
          <p>
            {shippingAddress.address1}, {shippingAddress.zipCode}
          </p>
          {shippingAddress.address2 && <p>{shippingAddress.address2}</p>}
          <p>
            {shippingAddress.city}, {shippingAddress.country}
          </p>
          <small>Billing and delivery address are the same *</small>
        </div>
      </summary>
    </div>
  );
};

export default OrderAddress;
