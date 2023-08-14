import axios from "axios";

export const deleteAddressFromDb = async (addressId, userId) => {
  try {
    const { data } = await axios.post("/api/user/deleteAddressFromDb", { addressId, userId });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
