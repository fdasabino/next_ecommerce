import authMiddleware from "@/middleware/auth";
import Order from "@/models/Order";
import db from "@/utils/db";

const handler = async (req, res) => {
  try {
    await authMiddleware(req, res, async () => {
      await db.connectDB();

      const { order } = req.body;
      const { couponApplied, paymentMethod, totalAfterDiscount, total, activeAddress, products } =
        order;

      await Order.findOneAndDelete({ user: req.user });

      const newOrder = new Order({
        products,
        paymentMethod,
        couponApplied,
        user: req.user,
        total: totalAfterDiscount || total,
        totalBeforeDiscount: total,
        shippingAddress: activeAddress,
      });

      const createdOrder = await newOrder.save();

      console.log("Order created successfully");
      res.status(201).json({ order: createdOrder, ok: true });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred.", error: error.message });
  } finally {
    await db.disconnectDB();
  }
};

export default handler;
