import authMiddleware from "@/middleware/auth";
import Category from "@/models/Category";
import db from "@/utils/db";
import slugify from "slugify";

const handler = async (req, res) => {
  const { name } = req.body;
  await db.connectDB();
  try {
    await authMiddleware(req, res, async () => {
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
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, ok: false });
  } finally {
    await db.disconnectDB();
  }
};

export default handler;
