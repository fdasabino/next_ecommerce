import axios from "axios";

export const saveAddress = async (address) => {
    try {
        const { data } = await axios.post("api/user/saveAddressToDb", { address });
        return data;
    } catch (error) {
        console.log("Error saving address:", error.message);
        throw error;
    }
};
