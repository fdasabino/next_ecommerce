import axios from "axios";

export const deleteAddressFromDb = async (addressId) => {
    try {
        const { data } = await axios.post("/api/user/deleteAddressFromDb", { addressId });
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
