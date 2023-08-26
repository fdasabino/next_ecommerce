import authMiddleware from "@/middleware/auth";
import Coupon from "@/models/Coupon";
import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  try {
    await authMiddleware(req, res, async () => {
      await db.connectDB();
      const { coupon } = req.body;

      console.log(coupon);

      const validCoupon = await Coupon.findOne({ name: coupon }).exec();
      if (!validCoupon) {
        return res.status(400).json({ message: "Invalid coupon" });
      }

      res.json({ message: "Coupon applied", coupon: validCoupon, ok: true });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
