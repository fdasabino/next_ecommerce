import adminMiddleware from "@/middleware/admin";
import authMiddleware from "@/middleware/auth";
import Product from "@/models/Product";
import db from "@/utils/db";
import slugify from "slugify";

const handler = async (req, res) => {
  db.disconnectDB();
  const { method } = req;
  try {
    await adminMiddleware(req, res, async () => {
      await authMiddleware(req, res, async () => {
        if (method === "POST") {
          // check if product already exists
          if (req.body.parent) {
            const parent = await Product.findById(req.body.parent);
            if (!parent) {
              return res.status(400).json({ error: "Parent product not found", ok: false });
            } else {
              await parent.updateOne(
                {
                  $push: {
                    subProducts: {
                      sku: req.body.sku,
                      color: req.body.color,
                      images: req.body.images,
                      sizes: req.body.sizes,
                      discount: req.body.discount,
                    },
                  },
                },
                { new: true }
              );
              return res.status(201).json({
                message: `Product "${req.body.name}" has been successfully updated...`,
                ok: true,
                products: await Product.find({}).sort({ createdAt: -1 }),
              });
            }
          } else {
            req.body.slug = slugify(req.body.name);
            const newProduct = await new Product({
              name: req.body.name,
              description: req.body.description,
              brand: req.body.brand,
              details: req.body.details,
              questions: req.body.questions,
              slug: req.body.slug,
              category: req.body.category,
              subCategories: req.body.subCategories,
              subProducts: [
                {
                  sku: req.body.sku,
                  color: req.body.color,
                  images: req.body.images,
                  sizes: req.body.sizes,
                  discount: req.body.discount,
                },
              ],
            });
            await newProduct.save();
            return res.status(201).json({
              message: `Product "${req.body.name}" has been successfully created...`,
              ok: true,
              products: await Product.find({}).sort({ createdAt: -1 }),
            });
          }
        }
        if (method === "PATCH") {
        }
        if (method === "PUT") {
        }
      });
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  } finally {
    db.disconnectDB();
  }
};

export default handler;
