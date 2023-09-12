import { Button as MuiButton, Tooltip } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { BsChevronBarExpand } from "react-icons/bs";
import { PiClipboardTextThin } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import styles from "./OrderSummary.module.scss";

const OrderSummary = ({ order }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const isMedium = useMediaQuery({ query: "(max-width: 768px)" });
  const [summaryVisible, setSummaryVisible] = useState(false);
  return (
    <>
      <div className={styles.order__products}>
        <div className={styles.header}>
          <h2>
            Order Summary (
            {order.products.length === 1
              ? `${order?.products.length} item`
              : `${order?.products.length} items`}
            ) <PiClipboardTextThin />
          </h2>
          <Tooltip title={!summaryVisible ? "Show order summary" : "Hide order summary"}>
            <MuiButton
              fullWidth={isMedium}
              style={{ border: "1px solid #e7e7e7" }}
              color={!summaryVisible ? "primary" : "error"}
              onClick={() => setSummaryVisible(!summaryVisible)}
            >
              {summaryVisible ? "Hide Summary" : "Show Summary"} <BsChevronBarExpand size={15} />
            </MuiButton>
          </Tooltip>
        </div>
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
                  <p>SubTotal: {order.totalBeforeDiscount.toFixed(2)}</p>
                  <p>Discount: -${order.couponApplied}%</p>
                  <p
                    style={
                      order.total < order.totalBeforeDiscount
                        ? { color: "#6CC082" }
                        : { color: "black" }
                    }
                  >
                    Order total: {order.total.toFixed(2)}
                  </p>
                </>
              ) : (
                <p>Order Total: {order.totalBeforeDiscount.toFixed(2)}</p>
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
        {summaryVisible && (
          <>
            {order.products.map((product) => (
              <div key={product._id} className={styles.product}>
                <div className={styles.product__image}>
                  <Image src={product.image} alt={product.name} width={300} height={300} />
                </div>
                <div className={styles.product__info}>
                  {isMobile && product.name.length > 20 ? (
                    <h2>{product.name.slice(0, 20) + "..."}</h2>
                  ) : (
                    <h2>{product.name}</h2>
                  )}
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
          </>
        )}
      </div>
    </>
  );
};

export default OrderSummary;
