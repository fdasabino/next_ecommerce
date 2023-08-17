import Image from "next/image";
import React from "react";
import { RiListUnordered } from "react-icons/ri";
import styles from "./CheckoutCart.module.scss";

const CheckoutCart = ({ cart }) => {
  console.log(cart);

  const { products, cartTotal } = cart;

  return (
    <div className={styles.checkout_cart}>
      <div className={styles.header}>
        <h2>
          Order Summary ({products.length}) <RiListUnordered />
        </h2>
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
        <p className={styles.cart_total}>Order total: ${cartTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutCart;
