import Image from "next/image";
import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import styles from "./OrderList.module.scss";

const OrderList = ({ orders }) => {
  const [orderBtnSwitch, setOrderBtnSwitch] = useState(null);

  const openOrder = (id) => {
    setOrderBtnSwitch(id === orderBtnSwitch ? null : id);
  };

  return (
    <div className={styles.order_list}>
      <div className={styles.header}>
        <h2>Current orders placed ({orders.length})</h2>
      </div>
      <div className={styles.wrapper}>
        {orders.map((order) => {
          return (
            <div
              style={
                orderBtnSwitch === order._id
                  ? { border: "1px solid #1191e730", borderRadius: "16px" }
                  : null
              }
              className={styles.order}
              key={order._id}
            >
              <div
                style={
                  orderBtnSwitch === order._id
                    ? { background: "#1192e765", borderBottom: "1px solid #1191e730" }
                    : null
                }
                className={styles.order_heading}
              >
                <div className={styles.order_id}>
                  <span>Order ID:</span> {order._id}
                </div>
                <div className={styles.order_date}>
                  <span>Order Date:</span> {order.createdAt.substring(0, 10)}
                </div>
                <div className={styles.order_coupon}>
                  <span>Coupon:</span> {order.couponApplied}
                </div>
                <div className={styles.order_total}>
                  <span>Order Total:</span> ${order.total.toFixed(2)}
                </div>
                <div className={styles.order_btn_switch}>
                  <AiOutlineArrowUp
                    role="button"
                    onClick={() => openOrder(order._id)}
                    style={orderBtnSwitch === order._id ? { transform: "rotate(180deg)" } : ""}
                  />
                </div>
              </div>
              {orderBtnSwitch === order._id && (
                <div className={styles.order_details}>
                  <div className={styles.order_details_heading}>
                    <div className={styles.order_status}>
                      <span>Order Status:</span> {order.status}
                    </div>
                    <div className={styles.order_payment_status}>
                      <span>Payment Status:</span> {order.isPaid ? "Paid" : "Not Paid"}
                    </div>
                    <div className={styles.order_payment}>
                      <span>Payment Method:</span> {order.paymentMethod}
                    </div>
                  </div>
                  <div className={styles.order_details_body}>
                    <div className={styles.order_details_body_heading}>
                      <h2>Order summary</h2>
                    </div>
                    <div className={styles.order_details_body_items}>
                      {order?.products?.map((product) => {
                        return (
                          <div key={product._id} className={styles.product}>
                            <div className={styles.product_name}>{product.name}</div>
                            <div className={styles.product_price}>
                              <span>Price:</span> ${product.price.toFixed(2)}
                            </div>
                            <div className={styles.product_quantity}>
                              <span>Quantity:</span> {product.qty}x
                            </div>
                            <div className={styles.product_size}>
                              <span>Size:</span> ({product.size})
                            </div>
                            <div className={styles.product_images}>
                              <Image
                                src={product.image}
                                width={150}
                                height={150}
                                alt={product.name}
                              />
                              <span
                                className={styles.color_span}
                                style={{ background: `${product.color.color}` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.order_details_body_heading}>
                      <h2>Customer & delivery info</h2>
                    </div>
                    <div className={styles.order_details_body_customer}>
                      <div className={styles.customer_details}>
                        <h2>{order.user.name}</h2>
                        <p>{order.user.email}</p>
                        <Image src={order.user.image} width={150} height={150} alt="avatar" />
                      </div>
                      <div className={styles.delivery_info}>
                        <p>
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                        </p>
                        <p>{order.shippingAddress.phoneNumber}</p>
                        <p>{order.shippingAddress.address1}</p>
                        {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                        <p>{order.shippingAddress.state}</p>
                        <p>{order.shippingAddress.city}</p>
                        <p>{order.shippingAddress.zipCode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
