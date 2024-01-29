import authMiddleware from "@/middleware/auth";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "@/utils/db";

const handler = async (req, res) => {
    try {
        const { orderId, details } = req.body;
        const { status, id } = details;

        await db.connectDB();
        await authMiddleware(req, res, async () => {
            const order = await Order.findById(orderId);
            const cart = await Cart.findOne({ user: req.user });
            const user = await User.findById(req.user);

            if (order) {
                // Update the order details
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

                // Perform bulk updates only if the order is paid
                if (order.isPaid) {
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
                res.status(404).json({ message: "Order is not found." });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "An error occurred.", error: error.message });
    } finally {
        await db.disconnectDB();
    }
};

export default handler;
