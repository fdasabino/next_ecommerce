import authMiddleware from "@/middleware/auth";
import Coupon from "@/models/Coupon";
import db from "@/utils/db";

const handler = async (req, res) => {
  await db.connectDB();
  const { coupon, startDate, endDate, discount } = req.body;
  try {
    await authMiddleware(req, res, async () => {
      const checkCoupon = await Coupon.findOne({ coupon });

      // check if coupon already exists
      if (checkCoupon) {
        return res
          .status(400)
          .json({ message: "Coupon already exists, try a different name.", ok: false });
      }

      // create new coupon
      await new Coupon({
        coupon,
        startDate,
        endDate,
        discount,
      }).save();

      // get all coupons
      const coupons = await Coupon.find({}).sort({ createdAt: -1 });

      // send response
      return res
        .status(201)
        .json({ message: "Coupon created successfully.", coupons: coupons, ok: true });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
