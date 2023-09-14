import Cart from "@/models/Cart";
import Order from "@/models/Order";
import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
  try {
    const { orderId, details } = req.body;
    const { status, id } = details;

    await db.connectDB();
    const order = await Order.findById(orderId);
    const cart = await Cart.findOne({ user: req.user });
    const user = await User.findById(req.user);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id,
        status,
        update_time: Date.now(),
        email: user.email,
        name: user.name,
      };

      const updatedOrder = await order.save();
      await cart.deleteOne({ user: req.user });

      res.status(200).json({ message: "Payment successful", order: updatedOrder, ok: true });
    } else {
      res.status(404).json({ message: "Order is not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred.", error: error.message });
  } finally {
    await db.disconnectDB();
  }
};

export default handler;
