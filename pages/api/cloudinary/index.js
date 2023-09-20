import adminMiddleware from "@/middleware/admin";
import authMiddleware from "@/middleware/auth";
import { imageMiddleware } from "@/middleware/image";
import { uploadToCloudinaryHandler } from "@/utils/cloudinary";
import { removeTmp } from "@/utils/removeTemp";
import bodyParser from "body-parser";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";
import nc from "next-connect";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc()
  .use(adminMiddleware)
  .use(authMiddleware)
  .use(fileUpload({ useTempFiles: true }))
  .use(bodyParser.json())
  .use(imageMiddleware);

handler.post(async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const img = await uploadToCloudinaryHandler(file, path);
      images.push(img);
      removeTmp(file.tempFilePath);
    }
    res.status(200).json({ message: "Images uploaded successfully", images });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ message: "No images selected" });
    await cloudinary.v2.uploader.destroy(public_id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
