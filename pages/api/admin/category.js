import authMiddleware from "@/middleware/auth";
import Category from "@/models/Category";
import db from "@/utils/db";
import slugify from "slugify";

const handler = async (req, res) => {
  await db.connectDB();
  const { method } = req;
  const { name } = req.body;

  try {
    await authMiddleware(req, res, async () => {
      // create category
      if (method === "POST") {
        const categoryExists = await Category.findOne({ name });

        if (categoryExists) {
          return res.status(400).json({ error: "Category already exists", ok: false });
        }

        await new Category({ name, slug: slugify(name) }).save();

        return res.status(201).json({
          message: `Category "${name}" has been successfully created...`,
          ok: true,
          categories: await Category.find({}).sort({ createdAt: -1 }),
        });
      }

      // update category
      if (method === "PATCH") {
        const { id, name } = req.body.data;
        const category = await Category.findByIdAndUpdate(id);

        if (category.name === name) {
          return res.status(400).json({ error: "Category already exists", ok: false });
        }

        category.name = name;
        category.slug = slugify(name);
        await category.save();

        return res.status(200).json({
          message: `Category "${name}" has been successfully updated...`,
          ok: true,
          categories: await Category.find({}).sort({ createdAt: -1 }),
        });
      }

      // delete category
      if (method === "PUT") {
        const { id } = req.body.data;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
          return res.status(400).json({ error: "Category not found", ok: false });
        }
        const categories = await Category.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
          message: "Category has been successfully deleted...",
          ok: true,
          categories,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, ok: false });
  } finally {
    await db.disconnectDB();
  }
};

export default handler;
