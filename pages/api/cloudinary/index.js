import authMiddleware from "@/middleware/auth";
import { imageMiddleware } from "@/middleware/image";
import bodyParser from "body-parser";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_key: process.env.CLOUDINARY_API_KEY,
  cloud_secret: process.env.CLOUDINARY_SECRET_KEY,
});

fileUpload({ useTempFiles: true });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  let files = Object.values(req.files).flat();
  const { path } = req.body;
  await authMiddleware(req, res, async () => {
    await imageMiddleware(req, res, async () => {
      try {
        let images = [];

        for (const file of files) {
          const { path } = file;
          const img = await uploadToCloudinaryHandler(file, path);
          images.push(img);
          removeTmp(file.tempFilePath);
        }
        res.status(200).json({ message: "success", files });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    });
  });
};

const uploadToCloudinaryHandler = async (file, path) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
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

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export default handler;
