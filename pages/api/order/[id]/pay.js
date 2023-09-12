import authMiddleware from "@/middleware/auth";
import Order from "@/models/Order";
import db from "@/utils/db";

const handler = async (req, res) => {
  try {
    await authMiddleware(req, res, async () => {
      console.log("hello from api");
      await db.connectDB();
      const order = await Order.findById(req.query.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          email_address: req.body.email_address,
        };
        const newOrder = await order.save();
        await db.disconnectDB();
        res.json({ message: "Order is paid.", order: newOrder });
      } else {
        await db.disconnectDB();
        res.status(404).json({ message: "Order is not found." });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred.", error: error.message });
  }
};
export default handler;
