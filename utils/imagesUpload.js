import axios from "axios";

export const uploadImage = async (formData) => {
  try {
    const res = await axios.post("/api/cloudinary", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
