import authMiddleware from "@/middleware/auth";
import Order from "@/models/Order";
import User from "@/models/User";
import db from "@/utils/db";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  try {
    const { amount, id, orderId } = req.body;
    await db.connectDB();
    await authMiddleware(req, res, async () => {
      const order = await Order.findById(orderId);
      const user = await User.findById(req.user);

      // Convert amount to cents (or smallest currency unit) and round it to an integer
      const amountInCents = Math.round(Number(amount) * 100);

      const payment = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "USD",
        description: `ShoppyFlow Order: ${orderId}`,
        payment_method: id,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: "never", // Or you can set it to "manual" if needed
        },
        return_url: `${process.env.NEXTAUTH_URL}`, // Specify your return URL here
      });

      console.log("Payment:", payment);
      console.log(req.user);
      console.log(user);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: payment.id,
          status: payment.status,
          update_time: Date.now(),
          email: user.email,
          name: user.name,
        };
        const updatedOrder = await order.save();
        res.status(200).json({ message: "Payment successful", order: updatedOrder, ok: true });
      } else {
        res.status(404).json({ message: "Order not found.", ok: false });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred.", error: error.message, ok: false });
  } finally {
    await db.disconnectDB();
  }
};

export default handler;
