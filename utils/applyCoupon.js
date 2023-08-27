import axios from "axios";

export const applyCoupon = async (coupon) => {
  try {
    console.log("c", coupon);
    const res = await axios.post(`/api/user/applyCoupon`, { coupon });
    console.log(res.data);
    return res.data;
  } catch (err) {
    return err.message;
  }
};
