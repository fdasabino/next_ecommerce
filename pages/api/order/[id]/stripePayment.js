import authMiddleware from "@/middleware/auth";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Product from "@/models/Product";
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
            const cart = await Cart.findOne({ user: req.user });

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
                    allow_redirects: "never",
                },
                return_url: `${process.env.LOCALHOST_DEV_MODE}`,
            });

            if (order) {
                // Update the order details
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

                // Perform bulk updates only if the order is paid
                if (order.isPaid) {
                    console.log("Order has been paid, updating products quantity", order);
                    const bulkUpdateOperations = order.products.map(({ product, qty, size }) => ({
                        updateOne: {
                            filter: { _id: product, "subProducts.sizes.size": size },
                            update: {
                                $inc: {
                                    "subProducts.$[].sizes.$[sizeElement].qty": -qty,
                                },
                            },
                            arrayFilters: [{ "sizeElement.size": size }],
                        },
                    }));

                    if (bulkUpdateOperations.length > 0) {
                        try {
                            await Product.bulkWrite(bulkUpdateOperations);
                        } catch (bulkWriteError) {
                            console.error("Bulk Write Error:", bulkWriteError);
                        }
                    }
                }

                // Remove the cart for the user
                await cart.deleteOne({ user: req.user });

                res.status(200).json({
                    message: "Payment successful",
                    order: updatedOrder,
                    ok: true,
                });
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
