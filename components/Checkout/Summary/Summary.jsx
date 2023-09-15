import ShippingInput from "@/components/Layout/Input/ShippingInput";
import { Button as MuiButton } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./Summary.module.scss";

const Summary = ({ applyCouponHandler, coupon, cart, setCoupon, disabled, discount }) => {
  const { discount: discountFromCart } = cart;
  const validateCoupon = Yup.object().shape({
    coupon: Yup.string()
      .min(3, "Coupon must be at least 3 characters...")
      .max(20, "Coupon must be at most 20 characters..."),
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
                    disabled
                      ? `COUPON APPLIED: ${discount || discountFromCart}% DISCOUNT`
                      : "Apply coupon"
                  }
                  onChange={handleChange}
                  value={
                    coupon && discount
                      ? `COUPON APPLIED: ${discount || discountFromCart}% DISCOUNT`
                      : coupon
                  }
                  disabled={disabled}
                />
                <MuiButton
                  fullWidth
                  style={{
                    border: "1px solid #e7e7e7",
                  }}
                  color="success"
                  type="submit"
                  disabled={disabled}
                >
                  {disabled ? "Coupon applied" : "Apply coupon"}
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
