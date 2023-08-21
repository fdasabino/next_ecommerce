import Button from "@/components/Layout/Button/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { PiClipboardTextThin } from "react-icons/pi";
import styles from "./CheckoutCart.module.scss";

const CheckoutCart = ({ cart, user }) => {
  console.log(cart);

  const { products, cartTotal } = cart;

  const saveOrderToDb = () => {
    console.log("save order to db");
  };

  return (
    <div className={styles.checkout_cart}>
      <div className={styles.header}>
        <h2>
          Order Summary ({products.length}) <PiClipboardTextThin />
        </h2>
        <small>
          You can still modify your order by returning to your <Link href="/cart">cart</Link>
        </small>
      </div>
      <div className={styles.items}>
        {products.map((product) => {
          return (
            <div className={styles.item} key={product._id}>
              <div className={styles.item_image}>
                <Image src={product.image} width={200} height={200} alt={product.name} />
              </div>
              <div className={styles.item_details}>
                <h3>{product.name}</h3>
                <p>
                  Quantity: <span>{product.qty}</span>
                </p>
                <p>
                  Price: <span>${product.price.toFixed(2)}</span>
                </p>
                <p>
                  Size: <span>{product.size}</span>
                </p>
                <p>
                  Color: <span>{product.color.color}</span>
                </p>
              </div>
            </div>
          );
        })}
        <hr />
        <div className={styles.cart_total}>
          <p>Order total: ${cartTotal.toFixed(2)}</p>
          <Button style="primary" disabled={user?.address.length === 0} onClick={saveOrderToDb}>
            Continue to payment <AiOutlineArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
