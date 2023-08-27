import authMiddleware from "@/middleware/auth";
import Coupon from "@/models/Coupon";
import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  try {
    await db.connectDB();
    const { coupon } = req.body;

    console.log(coupon);

    const couponInDb = await Coupon.findOne({ coupon }).exec();

    console.log(couponInDb);

    if (!couponInDb) {
      return res.status(400).json({ message: "Invalid discount code" });
    }

    const currentDate = new Date();
    const startDate = new Date(couponInDb.startDate);
    const endDate = new Date(couponInDb.endDate);

    if (currentDate < startDate) {
      return res.status(400).json({
        message: `Coupon not active yet. This code starts on: ${startDate.getFullYear()}`,
      });
    }

    if (currentDate > endDate) {
      return res.status(400).json({ message: `Coupon expired on the: ${endDate.getFullYear()}` });
    }

    res.json({ message: "Coupon applied", coupon: couponInDb, ok: true });

    await db.disconnectDB();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
