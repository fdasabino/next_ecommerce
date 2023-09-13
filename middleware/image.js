import { removeTmp } from "@/utils/removeTemp";

export const imageMiddleware = async (req, res, next) => {
  try {
    const { files } = req;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    for (const file of Object.values(files)) {
      const { size, tempFilePath, mimetype } = file;

      if (size > 1024 * 1024 * 3) {
        removeTmp(tempFilePath);
        return res
          .status(400)
          .json({ message: "File size too large...maximum 3mb files are allowed" });
      }

      if (!["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(mimetype)) {
        removeTmp(tempFilePath);
        return res
          .status(400)
          .json({ message: "File format is incorrect. Only JPEG/PNG/JPG/WEBP are allowed." });
      }
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
