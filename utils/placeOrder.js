import axios from "axios";

export const placeOrder = async (order) => {
  try {
    const res = await axios.post(`/api/user/placeOrder`, { order });
    return res.data;
  } catch (err) {
    return err.message;
  }
};
