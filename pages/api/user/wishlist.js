import authMiddleware from "@/middleware/auth";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  await authMiddleware(req, res, async () => {
    try {
      await db.connectDB();
      const { productId, color } = req.body;
      const { method } = req;

      if (method === "PATCH") {
        const user = await User.findById(req.user);
        const product = await Product.findById(productId);
        const exist = await user.wishlist.find((x) => x.product == productId && x.color == color);
        if (exist) {
          res.status(200).json({
            message: `"${product.name}" already in wishlist`,
            exists: true,
          });
        } else {
          user.wishlist.push({ product: productId, color: color });
          await user.save();
          res.status(200).json({
            message: `"${product.name}" added to wishlist`,
            added: true,
          });
        }
      }

      if (method === "PUT") {
        const user = await User.findById(req.user);
        const existIndex = user.wishlist.findIndex(
          (x) => x.product == productId && x.color == color
        );

        if (existIndex !== -1) {
          user.wishlist.splice(existIndex, 1);
          await user.save();
          res.status(200).json({
            message: `Removed from wishlist`,
            removed: true,
          });
        } else {
          res.status(404).json({ message: `Not found in wishlist` });
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    } finally {
      db.disconnectDB();
    }
  });
};

export default handler;
