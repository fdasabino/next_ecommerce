import Button from "@/components/Layout/Button/Button";
import AdminInput from "@/components/Layout/Input/AdminInput";
import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import * as Yup from "yup";
import styles from "./CreateCoupon.module.scss";

const couponValidation = Yup.object().shape({
  coupon: Yup.string()
    .min(4, "Coupon name must be at least 4 characters...")
    .max(10, "Coupon name must be at most 10 characters..."),
  startDate: Yup.date().required("Start date is required..."),
  endDate: Yup.date().required("End date is required..."),
  discount: Yup.number()
    .min(1, "Discount must be at least 1...")
    .max(100, "Discount must be at most 100..."),
});

const CreateCoupon = ({ setData }) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "coupon") setCoupon(value);
    if (name === "discount") setDiscount(value);
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/api/admin/coupon", {
        coupon,
        discount,
        startDate,
        endDate,
      });
      setData(data.coupons);
      setCoupon("");
      setDiscount("");
      setStartDate("");
      setEndDate("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={styles.create_coupon}>
      <div className={styles.header}>
        <h2>Create a coupon (Discount Code)</h2>
      </div>
      <Formik
        enableReinitialize
        initialValues={{ coupon, startDate, endDate, discount }}
        validationSchema={couponValidation}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <AdminInput
              type="text"
              value={coupon}
              name="coupon"
              placeholder="Coupon name"
              icon="coupon"
              onChange={handleChange}
            />
            <AdminInput
              type="date"
              value={startDate}
              name="startDate"
              icon="date"
              onChange={handleChange}
            />
            <AdminInput
              type="date"
              value={endDate}
              name="endDate"
              icon="date"
              onChange={handleChange}
            />
            <AdminInput
              type="number"
              value={discount}
              name="discount"
              placeholder="Discount in %"
              icon="discount"
              onChange={handleChange}
            />
            <Button
              type="submit"
              style="primary"
              disabled={!coupon || !setStartDate || !endDate || !discount}
            >
              Submit <AiOutlinePlus />
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCoupon;
