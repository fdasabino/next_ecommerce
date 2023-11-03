import axios from "axios";

export const applyCoupon = async (coupon) => {
    try {
        const res = await axios.post(`/api/user/applyCoupon`, { coupon });
        return res.data;
    } catch (err) {
        return err.message;
    }
};
