import Cart from "@/models/Cart";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "../../../utils/db";

const handler = async (req, res) => {
  try {
    await db.connectDB();
    const { cart, user_id } = req.body;
    let products = [];

    const user = await User.findById(user_id);
    let existingCart = await Cart.findOne({ user: user_id });

    if (existingCart) {
      await existingCart.deleteOne();
    }

    for (let i = 0; i < cart.length; i++) {
      // loop through cart and find each product
      const dbProduct = await Product.findById(cart[i]._id).lean();
      console.log("DbProduct", dbProduct);
      // find the sub product
      const subProduct = dbProduct.subProducts[cart[i].colorIndex];
      console.log("sub Product", subProduct);

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
      // price
      const basePrice = cart.reduce((acc, item) => acc + item.price, 0);

      productData.price = basePrice;

      products.push(productData);
    }

    // calculate cart total
    let cartTotal = products.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const newCart = new Cart({
      products,
      cartTotal,
      user: user_id,
    });

    await newCart.save();

    res.status(200).json({ message: "Cart successfully saved to database..." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
