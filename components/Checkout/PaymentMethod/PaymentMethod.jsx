import Button from "@/components/Layout/Button/Button";
import { paymentMethods } from "@/constants";
import { applyCoupon } from "@/utils/applyCoupon";
import { Button as MuiButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiDiscount1 } from "react-icons/ci";
import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { toast } from "react-toastify";
import Summary from "../Summary/Summary";
import styles from "./PaymentMethod.module.scss";

const PaymentMethod = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  user,
  cart,
  activeAddress,
  totalAfterCoupon,
  setTotalAfterCoupon,
}) => {
  const { cartTotal, totalAfterDiscount, discount: discountFromDb } = cart;
  const [showCoupon, setShowCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(null);

  const handleShowCouponForm = () => {
    if (showCoupon === true) {
      setShowCoupon(false);
    } else {
      setShowCoupon(true);
    }
  };

  const applyCouponHandler = async () => {
    try {
      const res = await applyCoupon(coupon);

      if (res.ok === false) {
        toast.error(res.message);
      }

      if (res.ok === true) {
        console.log("apply coupon", res);
        setDiscount(res.coupon.discount);
        setTotalAfterCoupon(res.newCart.totalAfterDiscount);
        toast.success(
          `Coupon "${res.coupon.coupon}" applied... ${res.coupon.discount}% off your order`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(newValue);
    setSelectedPaymentMethod(newValue);
  };

  const placeOrderHandler = () => {
    console.log("save order to db");
    console.log("Payment", selectedPaymentMethod);
    console.log("Total after", totalAfterCoupon);
    console.log("Discount", discount);
    console.log("cart", cart);
  };

  return (
    <div className={styles.payment_method}>
      <div className={styles.header}>
        <h2>
          Payment method <MdPayments />
        </h2>
        <small>
          {user?.address.find((a) => a.active === true)
            ? selectedPaymentMethod
              ? `Selected payment method: ${selectedPaymentMethod}`
              : "Select a payment method"
            : "Add a delivery address to continue"}
        </small>
      </div>

      <div className={styles.payment_methods}>
        <div className={styles.sub_header}>
          <h2>
            I have a discount code <CiDiscount1 />{" "}
          </h2>
          <Tooltip title={showCoupon ? "Hide field" : "Enter discount code"}>
            <MuiButton
              style={{
                border: "1px solid #e7e7e7",
              }}
              color={!showCoupon ? "primary" : "error"}
              onClick={() => handleShowCouponForm()}
            >
              {showCoupon ? <FaTimes /> : <FaPlus />}
            </MuiButton>
          </Tooltip>
        </div>

        {showCoupon && (
          <div className={styles.discount}>
            <Summary
              applyCouponHandler={applyCouponHandler}
              coupon={coupon}
              setCoupon={setCoupon}
              totalAfterDiscount={totalAfterDiscount}
              discountFromDb={discountFromDb}
            />
          </div>
        )}

        {paymentMethods.map((method) => {
          return (
            <div
              className={`${selectedPaymentMethod === method.name ? styles.active : ""} ${
                styles.method
              }`}
              key={method.id}
              onClick={() => setSelectedPaymentMethod(method.name)}
            >
              {selectedPaymentMethod === method.name && <p>selected</p>}
              <div className={styles.radio}>
                <input
                  id={method.id}
                  type="radio"
                  checked={selectedPaymentMethod === method.name}
                  onChange={handleChange}
                />
                <label htmlFor={method.id} onClick={() => setSelectedPaymentMethod(method.name)}>
                  {method.name}
                </label>
              </div>
              <div className={styles.icons}>
                {method.id === "paypal" && <FaCcPaypal color="#00457C" />}
                {method.id === "credit_card" && <FaCcVisa color="#1a1f71" />}
                {method.id === "credit_card" && <FaCcMastercard color="#1c3bec" />}
                {method.id === "credit_card" && <FaCcAmex color="#0071c5" />}
                {method.id === "credit_card" && <FaCcDinersClub color="#6e1a1a" />}
              </div>
              <small>{method.description && method.description}</small>
            </div>
          );
        })}
        <div className={styles.cart_total}>
          <div className={styles.info}>
            <span>
              {totalAfterCoupon > 0 ? "SubTotal" : "Total:"} <b>${cartTotal.toFixed(2)}</b>
            </span>
            {discount > 0 ||
              (discountFromDb > 0 && (
                <span>
                  Discount applied: <b> -{discount || discountFromDb}%</b>
                </span>
              ))}
            {totalAfterCoupon < cartTotal && totalAfterCoupon > 0 && (
              <span>
                Total: <b>${totalAfterCoupon}</b>
              </span>
            )}
          </div>
        </div>
      </div>

      <Button
        style="primary"
        disabled={user?.address.length === 0 || !selectedPaymentMethod}
        onClick={placeOrderHandler}
      >
        {selectedPaymentMethod ? `Pay with ${selectedPaymentMethod}` : "Select a payment method"}{" "}
        {selectedPaymentMethod && <AiOutlineArrowRight />}
      </Button>
    </div>
  );
};

export default PaymentMethod;
