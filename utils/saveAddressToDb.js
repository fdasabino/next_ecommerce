import axios from "axios";

export const saveAddress = async (address, userId) => {
  try {
    const { data } = await axios.post("api/user/saveAddressToDb", { address, userId });
    return data;
  } catch (error) {
    console.log("Error saving address:", error.message);
    throw error;
  }
};
