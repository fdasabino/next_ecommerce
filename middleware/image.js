import fs from "fs";

export const imageMiddleware = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    let files = Object.values(req.files).flat();

    for (const file of files) {
      if (file.size > 1024 * 1024 * 3) {
        removeTmp(file.tempFilePath);
        return res
          .status(400)
          .json({ message: "File size too large...maximum 3mb files are allowed" });
      }

      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res
          .status(400)
          .json({ message: "File format is incorrect. Only JPEG/PNG/JPG/WEBP are allowed." });
      }
    }

    next();
    res.status(200).json({ message: "success", files });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
