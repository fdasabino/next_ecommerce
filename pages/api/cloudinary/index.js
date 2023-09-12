import authMiddleware from "@/middleware/auth";
import { imageMiddleware } from "@/middleware/image";
import { uploadToCloudinaryHandler } from "@/utils/cloudinary";
import { removeTmp } from "@/utils/removeTemp";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

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

export default handler;
