import Product from "@/models/Product";
import db from "../../../utils/db";

const handler = async (req, res) => {
  try {
    await db.connectDB();
    const id = req.query.id;
    const color = req.query.color || 0;
    const size = req.query.size || 0;

    const product = await Product.findById(id).lean();

    const subProduct = product.subProducts[color];
    const { discount, sizes, color: selectedColor, sku, images } = subProduct;
    const { price: priceBeforeDiscount, qty: quantity } = sizes[size];

    const priceAfterDiscount =
      discount > 0 ? priceBeforeDiscount * (1 - discount / 100) : priceBeforeDiscount;

    const responseData = {
      _id: product._id,
      name: product.name,
      description: product.description,
      discount: product.discount,
      slug: product.slug,
      brand: product.brand,
      category: product.category,
      subCategories: product.subCategories,
      colorIndex: Number(color),
      shipping: product.shipping,
      size: subProduct.sizes[size],
      color: selectedColor,
      sku,
      images,
      priceBeforeDiscount,
      price: priceAfterDiscount,
      availableQuantity: quantity,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
