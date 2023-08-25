import ShippingInput from "@/components/Layout/Input/ShippingInput";
import { Button as MuiButton } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./Summary.module.scss";

const Summary = ({
  user,
  cart,
  activeAddress,
  totalAfterCoupon,
  setTotalAfterCoupon,
  selectedPaymentMethod,
  setDiscount,
  applyCouponHandler,
}) => {
  const [coupon, setCoupon] = useState(null);

  const validateCoupon = Yup.object().shape({
    coupon: Yup.string().required("Please enter a coupon code"),
  });

  const handleChange = (e) => {
    setCoupon(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.summary}>
      <div className={styles.coupon}>
        <Formik
          enableReinitialize
          initialValues={{ coupon }}
          validationSchema={validateCoupon}
          onSubmit={applyCouponHandler}
        >
          {(form) => (
            <Form>
              <div className={styles.input_wrapper}>
                <ShippingInput
                  name="coupon"
                  type="text"
                  icon="coupon"
                  placeholder="*Enter discount code"
                  onChange={handleChange}
                  value={coupon || ""}
                />
                <MuiButton
                  style={{
                    width: "100%",
                    border: "1px solid #e7e7e7",
                  }}
                  color="success"
                  onClick={form.handleSubmit}
                >
                  Apply discount
                </MuiButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Summary;
