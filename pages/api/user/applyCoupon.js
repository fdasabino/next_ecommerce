import authMiddleware from "@/middleware/auth";
import Cart from "@/models/Cart";
import Coupon from "@/models/Coupon";
import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  await authMiddleware(req, res, async () => {
    try {
      await db.connectDB();
      const { coupon } = req.body;

      const userInDb = await User.findById({ _id: req.user }).exec();
      const couponInDb = await Coupon.findOne({ coupon }).exec();
      const cartInDb = await Cart.findOne({ user: userInDb._id }).exec();

      if (!couponInDb) {
        return res.json({ message: "Invalid discount code", ok: false });
      }

      // check if user already has a coupon applied
      if (cartInDb.totalAfterDiscount || cartInDb.totalAfterDiscount > 0) {
        return res.json({ message: "You already applied a discount code...", ok: false });
      }

      const currentDate = new Date();
      const startDate = new Date(couponInDb.startDate);
      const endDate = new Date(couponInDb.endDate);

      if (currentDate < startDate) {
        return res.json({
          message: `Coupon not active yet. This code starts on: ${startDate.getFullYear()}`,
          ok: false,
        });
      }

      if (currentDate > endDate) {
        return res.json({ message: `Coupon expired on the: ${endDate.getFullYear()}`, ok: false });
      }

      // apply discount to cart total
      const totalAfterDiscount = () => {
        return (cartInDb.cartTotal - (cartInDb.cartTotal * couponInDb.discount) / 100).toFixed(2);
      };

      const updatedCart = await Cart.findOneAndUpdate(
        { user: userInDb._id },
        { totalAfterDiscount: totalAfterDiscount(), discount: couponInDb.discount },
        { new: true }
      ).exec();

      res.json({ message: "Coupon applied", coupon: couponInDb, newCart: updatedCart, ok: true });

      await db.disconnectDB();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

export default handler;
