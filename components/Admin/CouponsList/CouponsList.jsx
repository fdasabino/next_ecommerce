import Button from "@/components/Layout/Button/Button";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineStop } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import styles from "./CouponsList.module.scss";

const SubCategoriesList = ({ data, setData }) => {
  const [editCouponId, setEditCouponId] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // edit category by id
  const editCouponHandler = (id) => {
    setEditCouponId(id === editCouponId ? null : id);
    setCoupon("");
    setDiscount("");
    setStartDate("");
    setEndDate("");
  };

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "coupon") setCoupon(value);
    if (name === "discount") setDiscount(value);
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
  };

  // handle delete coupon
  const handleDeleteCoupons = async (id) => {
    try {
      const res = await axios.put("/api/admin/coupon", { data: { id } });
      setData(res.data.coupons);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  // handle update coupon
  const handleUpdateCoupons = async (id) => {
    try {
      const res = await axios.patch("/api/admin/coupon", {
        data: { id, coupon, startDate, endDate, discount },
      });
      setData(res.data.coupons);
      toast.success(res.data.message);
      setEditCouponId(null);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className={styles.coupons_list}>
      <div className={styles.header}>
        <h2>{data?.length > 0 ? "Existing Coupons" : "No coupons to show"}</h2>
      </div>

      {data?.map((c) => (
        <div className={styles.coupon} key={c._id}>
          {/* category edit */}
          <div className={styles.coupon_name}>
            {editCouponId === c._id && (
              <div className={styles.edit_header}>
                <div className={styles.title}>
                  <p>Edit {`"${c.coupon}"`} coupon </p>
                </div>
                <div className={styles.subtitle}>
                  <small>
                    <span>Current Name:</span> {c.coupon}
                  </small>
                  <small>
                    <span>Current start date:</span> {c.startDate}
                  </small>
                  <small>
                    <span>Current end date:</span> {c.endDate}
                  </small>
                  <small>
                    <span>Current Discount:</span> {c.discount}%
                  </small>
                </div>
              </div>
            )}
            {editCouponId !== c._id && (
              <div className={styles.item_label}>
                <h3>{c.coupon}</h3>
                <p>
                  <span>Discount:</span> {c.discount}%
                </p>
                <p>
                  <span>Start Date:</span> {c.startDate}
                </p>
                <p>
                  <span>End Date:</span> {c.endDate}
                </p>
              </div>
            )}
            {editCouponId === c._id && (
              <div className={styles.edit}>
                <input
                  type="text"
                  value={coupon}
                  name="coupon"
                  placeholder="Coupon name"
                  icon="coupon"
                  onChange={handleChange}
                />
                <input
                  type="date"
                  value={startDate}
                  name="startDate"
                  placeholder="Start date"
                  icon="date"
                  onChange={handleChange}
                />
                <input
                  type="date"
                  value={endDate}
                  name="endDate"
                  placeholder="End date"
                  icon="date"
                  onChange={handleChange}
                />
                <input
                  type="number"
                  value={discount}
                  name="discount"
                  placeholder="Discount in %"
                  icon="discount"
                  onChange={handleChange}
                  min={0}
                  max={100}
                />
                <div className={styles.buttons}>
                  <Button
                    style="primary"
                    onClick={() => handleUpdateCoupons(c._id)}
                    disabled={!coupon || !startDate || !endDate || !discount}
                  >
                    <AiOutlineCheck />
                  </Button>
                  <Button style="danger" onClick={() => editCouponHandler(c._id)}>
                    <AiOutlineStop />
                  </Button>
                </div>
              </div>
            )}
          </div>
          {/* category actions */}
          <div className={styles.subcategory_actions}>
            {editCouponId !== c._id && (
              <>
                <Button style="primary" onClick={() => editCouponHandler(c._id)}>
                  <FiEdit />
                </Button>
                <Button style="danger" onClick={() => handleDeleteCoupons(c._id)}>
                  <BsTrash />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubCategoriesList;
