import Button from "@/components/Layout/Button/Button";
import { paymentMethods } from "@/constants";
import { applyCoupon } from "@/utils/applyCoupon";
import { placeOrder } from "@/utils/placeOrder";
import { Button as MuiButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [coupon, setCoupon] = useState("");
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (discountFromDb) {
      setDiscount(discountFromDb);
      setTotalAfterCoupon(totalAfterDiscount);
      setDisabled(true);
    }
  }, [disabled, discountFromDb, totalAfterDiscount, setTotalAfterCoupon]);

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
        setDiscount(res.coupon.discount);
        setTotalAfterCoupon(res.newCart.totalAfterDiscount);
        setDisabled(true);
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
    setSelectedPaymentMethod(newValue);
  };

  const placeOrderHandler = async () => {
    try {
      const order = {
        couponApplied: coupon && discount ? discount : coupon || "No coupon applied",
        paymentMethod: selectedPaymentMethod,
        totalAfterDiscount: totalAfterCoupon,
        products: cart.products,
        total: cartTotal,
        activeAddress,
      };

      const res = await placeOrder(order);

      if (res.ok === false) {
        toast.error(res.message);
      }

      if (res.ok === true) {
        router.push(`/order/${res.order._id}`);
        toast.success("Order placed successfully");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
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
              onClick={() => handleShowCouponForm()}>
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
              discount={discount}
              disabled={disabled}
              cart={cart}
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
              onClick={() => setSelectedPaymentMethod(method.name)}>
              {selectedPaymentMethod === method.name && <p>selected payment method</p>}
              <div className={styles.radio}>
                <input
                  id={method.id}
                  type="radio"
                  checked={selectedPaymentMethod === method.name}
                  onChange={handleChange}
                />
                <label
                  htmlFor={method.id}
                  onClick={() => setSelectedPaymentMethod(method.name)}>
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
            {disabled && (
              <span>
                Discount: <b> -{discount || discountFromDb}%</b>
              </span>
            )}
            {totalAfterCoupon < cartTotal && totalAfterCoupon > 0 && (
              <span>
                Total: <b>${totalAfterCoupon.toFixed(2)}</b>
              </span>
            )}
          </div>
        </div>
      </div>

      <Button
        style="primary"
        disabled={user?.address.length === 0 || !selectedPaymentMethod}
        onClick={placeOrderHandler}>
        {selectedPaymentMethod ? `Pay with ${selectedPaymentMethod}` : "Select a payment method"}{" "}
        {selectedPaymentMethod && <AiOutlineArrowRight />}
      </Button>
    </div>
  );
};

export default PaymentMethod;
