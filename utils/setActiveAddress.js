import axios from "axios";

export const setAddressActive = async (address) => {
    try {
        const response = await axios.patch("/api/user/setActiveAddress", { address });

        return response.data;
    } catch (error) {
        throw error;
    }
};
