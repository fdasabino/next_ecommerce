import Button from "@/components/Layout/Button/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsPinMap } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import styles from "./OrderAddress.module.scss";

const OrderAddress = ({ order }) => {
  const { shippingAddress, user } = order;
  const router = useRouter();
  const redirectToDashboard = () => {
    router.push("/");
  };

  return (
    <div className={styles.order__address}>
      <div className={styles.order__address__header}>
        <h2>
          Shipping Address <BsPinMap />
        </h2>
      </div>
      <summary className={styles.order__address__body}>
        <div className={styles.body__text}>
          <div className={styles.left}>
            <div className={styles.image}>
              <Image src={user.image} width={200} height={200} alt={user.name} />
            </div>
            <div className="">
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
          </div>
          {order.isPaid === true && (
            <div className={styles.right}>
              <p>
                Payment Method: <span>{order.paymentMethod}</span>
              </p>
              <p>
                Payment Status: <span>{order.paymentResult.status}</span>
              </p>
              <Button onClick={redirectToDashboard}>
                Dashboard <MdOutlineSpaceDashboard />
              </Button>
            </div>
          )}
        </div>
      </summary>
    </div>
  );
};

export default OrderAddress;
