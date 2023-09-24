import authMiddleware from "@/middleware/auth";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "@/utils/db";

const processCartItem = async (cartItem) => {
  const { _id, color, colorIndex, addedQuantity, size, discount } = cartItem;

  const dbProduct = await Product.findById(_id).lean();
  const subProduct = dbProduct.subProducts[colorIndex];
  const { name, _id: product } = dbProduct;
  const { color: cartColor } = color;
  const { url } = subProduct.images[0];
  const qty = Number(addedQuantity);
  const { size: productSize } = size;
  const productDiscount = discount || 0;
  const basePrice = size.price * qty;
  const discountPrice = basePrice - (basePrice * productDiscount) / 100;

  return {
    name,
    product,
    color: { color: cartColor, image: color.image },
    image: url,
    qty,
    size: productSize,
    price: productDiscount > 0 ? discountPrice : basePrice,
  };
};

const handler = async (req, res) => {
  try {
    await authMiddleware(req, res, async () => {
      await db.connectDB();
      const { cart } = req.body;

      const user = await User.findById(req.user).lean();
      await Cart.deleteOne({ user: user._id });

      const productsData = await Promise.all(cart.map(processCartItem));
      const cartTotal = productsData.reduce((acc, item) => acc + Number(item.price), 0);

      const newCart = await Cart.create({
        products: productsData,
        cartTotal: Number(cartTotal),
        user: user._id,
      });

      res.status(200).json({ newCart, ok: true });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
