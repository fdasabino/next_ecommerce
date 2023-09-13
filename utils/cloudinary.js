import cloudinary from "cloudinary";
import { removeTmp } from "./removeTemp";

export const uploadToCloudinaryHandler = async (file, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: `shoppyflow/${path}`,
        public_id: `${Date.now()}`,
      },
      async (err, result) => {
        if (err) {
          removeTmp(file.tempFilePath);
          reject(err);
          res.status(500).json({ message: "Error uploading your image... Pls try again later" });
        }
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  });
};
