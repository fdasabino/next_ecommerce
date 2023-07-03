import Product from "@/models/Product";
import db from "../../../utils/db";

const handler = async (req, res) => {
  try {
    await db.connectDB();
    const { id, color, size } = req.query;

    const product = await Product.findById(id).lean();
    const subProduct = product.subProducts[color];
    const { discount, sizes, color: selectedColor, sku, images } = subProduct;
    const { price: priceBeforeDiscount, qty: quantity } = sizes[size];

    const priceAfterDiscount = discount
      ? Math.round(priceBeforeDiscount * (1 - discount / 100))
      : priceBeforeDiscount;

    console.log(subProduct);

    const responseData = {
      _id: product._id,
      colorIndex: Number(color),
      selectedColor,
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku,
      brand: product.brand,
      shipping: product.shipping,
      images,
      priceBeforeDiscount,
      priceAfterDiscount,
      quantity,
      size: subProduct.sizes[size],
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
