import Button from "@/components/Layout/Button/Button";
import { paymentMethods } from "@/constants";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaCcAmex, FaCcDinersClub, FaCcMastercard, FaCcPaypal, FaCcVisa } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./PaymentMethod.module.scss";

const PaymentMethod = ({ selectedPaymentMethod, setSelectedPaymentMethod, user, cart }) => {
  const { cartTotal } = cart;

  const saveOrderToDb = () => {
    console.log("save order to db");
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(newValue);
    setSelectedPaymentMethod(newValue);
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
      </div>

      <div className={styles.cart_total}>
        <p>Order total: ${cartTotal.toFixed(2)}</p>
        <Button
          style="primary"
          disabled={user?.address.length === 0 || !selectedPaymentMethod}
          onClick={saveOrderToDb}
        >
          {selectedPaymentMethod ? `Pay with ${selectedPaymentMethod}` : "Select a payment method"}{" "}
          {selectedPaymentMethod && <AiOutlineArrowRight />}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
