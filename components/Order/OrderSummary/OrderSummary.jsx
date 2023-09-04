import Image from "next/image";
import React from "react";
import { PiClipboardTextThin } from "react-icons/pi";
import styles from "./OrderSummary.module.scss";

const OrderSummary = ({ order }) => {
  return (
    <div className={styles.order__products}>
      <h2>
        Order Summary (
        {order.products.length === 1
          ? `${order?.products.length} item`
          : `${order?.products.length} items`}
        ) <PiClipboardTextThin />
      </h2>
      {order.products.map((product) => (
        <div key={product._id} className={styles.product}>
          <div className={styles.product__image}>
            <Image src={product.image} alt={product.name} width={300} height={300} />
          </div>
          <div className={styles.product__info}>
            <h2>
              {product.name.length > 40 ? `${product.name.substring(0, 40)}...` : product.name}
            </h2>
            <div className={styles.product__info__style}>
              <p>
                Color: <span>{product.color.color}</span>
              </p>
              <p>
                Size: <span>{product.size}</span>
              </p>
              <p>
                Quantity: <span>{product.qty}x</span>
              </p>
              <p>
                Price: <span>${(product.price * product.qty).toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.order__products__total}>
        <div className={styles.wrapper}>
          {order.taxPrice > 0 && (
            <div className={styles.tax}>
              <p>Sales tax: +{order.taxPrice}</p>
            </div>
          )}
          <div className={styles.totals}>
            {order.couponApplied !== "No coupon applied" ? (
              <>
                <p>SubTotal: {order.totalBeforeDiscount}</p>
                <p>Discount: -${order.couponApplied}%</p>
                <p
                  style={
                    order.total < order.totalBeforeDiscount
                      ? { color: "#6CC082" }
                      : { color: "black" }
                  }
                >
                  Order total: {order.total}
                </p>
              </>
            ) : (
              <p>Order Total: {order.totalBeforeDiscount}</p>
            )}
          </div>
        </div>
        {order.couponApplied !== "No coupon applied" && (
          <small>
            Well done! You saved a total of{" "}
            <span>{(order.totalBeforeDiscount - order.total).toFixed(2)}$</span> in this order
          </small>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
