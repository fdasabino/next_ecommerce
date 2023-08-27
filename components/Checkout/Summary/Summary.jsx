import ShippingInput from "@/components/Layout/Input/ShippingInput";
import { Button as MuiButton } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import styles from "./Summary.module.scss";

const Summary = ({ applyCouponHandler, coupon, setCoupon, totalAfterDiscount, discountFromDb }) => {
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
                  placeholder={
                    discountFromDb && discountFromDb > 0 ? "Coupon applied" : "Apply coupon"
                  }
                  onChange={handleChange}
                  value={coupon ? coupon : ""}
                  disabled={totalAfterDiscount ? true : false}
                />
                <MuiButton
                  fullWidth
                  style={{
                    border: "1px solid #e7e7e7",
                  }}
                  color="success"
                  type="submit"
                  disabled={totalAfterDiscount ? true : false}
                >
                  {discountFromDb && discountFromDb > 0 ? "Coupon applied" : "Apply coupon"}
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
