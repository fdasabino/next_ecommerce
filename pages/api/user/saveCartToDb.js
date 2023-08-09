import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "@/utils/db";
import { GetColorName } from "hex-color-to-color-name";

const getColorName = (color) => {
  const colorName = GetColorName(color);
  return colorName;
};

const handler = async (req, res) => {
  try {
    await db.connectDB();
    const { cart, userID } = req.body;

    const user = await User.findById(userID);
    await Cart.deleteOne({ user: userID });

    const products = await Promise.all(
      cart.map(async ({ _id, color, colorIndex, addedQuantity, size, discount }) => {
        const dbProduct = await Product.findById(_id).lean();
        const subProduct = dbProduct.subProducts[colorIndex];

        const { name, _id: product } = dbProduct;
        const { color: cartColor } = color;
        const { url } = subProduct.images[0];
        const qty = Number(addedQuantity);
        const { size: productSize } = size;
        const productDiscount = discount ? discount : 0;

        const basePrice = size.price * qty;
        const discountPrice = basePrice - (basePrice * productDiscount) / 100;

        return {
          name,
          product,
          color: { color: getColorName(cartColor), image: color.image },
          image: url,
          qty,
          size: productSize,
          price: productDiscount > 0 ? discountPrice : basePrice,
        };
      })
    );

    const cartTotal = products.reduce((acc, item) => acc + Number(item.price), 0);

    const newCart = await Cart.create({
      products,
      cartTotal: Number(cartTotal),
      user: user._id,
    });

    res.status(200).json({ newCart, ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
