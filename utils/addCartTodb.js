import axios from "axios";

export const addCartToDb = async (cart) => {
    try {
        const { data } = await axios.post("/api/user/saveCartToDb", { cart });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};
