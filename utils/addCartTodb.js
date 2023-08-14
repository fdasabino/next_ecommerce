import axios from "axios";

export const addCartToDb = async (cart, userID) => {
  try {
    const { data } = await axios.post("/api/user/saveCartToDb", { cart, userID });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
