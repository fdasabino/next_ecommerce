import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  try {
    await db.connectDB();
    const { cart, userID } = req.body;
    let products = [];

    const user = await User.findById(userID);
    let existingCart = await Cart.findOne({ user: userID });

    if (existingCart) {
      await existingCart.deleteOne();
    }

    for (let i = 0; i < cart.length; i++) {
      // loop through cart and find each product
      const dbProduct = await Product.findById(cart[i]._id).lean();

      // find the sub product
      const subProduct = dbProduct.subProducts[cart[i].colorIndex];

      // destructure the discount for the sub product
      const { discount } = subProduct;

      // create a temporary object to store the product data
      const productData = {};
      productData.name = dbProduct.name;
      productData.product = dbProduct._id;
      productData.color = {
        color: cart[i].color.color,
        image: cart[i].color.image,
      };
      productData.image = subProduct.images[0].url;
      productData.qty = Number(cart[i].addedQuantity);
      productData.size = cart[i].size.size;

      // Calculate the base price for the individual product based on its size
      const basePrice = cart[i].size.price * Number(cart[i].addedQuantity);
      // Calculate the discounted price for the individual product
      const discountPrice = basePrice - basePrice * (discount / 100);
      productData.price = cart[i].discount > 0 ? discountPrice : basePrice;
      products.push(productData);
    }
    // calculate cart total
    let cartTotal = products.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const newCart = await new Cart({
      products,
      cartTotal,
      user: user._id,
    });

    await newCart.save();

    res.status(200).json({ newCart, ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
